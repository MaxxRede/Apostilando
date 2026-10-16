import {cp,mkdir,rm,readFile,writeFile} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist/vendor',{recursive:true});
await cp('src','dist/src',{recursive:true});await cp('index.html','dist/index.html');
for(const [src,dest] of [['pdf-lib/dist/pdf-lib.min.js','pdf-lib.min.js'],['mammoth/mammoth.browser.min.js','mammoth.browser.min.js'],['pdfjs-dist/build/pdf.mjs','pdf.mjs'],['pdfjs-dist/build/pdf.worker.mjs','pdf.worker.mjs']])await cp('node_modules/'+src,'dist/vendor/'+dest);
await cp('node_modules/pdfjs-dist/standard_fonts','dist/vendor/standard_fonts',{recursive:true});
await cp('node_modules/pdfjs-dist/cmaps','dist/vendor/cmaps',{recursive:true});
await writeFile('dist/_headers','/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n');
console.log('Build pronto em dist/; bibliotecas incluídas, sem CDN em execução.');
