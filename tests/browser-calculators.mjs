import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chromePath = [
  process.env.CHROME_BIN,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find((candidate) => candidate && existsSync(candidate));
if (!chromePath) throw new Error('A local Chrome/Chromium executable is required. Set CHROME_BIN.');

async function eventually(check, label, attempts=85) {
  for (let i=0;i<attempts;i++) {
    try { const value=await check(); if(value) return value; } catch {}
    await sleep(130);
  }
  throw new Error('Timed out: ' + label);
}

class ChromeSession {
  constructor(ws) {
    this.ws=ws;
    this.seq=0;
    this.pending=new Map();
    ws.addEventListener('message',(event)=>{
      const msg=JSON.parse(event.data);
      const item=this.pending.get(msg.id);
      if(!item)return;
      this.pending.delete(msg.id);
      if(msg.error)item.reject(new Error(JSON.stringify(msg.error)));
      else item.resolve(msg.result);
    });
  }
  send(method,params={}) {
    const id=++this.seq;
    return new Promise((resolve,reject)=>{
      this.pending.set(id,{resolve,reject});
      this.ws.send(JSON.stringify({id,method,params}));
    });
  }
  async eval(expression) {
    const response=await this.send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});
    if(response.exceptionDetails)throw new Error('Browser JS exception: '+JSON.stringify(response.exceptionDetails).slice(0,650));
    return response.result.value;
  }
  async navigate(url,selector) {
    await this.send('Page.navigate',{url});
    await eventually(async()=>await this.eval('document.readyState==="complete" && !!document.querySelector('+JSON.stringify(selector)+')'),'navigate '+url);
  }
}

const rand=()=>Math.floor(10000+Math.random()*40000);
const port=rand();
const debugPort=rand()+9000;
const base='http://127.0.0.1:'+port;
const debugBase='http://127.0.0.1:'+debugPort;
const tmp=mkdtempSync(path.join(tmpdir(),'mainstreet-chrome-smoke-'));
let preview,chrome,session;
try {
  preview=spawn('./node_modules/.bin/astro',['preview','--host','127.0.0.1','--port',String(port)],{cwd:process.cwd(),stdio:'ignore'});
  await eventually(async()=>{
    const r=await fetch(base+'/retail/retail-math-calculator/');
    return r.status===200;
  },'local preview server');
  chrome=spawn(chromePath,['--headless=new','--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--no-first-run','--remote-allow-origins=*','--remote-debugging-port='+debugPort,'--user-data-dir='+tmp,'about:blank'],{stdio:'ignore'});
  const target=await eventually(async()=>{
    const r=await fetch(debugBase+'/json/list');
    const a=await r.json();
    return a.find((x)=>x.type==='page' && x.webSocketDebuggerUrl);
  },'Chrome DevTools target');
  const ws=new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{
    ws.addEventListener('open',resolve,{once:true});
    ws.addEventListener('error',reject,{once:true});
  });
  session=new ChromeSession(ws);
  await session.send('Page.enable');
  await session.send('Runtime.enable');

  // Real retail price/markup/margin interaction and zero-input fallback.
  await session.navigate(base+'/retail/retail-math-calculator/','#p-price');
  const retail=await session.eval('(async()=>{'+
    'function set(id,value){const e=document.getElementById(id);e.value=value;e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}));}'+
    'set("p-cost","50");set("p-val","20");await new Promise(r=>setTimeout(r,100));'+
    'const markup=document.getElementById("p-price").textContent;'+
    'set("p-mode","margin");await new Promise(r=>setTimeout(r,100));'+
    'const margin=document.getElementById("p-price").textContent;'+
    'set("p-cost","0");await new Promise(r=>setTimeout(r,100));'+
    'return {markup,margin,zero:document.getElementById("p-price").textContent};})()');
  assert.equal(retail.markup,'$60.00','Markup calculation');
  assert.equal(retail.margin,'$62.50','Margin calculation');
  assert.equal(retail.zero,'$0.00','Zero cost handled without NaN');

  // Real painting DOM interactions, interior/exterior selection and empty area.
  await session.navigate(base+'/construction/painting-estimate-calculator/','#es-total-area');
  const paint=await session.eval('(async()=>{'+
    'function set(id,value){const e=document.getElementById(id);e.value=value;e.dispatchEvent(new Event("input",{bubbles:true}));}'+
    'set("p-interior","1000");set("p-exterior","600");'+
    'const ex=document.querySelector("input[name=paintMode][value=exterior]");ex.checked=true;ex.dispatchEvent(new Event("change",{bubbles:true}));'+
    'await new Promise(r=>setTimeout(r,100));const ext={area:document.getElementById("es-total-area").textContent,total:document.getElementById("qs-total").textContent};'+
    'const both=document.querySelector("input[name=paintMode][value=both]");both.checked=true;both.dispatchEvent(new Event("change",{bubbles:true}));'+
    'await new Promise(r=>setTimeout(r,100));const all=document.getElementById("es-total-area").textContent;'+
    'set("p-interior","0");set("p-exterior","0");await new Promise(r=>setTimeout(r,100));'+
    'return {ext,all,zeroArea:document.getElementById("es-total-area").textContent,zeroTotal:document.getElementById("qs-total").textContent};})()');
  assert.equal(paint.ext.area,'600','Exterior mode gates interior area');
  assert.equal(paint.all,'1600','Combined area');
  assert.equal(paint.zeroArea,'0','Blank/zero area has a stable result');
  assert.doesNotMatch(paint.zeroTotal,/NaN|Infinity/);

  // Real statute-backed user experience: deadline, no date, no fixed statute.
  await session.navigate(base+'/landlord/security-deposit-refund-calculator/','#out-deadline');
  const deposit=await session.eval('(async()=>{'+
    'function set(id,value){const e=document.getElementById(id);e.value=value;e.dispatchEvent(new Event("change",{bubbles:true}));e.dispatchEvent(new Event("input",{bubbles:true}));}'+
    'set("state","NY");set("vacate","2026-07-01");await new Promise(r=>setTimeout(r,100));'+
    'const ny=document.getElementById("out-deadline").textContent;'+
    'set("vacate","");await new Promise(r=>setTimeout(r,100));const blank=document.getElementById("out-deadline").textContent;'+
    'set("vacate","2026-07-01");set("state","WY");await new Promise(r=>setTimeout(r,100));'+
    'return {ny,blank,wy:document.getElementById("out-deadline").textContent};})()');
  assert.match(deposit.ny,/Jul 15, 2026/,'NY 14 calendar-day deadline');
  assert.equal(deposit.blank,'—','No date is not a fake deadline');
  assert.match(deposit.wy,/No statutory deadline/,'Do not invent statutory deadline for Wyoming');

  console.log('MAINSTREET_THREE_REAL_CHROME_FLOWS_PASS');
  console.log(JSON.stringify({retail,paint,deposit},null,2));
} finally {
  session?.ws.close();
  preview?.kill('SIGTERM');
  chrome?.kill('SIGTERM');
  await sleep(450);
  rmSync(tmp,{recursive:true,force:true,maxRetries:3});
}
