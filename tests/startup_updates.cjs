const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../gpt56_vnext/web/workbench.js'),'utf8');
const fields=new Map();let calls=[],mode='success';
const local=[{id:'gpt',mode:'gpt',version:'4.5.2',publisher:'maintainer'}];
const context=vm.createContext({Promise,locale:'en',state:{snapshot:{packages:local}},
 $:id=>{if(!fields.has(id))fields.set(id,{hidden:true,textContent:'',disabled:true});return fields.get(id);},
 t:s=>s,renderProgramUpdate:v=>{context.lastProgram=v;},
 post:async url=>{calls.push(url);if(mode==='fail')throw Error('offline');return url.includes('program')?{available:true}:{packages:[{id:'gpt',mode:'gpt',publisher:'maintainer',version:'4.5.3'}]};}});
vm.runInContext(source.slice(source.indexOf('function newerVersion('),source.indexOf('window.addEventListener("workspace-ready",()=>{void checkStartupUpdates();});')),context);
(async()=>{
 assert(context.newerVersion('4.5.10','4.5.9'));assert(!context.newerVersion('4.5.2','4.5.2'));
 assert(context.newerVersion('4.5.2','4.5.2-rc1'));assert(!context.newerVersion('4.5.2-rc1','4.5.2'));
 assert(!context.baselineUpdateAvailable([{id:'gpt',publisher:'community',version:'9.0.0'}],local));
 assert(!context.baselineUpdateAvailable([{id:'gpt',publisher:'maintainer',version:'4.5.3',withdrawn:'security'}],local));
 assert(context.baselineUpdateAvailable([{id:'new-gpt',mode:'gpt',publisher:'maintainer',version:'4.5.3'}],local));
 await context.checkStartupUpdates();await context.checkStartupUpdates();assert.equal(calls.length,2);
 assert(calls.every(v=>!v.includes('install')&&!v.includes('download')));
 assert.equal(fields.get('startup-updates').hidden,false);assert.equal(fields.get('startup-baseline-update').hidden,false);
 vm.runInContext('startupChecked=false',context);mode='fail';await context.checkStartupUpdates();
 assert.equal(fields.get('startup-updates').hidden,true);assert(fields.get('program-status').textContent.includes('自动检查'));
 console.log('Startup update checks passed: version ordering, known baselines, new maintainer IDs, offline behavior, once-only and no automatic installation.');
})().catch(e=>{console.error(e);process.exitCode=1;});
