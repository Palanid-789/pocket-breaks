const {readFileSync}=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const nodes=new Map();const make=()=>({dataset:{},classList:{add(){},toggle(){}},setAttribute(){},replaceChildren(...c){this.children=c},children:[],focus(){}});const doc={activeElement:null,hidden:false,getElementById(id){if(!nodes.has(id))nodes.set(id,make());return nodes.get(id)},createElement:make,querySelectorAll(){return []},addEventListener(){}};
const context=vm.createContext({document:doc,localStorage:{getItem(){return null},setItem(){}},performance:{now(){return 1000}},setInterval(){},setTimeout(){},console});vm.runInContext(readFileSync(__dirname+'/game.js','utf8'),context);
function check(code){vm.runInContext(code,context)}
check("if(values.length!==16||new Set(values).size!==8)throw Error('deck'); const a=0,b=values.findIndex((v,i)=>i!==a&&v===values[a]);play(a);play(b);if(matched.size!==2||moves!==1)throw Error('pair');start();if(matched.size||moves)throw Error('reset')");
check("mode='numbers';start();play(values.indexOf(2));if(next!==1)throw Error('out of order');for(let n=1;n<=25;n++)play(values.indexOf(n));if(!finished)throw Error('number win')");
check("mode='lights';start();values.fill(false);neighbors(0).forEach(i=>values[i]=true);play(0);if(!finished)throw Error('lights win');if(neighbors(0).length!==3||neighbors(12).length!==5)throw Error('neighbors')");
console.log('PASS: deck, matching, restart, number order/win, lights neighbors/win');
