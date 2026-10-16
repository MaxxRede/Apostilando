import {spawnSync} from 'node:child_process';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {homedir} from 'node:os';
import {join} from 'node:path';
import {randomBytes} from 'node:crypto';
import {fileURLToPath} from 'node:url';
export function validProject(name){return typeof name==='string'&&/^[a-z0-9][a-z0-9-]{0,56}[a-z0-9]$/.test(name);}
export function runWrangler(args){
 const tool=process.platform==='win32'?'npx.cmd':'npx';
 // Todos os argumentos sao constantes ou nomes validados; nenhum segredo e passado.
 const result=spawnSync(tool,['--yes','wrangler@4',...args],{stdio:'inherit',shell:process.platform==='win32',env:{...process.env,WRANGLER_SEND_METRICS:'false'}});
 if(result.error)throw new Error('Nao foi possivel executar o Wrangler: '+result.error.message);
 if(result.status!==0)throw new Error('Cloudflare nao concluiu a etapa: '+args.slice(0,3).join(' ')+'. Confira a mensagem acima e execute novamente.');
}
export async function deploy({run=runWrangler,configPath=join(homedir(),'.apostilando','cloudflare.json'),newName=()=>`apostilando-${randomBytes(6).toString('hex')}`,read=readFile,write=writeFile,makeDir=mkdir}={}){
 let config;
 try{config=JSON.parse(await read(configPath,'utf8'));if(!validProject(config.project))throw new Error('Nome de projeto invalido na configuracao local.');}catch(e){if(e.code!=='ENOENT')throw e;}
 console.log('\nEntre na sua conta Cloudflare na janela que sera aberta. Nao informe sua senha no terminal.\n');
 run(['login']);
 if(!config){config={project:newName()};if(!validProject(config.project))throw new Error('Nome de projeto invalido.');
 console.log('\nCriando projeto Pages: '+config.project);
 run(['pages','project','create',config.project,'--production-branch=main']);
 await makeDir(join(configPath,'..'),{recursive:true});
 await write(configPath,JSON.stringify(config,null,2),'utf8');
 }
 console.log('\nPublicando em: '+config.project);
 run(['pages','deploy','dist','--project-name='+config.project,'--branch=main','--commit-dirty=true']);
 console.log('\nPublicacao concluida. Use a URL de producao exibida pelo Wrangler.');
 console.log('Execute o mesmo BAT para atualizar este projeto na mesma conta Cloudflare.');
 return config;
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1])deploy().catch(e=>{console.error('\nERRO: '+e.message);process.exitCode=1;});
