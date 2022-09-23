(()=>{"use strict";var t={684:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0});const o=r(5881),s=r(6502),i=r(4249);e.default=class{constructor(t){this.fps=60,this.origin=[0,0],this.degree=0,this.vertexCount=4,this.isColored=!1,this.mode="Mesh",this.triangleCount=2,this.squareHalfSize=30,this.rawVertices=[[-this.squareHalfSize-100,-this.squareHalfSize],[-this.squareHalfSize,this.squareHalfSize],[this.squareHalfSize,this.squareHalfSize],[this.squareHalfSize+100,-this.squareHalfSize]],this.canvas=t,this.context=t.getContext("2d"),this.canvas.style.border="1px solid black",this.width=300,this.height=300,this.canvas.width=this.width,this.canvas.height=this.height,this.canvas.style.width=`${this.width}px`,this.canvas.style.height=`${this.height}px`,console.log("canvas has been set!"),this.rectVectors=(0,i.createRectVectors)(50,50),this.isDirectionChanged=!1,this.updateFrame()}toggleColorMode(){this.isColored=!this.isColored}updateFrame(){this.clear(),this.drawAll(),setTimeout((()=>{requestAnimationFrame(this.updateFrame.bind(this))}),1e3/this.fps)}drawColoredMesh2d(){const t=[0,1,2,0,2,3];for(let e=0;e<this.triangleCount;e++){const r=3*e,a=[this.rawVertices[t[r]],this.rawVertices[t[r+1]],this.rawVertices[t[r+2]]],n=[Math.min(a[0][0],a[1][0],a[2][0]),Math.min(a[0][1],a[1][1],a[2][1])],h=[Math.max(a[0][0],a[1][0],a[2][0]),Math.max(a[0][1],a[1][1],a[2][1])],c=(0,s.addVectors)(a[1],a[0].map((t=>-t))),l=(0,s.addVectors)(a[2],a[0].map((t=>-t))),d=(0,s.dotVectors)(c,l),u=(0,s.dotVectors)(l,l),f=(0,s.dotVectors)(c,c),g=d*d-u*f;if(0===g)continue;const w=1/g,V=(0,o.toScreenPointVector)(n),C=(0,o.toScreenPointVector)(h);V[0]=Math.max(-this.canvas.width/2,V[0]),V[1]=Math.max(-this.canvas.height/2,V[1]),C[0]=Math.min(this.canvas.width/2,C[0]),C[1]=Math.min(this.canvas.height/2,C[1]);for(let t=V[0];t<=C[0];++t)for(let e=V[1];e<=C[1];++e){const r=[t,e],o=(0,s.addVectors)(r,a[0].map((t=>-t))),n=(0,s.dotVectors)(o,c),h=(0,s.dotVectors)(o,l),g=(h*d-n*u)*w,V=(n*d-h*f)*w,C=1-g-V;g>=0&&g<=1&&V>=0&&V<=1&&C>=0&&C<=1&&(0,i.drawCartesianPoint)(this.canvas,[t,e],{r:255,g:0,b:0,a:255})}}}drawMesh2D(){const t=[0,1,2,0,2,3];for(let e=0;e<this.triangleCount;e++){const r=3*e;(0,i.drawLine)(this.canvas,this.rawVertices[t[r]],this.rawVertices[t[r+1]]),(0,i.drawLine)(this.canvas,this.rawVertices[t[r]],this.rawVertices[t[r+2]]),(0,i.drawLine)(this.canvas,this.rawVertices[t[r+1]],this.rawVertices[t[r+2]])}}drawAll(){this.isColored?this.drawColoredMesh2d():this.drawMesh2D()}drawWithCartesianOrigin(t){this.context.save(),this.context.transform(1,0,0,-1,this.width/2,this.height/2),t(),this.context.restore()}clear(){this.context.clearRect(0,0,this.width,this.height)}}},869:function(t,e,r){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const s=o(r(684)),i=document.getElementById("canvas");console.log(i);const a=new s.default(i);document.getElementById("toggleButton").onclick=()=>{a.toggleColorMode()}},4077:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.equalsInTolerance=e.CohenSutherlandLineClip=e.testRegion=void 0,e.testRegion=(t,e,r)=>{let o=0;return t[0]<e[0]?o|=1:t[0]>r[0]&&(o|=2),t[1]<e[1]?o|=4:t[1]>r[1]&&(o|=8),o},e.CohenSutherlandLineClip=(t,r,o,s)=>{let i=(0,e.testRegion)(t,o,s),a=(0,e.testRegion)(r,o,s);const n=r[0]-t[0],h=r[1]-t[1];for(;;){if(0===i&&0===a)return!0;if(i&a)return!1;{let c=[0,0];const l=0!==i,d=l?i:a;d<4?(c[0]=1&d?o[0]:s[0],(0,e.equalsInTolerance)(h,0)?c[1]=t[1]:c[1]=t[1]+h*(c[0]-t[0])/n):(c[1]=4&d?o[1]:s[1],(0,e.equalsInTolerance)(n,0)?c[0]=t[0]:c[0]=t[0]+n*(c[1]-t[1])/h),l?(t=c,i=(0,e.testRegion)(t,o,s)):(r=c,a=(0,e.testRegion)(r,o,s))}}return!0},e.equalsInTolerance=(t,e,r=1e-8)=>Math.abs(e-t)<=r},5881:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.toScreenPointVector=void 0,e.toScreenPointVector=t=>{const e=[];for(let r=0;r<t.length;r++)e.push(Math.floor(t[r]));return e}},6502:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.returnVectorSize=e.scalarVector=e.subtractVectors=e.dotVectors=e.addVectors=void 0,e.addVectors=function(t,e){const r=[];for(let o=0;o<t.length;o++){const s=t[o]+e[o];r.push(s)}return r},e.dotVectors=function(t,e){if(t.length!==e.length)throw new Error("the vectors' length differ");let r=0;return t.map(((t,o)=>{r+=t*e[o]})),r},e.subtractVectors=function(t,e){const r=[];for(let o=0;o<t.length;o++){const s=t[o]-e[o];r.push(s)}return r},e.scalarVector=function(t,e){const r=[];for(let o=0;o<t.length;o++){const s=t[o]*e;r.push(s)}return r},e.returnVectorSize=function(t){let e=0;for(const r of t)e+=r*r;return e}},4249:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.createCircleVectors=e.createRectVectors=e.drawCartesianPointByPixel=e.drawCartesianPoint=e.drawPoint=e.drawCartesianLineByContext=e.drawLine=void 0;const o=r(4077),s=r(5881),i=r(6502);e.drawLine=(t,r,i)=>{let a=r,n=i;const h=[-t.width/2,-t.height/2],c=[t.width/2,t.height/2];if(!(0,o.CohenSutherlandLineClip)(a,n,h,c))return;const l=(0,s.toScreenPointVector)(a),d=(0,s.toScreenPointVector)(n),u=d[0]-l[0],f=d[1]-l[1],g=Math.abs(u)>=Math.abs(f),w=u>=0?1:-1,V=f>0?1:-1,C=w*u,v=V*f;let p=g?2*v-C:2*C-v;const M=g?2*v:2*C,S=g?2*(v-C):2*(C-v);let P=l[0],m=l[1];if(g)for(;P!=d[0];)(0,e.drawCartesianPoint)(t,(0,s.toScreenPointVector)([P,m])),p<0?p+=M:(p+=S,m+=V),P+=w;else for(;m!=d[1];)(0,e.drawCartesianPoint)(t,(0,s.toScreenPointVector)([P,m])),p<0?p+=M:(p+=S,P+=w),m+=V},e.drawCartesianLineByContext=(t,e,r,o="black",s=1)=>{const a=t.getContext("2d"),n=(0,i.addVectors)(e,[Math.floor(t.width/2),Math.floor(t.height/2)]),h=(0,i.addVectors)(r,[Math.floor(t.width/2),Math.floor(t.height/2)]);a.strokeStyle=o,a.lineWidth=s,a.beginPath(),a.moveTo(n[0],n[1]),a.lineTo(h[0],h[1]),a.stroke()},e.drawPoint=(t,e,r,o)=>{const i=(0,s.toScreenPointVector)(r);e.fillStyle=`rgba(${o.r}, ${o.g}, ${o.b}, ${o.a})`,e.fillRect(i[0],i[1],1,1)},e.drawCartesianPoint=(t,e,r={r:0,g:0,b:0,a:255})=>{e[1]=-e[1];const o=t.getContext("2d"),a=(0,s.toScreenPointVector)(e),n=(0,i.addVectors)(a,[Math.floor(t.width/2),Math.floor(t.height/2)]);o.fillStyle=`rgba(${r.r}, ${r.g}, ${r.b}, ${r.a})`,o.strokeStyle=`rgba(${r.r}, ${r.g}, ${r.b}, ${r.a})`,o.fillRect(n[0],n[1],1,1)},e.drawCartesianPointByPixel=(t,e,r,o)=>{const a=(0,s.toScreenPointVector)(r),n=(0,i.addVectors)(a,[Math.floor(t.width/2),Math.floor(t.height/2)]),h=e.getImageData(n[0],n[1],1,1),c=h.data;c[0]=o.r,c[1]=o.g,c[2]=o.b,c[3]=255,e.putImageData(h,n[0],n[1])},e.createRectVectors=(t,e)=>{const r=[];for(let o=-t/2;o<=t/2;o+=1)for(let t=-e/2;t<=e/2;t+=1)r.push([o,t]);return r},e.createCircleVectors=t=>{const e=[];for(let r=-t;r<=t;r+=1)for(let o=-t;o<=t;o+=1){const s=[r,o];(0,i.returnVectorSize)(s)<t*t&&e.push(s)}return e}}},e={};!function r(o){var s=e[o];if(void 0!==s)return s.exports;var i=e[o]={exports:{}};return t[o].call(i.exports,i,i.exports,r),i.exports}(869)})();