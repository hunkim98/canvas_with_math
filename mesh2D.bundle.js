(()=>{"use strict";var t={684:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0});const o=r(5881),i=r(6502),s=r(4249);e.default=class{constructor(t){this.fps=60,this.origin=[0,0],this.degree=0,this.vertexCount=4,this.isColored=!1,this.mode="Mesh",this.triangleCount=2,this.squareHalfSize=30,this.rawVertices=[[-this.squareHalfSize-100,-this.squareHalfSize],[-this.squareHalfSize,this.squareHalfSize],[this.squareHalfSize,this.squareHalfSize],[this.squareHalfSize+100,-this.squareHalfSize]],this.canvas=t,this.context=t.getContext("2d"),this.canvas.style.border="1px solid black",this.width=300,this.height=300,this.canvas.width=this.width,this.canvas.height=this.height,this.canvas.style.width=`${this.width}px`,this.canvas.style.height=`${this.height}px`,console.log("canvas has been set!"),this.rectVectors=(0,s.createRectVectors)(50,50),this.isDirectionChanged=!1,this.updateFrame()}toggleColorMode(){this.isColored=!this.isColored}updateFrame(){this.clear(),this.drawAll(),setTimeout((()=>{requestAnimationFrame(this.updateFrame.bind(this))}),1e3/this.fps)}drawColoredMesh2d(){const t=[0,1,2,0,2,3];for(let e=0;e<this.triangleCount;e++){const r=3*e,a=[this.rawVertices[t[r]],this.rawVertices[t[r+1]],this.rawVertices[t[r+2]]],n=[Math.min(a[0][0],a[1][0],a[2][0]),Math.min(a[0][1],a[1][1],a[2][1])],c=[Math.max(a[0][0],a[1][0],a[2][0]),Math.max(a[0][1],a[1][1],a[2][1])],h=(0,i.addVectors)(a[1],a[0].map((t=>-t))),l=(0,i.addVectors)(a[2],a[0].map((t=>-t))),d=(0,i.dotVectors)(h,l),u=(0,i.dotVectors)(l,l),f=(0,i.dotVectors)(h,h),g=d*d-u*f;if(0===g)continue;const V=1/g,w=(0,o.toScreenPointVector)(n),C=(0,o.toScreenPointVector)(c);w[0]=Math.max(-this.canvas.width/2,w[0]),w[1]=Math.max(-this.canvas.height/2,w[1]),C[0]=Math.min(this.canvas.width/2,C[0]),C[1]=Math.min(this.canvas.height/2,C[1]);for(let t=w[0];t<=C[0];++t)for(let e=w[1];e<=C[1];++e){const r=[t,e],o=(0,i.addVectors)(r,a[0].map((t=>-t))),n=(0,i.dotVectors)(o,h),c=(0,i.dotVectors)(o,l),g=(c*d-n*u)*V,w=(n*d-c*f)*V,C=1-g-w;g>=0&&g<=1&&w>=0&&w<=1&&C>=0&&C<=1&&(0,s.drawCartesianPoint)(this.canvas,[t,e],{r:255,g:0,b:0,a:255})}}}drawMesh2D(){const t=[0,1,2,0,2,3];for(let e=0;e<this.triangleCount;e++){const r=3*e;(0,s.drawLine)(this.canvas,this.rawVertices[t[r]],this.rawVertices[t[r+1]]),(0,s.drawLine)(this.canvas,this.rawVertices[t[r]],this.rawVertices[t[r+2]]),(0,s.drawLine)(this.canvas,this.rawVertices[t[r+1]],this.rawVertices[t[r+2]])}}drawAll(){this.isColored?this.drawColoredMesh2d():this.drawMesh2D()}drawWithCartesianOrigin(t){this.context.save(),this.context.transform(1,0,0,-1,this.width/2,this.height/2),t(),this.context.restore()}clear(){this.context.clearRect(0,0,this.width,this.height)}}},869:function(t,e,r){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=o(r(684)),s=document.getElementById("canvas");console.log(s);const a=new i.default(s);document.getElementById("toggleButton").onclick=()=>{a.toggleColorMode()}},4077:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.equalsInTolerance=e.CohenSutherlandLineClip=e.testRegion=void 0,e.testRegion=(t,e,r)=>{let o=0;return t[0]<e[0]?o|=1:t[0]>r[0]&&(o|=2),t[1]<e[1]?o|=4:t[1]>r[1]&&(o|=8),o},e.CohenSutherlandLineClip=(t,r,o,i)=>{let s=(0,e.testRegion)(t,o,i),a=(0,e.testRegion)(r,o,i);const n=r[0]-t[0],c=r[1]-t[1];for(;;){if(0===s&&0===a)return!0;if(s&a)return!1;{let h=[0,0];const l=0!==s,d=l?s:a;d<4?(h[0]=1&d?o[0]:i[0],(0,e.equalsInTolerance)(c,0)?h[1]=t[1]:h[1]=t[1]+c*(h[0]-t[0])/n):(h[1]=4&d?o[1]:i[1],(0,e.equalsInTolerance)(n,0)?h[0]=t[0]:h[0]=t[0]+n*(h[1]-t[1])/c),l?(t=h,s=(0,e.testRegion)(t,o,i)):(r=h,a=(0,e.testRegion)(r,o,i))}}return!0},e.equalsInTolerance=(t,e,r=1e-8)=>Math.abs(e-t)<=r},5881:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.toScreenPointVector=void 0,e.toScreenPointVector=t=>{const e=[];for(let r=0;r<t.length;r++)e.push(Math.floor(t[r]));return e}},6502:(t,e)=>{function r(t,e){if(t.length!==e.length)throw new Error("the vectors' length differ");let r=0;return t.map(((t,o)=>{r+=t*e[o]})),r}function o(t,e){const r=[];for(let o=0;o<t.length;o++){const i=t[o]*e;r.push(i)}return r}Object.defineProperty(e,"__esModule",{value:!0}),e.returnVectorSize=e.normalizeVector=e.scalarVector=e.subtractVectors=e.dotVectors=e.addVectors=void 0,e.addVectors=function(t,e){const r=[];for(let o=0;o<t.length;o++){const i=t[o]+e[o];r.push(i)}return r},e.dotVectors=r,e.subtractVectors=function(t,e){const r=[];for(let o=0;o<t.length;o++){const i=t[o]-e[o];r.push(i)}return r},e.scalarVector=o,e.normalizeVector=function(t){return o(t,1/Math.sqrt(r(t,t)))},e.returnVectorSize=function(t){let e=0;for(const r of t)e+=r*r;return e}},4249:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.createCircleVectors=e.createRectVectors=e.drawCartesianPointByPixel=e.drawCartesianPoint=e.drawPoint=e.drawCartesianLineByContext=e.drawLine=void 0;const o=r(4077),i=r(5881),s=r(6502);e.drawLine=(t,r,s)=>{let a=r,n=s;const c=[-t.width/2,-t.height/2],h=[t.width/2,t.height/2];if(!(0,o.CohenSutherlandLineClip)(a,n,c,h))return;const l=(0,i.toScreenPointVector)(a),d=(0,i.toScreenPointVector)(n),u=d[0]-l[0],f=d[1]-l[1],g=Math.abs(u)>=Math.abs(f),V=u>=0?1:-1,w=f>0?1:-1,C=V*u,v=w*f;let M=g?2*v-C:2*C-v;const p=g?2*v:2*C,m=g?2*(v-C):2*(C-v);let S=l[0],P=l[1];if(g)for(;S!=d[0];)(0,e.drawCartesianPoint)(t,(0,i.toScreenPointVector)([S,P])),M<0?M+=p:(M+=m,P+=w),S+=V;else for(;P!=d[1];)(0,e.drawCartesianPoint)(t,(0,i.toScreenPointVector)([S,P])),M<0?M+=p:(M+=m,S+=V),P+=w},e.drawCartesianLineByContext=(t,e,r,o="black",i=1)=>{const a=t.getContext("2d"),n=(0,s.addVectors)(e,[Math.floor(t.width/2),Math.floor(t.height/2)]),c=(0,s.addVectors)(r,[Math.floor(t.width/2),Math.floor(t.height/2)]);a.strokeStyle=o,a.lineWidth=i,a.beginPath(),a.moveTo(n[0],n[1]),a.lineTo(c[0],c[1]),a.stroke()},e.drawPoint=(t,e,r,o)=>{const s=(0,i.toScreenPointVector)(r);e.fillStyle=`rgba(${o.r}, ${o.g}, ${o.b}, ${o.a})`,e.fillRect(s[0],s[1],1,1)},e.drawCartesianPoint=(t,e,r={r:0,g:0,b:0,a:255})=>{e[1]=-e[1];const o=t.getContext("2d"),a=(0,i.toScreenPointVector)(e),n=(0,s.addVectors)(a,[Math.floor(t.width/2),Math.floor(t.height/2)]);o.fillStyle=`rgba(${r.r}, ${r.g}, ${r.b}, ${r.a})`,o.strokeStyle=`rgba(${r.r}, ${r.g}, ${r.b}, ${r.a})`,o.fillRect(n[0],n[1],1,1)},e.drawCartesianPointByPixel=(t,e,r,o)=>{const a=(0,i.toScreenPointVector)(r),n=(0,s.addVectors)(a,[Math.floor(t.width/2),Math.floor(t.height/2)]),c=e.getImageData(n[0],n[1],1,1),h=c.data;h[0]=o.r,h[1]=o.g,h[2]=o.b,h[3]=255,e.putImageData(c,n[0],n[1])},e.createRectVectors=(t,e)=>{const r=[];for(let o=-t/2;o<=t/2;o+=1)for(let t=-e/2;t<=e/2;t+=1)r.push([o,t]);return r},e.createCircleVectors=t=>{const e=[];for(let r=-t;r<=t;r+=1)for(let o=-t;o<=t;o+=1){const i=[r,o];(0,s.returnVectorSize)(i)<t*t&&e.push(i)}return e}}},e={};!function r(o){var i=e[o];if(void 0!==i)return i.exports;var s=e[o]={exports:{}};return t[o].call(s.exports,s,s.exports,r),s.exports}(869)})();