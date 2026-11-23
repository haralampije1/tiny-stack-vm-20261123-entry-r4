import{mkdirSync as M,readdirSync as R,readFileSync as r,writeFileSync as W}from'node:fs';import{join as J}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
const SM=256,CM=64,MM=256,SL=1e6,OM=65536;
const IM=new Uint8Array(256);IM[1]=1;IM[2]=4;IM[48]=2;IM[49]=2;IM[50]=2;IM[51]=2;
function po(o){return o==3||o==64||o==80||o==81||o==83?1:o==4||o==23||o==27?1:o==5||o==6||o==65?2:o==7?3:o==49||o==50?1:o>=16&&o<=30&&o!=23?2:o>=32&&o<=34?2:0}
function pu(o){return o==1||o==2||o==64||o==82?1:o==4?2:o==5?2:o==6||o==7?3:o>=16&&o<=30&&o!=23?1:o==23||o==27?1:o>=32&&o<=34?1:0}
function u32(a,b,c,d){return a|b<<8|c<<16|d<<24}
function run(Pg,In){
  const n=Pg.length,D=new Int32Array(SM),K=new Int32Array(CM),Mm=new Int32Array(MM),Out=new Uint8Array(OM);
  let s=0,k=0,o=0,ip=0,c=0,t=0,E=new TextEncoder;
  for(;;){
    if(t==SL)return[10,o,Out];
    if(c<0||c>=n)return[9,o,Out];
    const op=Pg[c],im=IM[op];
    if(c+im>=n)return[9,o,Out];
    const p1=po(op),p2=pu(op);
    if(s<p1)return[2,o,Out];
    if(s-p1+p2>SM)return[3,o,Out];
    t++;const nx=c+1+im;c=nx;
    switch(op){
      case 0:return[0,o,Out];
      case 1:D[s++]=(Pg[nx-1]<<24)>>24;break;
      case 2:D[s++]=u32(Pg[nx-4],Pg[nx-3],Pg[nx-2],Pg[nx-1]);break;
      case 3:s--;break;
      case 4:D[s]=D[s-1];s++;break
      case 5:{const z=D[s-1];D[s-1]=D[s-2];D[s-2]=z;break}
      case 6:D[s]=D[s-2];s++;break
      case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break}
      case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
        const b=D[s-1],a=D[s-2];let r;
        switch(op){
          case 16:r=(a+b)|0;break;case 17:r=(a-b)|0;break;case 18:r=Math.imul(a,b);break;
          case 19:if(b==0)return[4,o,Out];r=a==-2147483648&&b==-1?a:(a/b)|0;break;
          case 20:if(b==0)return[4,o,Out];r=b==-1?0:a%b|0;break;
          case 21:if(b==0)return[4,o,Out];r=Math.floor((a>>>0)/(b>>>0))|0;break;
          case 22:if(b==0)return[4,o,Out];r=((a>>>0)%(b>>>0))|0;break;
          case 24:r=a&b;break;case 25:r=a|b;break;case 26:r=a^b;break;
          case 28:r=a<<(b&31);break;case 29:r=a>>(b&31);break;case 30:r=(a>>>(b&31))|0;break;
          case 32:r=a==b?1:0;break;case 33:r=a<b?1:0;break;default:r=(a>>>0)<(b>>>0)?1:0}
        D[s-2]=r;s--;break}
      case 23:D[s-1]=(-D[s-1])|0;break;case 27:D[s-1]=~D[s-1];break;
      case 48:case 49:case 50:{
        const rl=(Pg[nx-2]|Pg[nx-1]<<8)<<16>>16;let tk=1;
        if(op!=48){const v=D[--s];tk=op==49?v==0:v!=0}if(tk)c=nx+rl;break}
      case 51:{if(k==CM)return[8,o,Out];K[k++]=nx;c=Pg[nx-2]|Pg[nx-1]<<8;break}
      case 52:{if(k==0)return[8,o,Out];c=K[--k];break}
      case 64:{const a=D[s-1];if(a<0||a>=MM)return[6,o,Out];D[s-1]=Mm[a];break}
      case 65:{const a=D[s-1],v=D[s-2];if(a<0||a>=MM)return[6,o,Out];s-=2;Mm[a]=v;break}
      case 80:{const B=E.encode(String(D[s-1]));if(o+B.length>OM)return[11,o,Out];s--;Out.set(B,o);o+=B.length;break}
      case 81:{if(o+1>OM)return[11,o,Out];Out[o++]=D[--s]&255;break}
      case 82:D[s++]=ip<In.length?In[ip++]:-1;break;
      case 83:return[D[--s]&255,o,Out];
      default:return[5,o,Out]}
  }
}
for(const d of R(I).sort()){
  const Pg=r(J(I,d,'program.bin')),In=r(J(I,d,'input.bin')),[ex,o2,Ob]=run(Pg,In),D=J(O,d);
  M(D,{recursive:!0});W(J(D,'stdout.bin'),Buffer.from(Ob.slice(0,o2)));W(J(D,'exit.txt'),ex+'\n');
}