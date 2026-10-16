let db;
export async function openDB(){if(db)return db;db=await new Promise((resolve,reject)=>{const r=indexedDB.open('apostilando',1);r.onupgradeneeded=()=>r.result.createObjectStore('projects',{keyPath:'id'});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});return db;}
async function run(mode,action){const d=await openDB();return new Promise((resolve,reject)=>{const tx=d.transaction('projects',mode);let result;const r=action(tx.objectStore('projects'));r.onsuccess=()=>result=r.result;tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Operação cancelada.'));});}
export const all=()=>run('readonly',s=>s.getAll());
export const save=p=>run('readwrite',s=>s.put(p));
export async function saveMany(projects){const d=await openDB();return new Promise((resolve,reject)=>{const tx=d.transaction('projects','readwrite');const s=tx.objectStore('projects');projects.forEach(p=>s.put(p));tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Importação cancelada.'));});}
