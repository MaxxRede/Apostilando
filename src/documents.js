export async function extractDocument(file,{pdfjs,mammoth,pdfOptions={},onProgress=()=>{}} ={}){
 if(file.size>20*1024*1024)throw new Error('Documento maior que 20 MB.');
 const ext=file.name.split('.').pop().toLowerCase();let text='';const warnings=[];
 if(ext==='pdf'){
  if(!pdfjs)throw new Error('Leitor PDF indisponível.');
  let pdf;
  try{
   pdf=await pdfjs.getDocument({...pdfOptions,data:new Uint8Array(await file.arrayBuffer())}).promise;
   const empty=[];
   for(let i=1;i<=pdf.numPages;i++){
    onProgress(i,pdf.numPages);const page=await pdf.getPage(i);const c=await page.getTextContent();
    const pageText=c.items.filter(x=>typeof x.str==='string').map(x=>x.str+(x.hasEOL?'\n':' ')).join('');
    if(!pageText.trim())empty.push(i);text+=pageText+'\n\n';page.cleanup();
   }
   if(empty.length)warnings.push(`Páginas sem texto extraível: ${empty.join(', ')}. Imagens ou páginas escaneadas precisam de OCR externo.`);
  }catch(e){if(e.name==='PasswordException')throw new Error('PDF protegido por senha. Exporte uma cópia desbloqueada e tente novamente.');throw e;}
  finally{if(pdf)await pdf.destroy();}
 }else if(ext==='docx'){
  if(!mammoth)throw new Error('Leitor DOCX indisponível.');
  const result=await mammoth.extractRawText({arrayBuffer:await file.arrayBuffer()});text=result.value;
  if(result.messages?.length)warnings.push('O documento contém elementos que podem não ter sido convertidos. Compare o texto extraído com o original.');
 }else if(['txt','md'].includes(ext))text=await file.text();
 else throw new Error('Formato não suportado. Use PDF, DOCX, TXT ou MD.');
 if(!text.trim())throw new Error('O documento não contém texto extraível. Se for escaneado, aplique OCR antes de importar.');
 return {text,warnings};
}
export async function createImagePDF({images,title,PDFLib,convertWebP,onProgress=()=>{}}){
 if(!images.length)throw new Error('Importe as imagens primeiro.');
 if(!PDFLib)throw new Error('Biblioteca PDF indisponível.');
 const doc=await PDFLib.PDFDocument.create();doc.setTitle(title||'Apostilando');doc.setCreator('Apostilando');
 for(let i=0;i<images.length;i++){
  onProgress(i+1,images.length);let data=images[i].data;let image;
  if(data.startsWith('data:image/png;'))image=await doc.embedPng(data);
  else if(data.startsWith('data:image/jpeg;'))image=await doc.embedJpg(data);
  else if(data.startsWith('data:image/webp;')){if(!convertWebP)throw new Error('Conversor WebP indisponível.');image=await doc.embedPng(await convertWebP(data));}
  else throw new Error('Formato de imagem inválido.');
  const pw=595.28,ph=841.89,scale=Math.min(pw/image.width,ph/image.height),width=image.width*scale,height=image.height*scale;
  const page=doc.addPage([pw,ph]);page.drawRectangle({x:0,y:0,width:pw,height:ph,color:PDFLib.rgb(1,1,1)});page.drawImage(image,{x:(pw-width)/2,y:(ph-height)/2,width,height});
 }
 return doc.save();
}
