export function compactDimensions(width,height){
 if(!Number.isFinite(width)||!Number.isFinite(height)||width<=0||height<=0)throw new Error('Dimensões de imagem inválidas.');
 // A4 em aproximadamente 144 dpi. Mantém proporção e não amplia originais menores.
 const scale=Math.min(1,1191/width,1684/height);
 return {width:Math.max(1,Math.round(width*scale)),height:Math.max(1,Math.round(height*scale))};
}
export async function compressForPDF(data,{load,createCanvas=()=>document.createElement('canvas')}={}){
 const image=await load(data),size=compactDimensions(image.naturalWidth,image.naturalHeight),canvas=createCanvas();canvas.width=size.width;canvas.height=size.height;
 try{const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Seu navegador não disponibilizou a compactação de imagens.');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,size.width,size.height);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(image,0,0,size.width,size.height);const out=canvas.toDataURL('image/jpeg',.84);if(!out.startsWith('data:image/jpeg;'))throw new Error('Não foi possível compactar a imagem em JPEG. Use Qualidade original.');if(size.width===image.naturalWidth&&size.height===image.naturalHeight&&/^data:image\/(png|jpeg);/.test(data)&&data.length<=out.length)return data;return out;}finally{canvas.width=0;canvas.height=0;}
}
export function imageOrdinal(name){const match=String(name).match(/^(?:(?:pagina|página|page|pg|img)[ _-]*)?(\d{1,3})(?=[ _.-]|$)/i);const n=match?Number(match[1]):NaN;return Number.isInteger(n)&&n>=1&&n<=103?n:null;}
export function orderNumberedImages(images){return images.every(x=>imageOrdinal(x.name)!==null)?[...images].sort((a,b)=>imageOrdinal(a.name)-imageOrdinal(b.name)):[...images];}
export function numberedImageName(image,index,total=99){const ext=image.data.startsWith('data:image/jpeg;')?'jpg':image.data.startsWith('data:image/webp;')?'webp':'png';return `${String(index+1).padStart(Math.max(2,String(total).length),'0')}.${ext}`;}
export async function createNumberedZip(images,JSZip,onProgress=()=>{}){if(!images.length)throw new Error('Importe as imagens primeiro.');if(!JSZip)throw new Error('Biblioteca ZIP indisponível. Atualize a instalação.');const zip=new JSZip();images.forEach((image,i)=>zip.file(numberedImageName(image,i,images.length),image.data.split(',')[1],{base64:true}));return zip.generateAsync({type:'uint8array',compression:'STORE'},onProgress);}
