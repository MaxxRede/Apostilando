import {cp,mkdir,rm,readFile,writeFile,readdir} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist/vendor',{recursive:true});
await cp('src','dist/src',{recursive:true});await cp('index.html','dist/index.html');
for(const [src,dest] of [['jszip/dist/jszip.min.js','jszip.min.js'],['pdf-lib/dist/pdf-lib.min.js','pdf-lib.min.js'],['mammoth/mammoth.browser.min.js','mammoth.browser.min.js'],['pdfjs-dist/build/pdf.mjs','pdf.mjs'],['pdfjs-dist/build/pdf.worker.mjs','pdf.worker.mjs']])await cp('node_modules/'+src,'dist/vendor/'+dest);
await cp('node_modules/pdfjs-dist/standard_fonts','dist/vendor/standard_fonts',{recursive:true});
await cp('node_modules/pdfjs-dist/cmaps','dist/vendor/cmaps',{recursive:true});
await mkdir('dist/vendor/fonts',{recursive:true});
for(const weight of [400,700])await cp(`node_modules/@fontsource/montserrat/files/montserrat-latin-${weight}-normal.woff2`,`dist/vendor/fonts/montserrat-${weight}.woff2`);
await cp('node_modules/@fontsource/montserrat/LICENSE','dist/vendor/fonts/Montserrat-OFL.txt');
for(const font of ['lato','nunito','open-sans']){for(const weight of [400,700])await cp(`node_modules/@fontsource/${font}/files/${font}-latin-${weight}-normal.woff2`,`dist/vendor/fonts/${font}-${weight}.woff2`);await cp(`node_modules/@fontsource/${font}/LICENSE`,`dist/vendor/fonts/${font}-LICENSE.txt`);}

const {version}=JSON.parse(await readFile('package.json','utf8'));
for(const file of await readdir('dist/src'))if(file.endsWith('.js')){const path='dist/src/'+file;await writeFile(path,(await readFile(path,'utf8')).replace(/(from\s+['"]\.\/[^'"]+\.js)(['"])/g,`$1?v=${version}$2`));}
await writeFile('dist/index.html',(await readFile('dist/index.html','utf8')).replace(/(src\/(?:style\.css|app\.js))(["'])/g,`$1?v=${version}$2`));
await writeFile('dist/src/style.css',(await readFile('dist/src/style.css','utf8')).replace(/(illustration-styles(?:-extra)?\.png)(')/g,`$1?v=${version}$2`));
await writeFile('dist/_headers' ,'/*\n  Cache-Control: no-cache\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n');
console.log('Build pronto em dist/; bibliotecas incluídas, sem CDN em execução.');
