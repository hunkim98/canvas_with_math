(()=>{"use strict";var t={9560:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0});const o=s(5008),i=s(3592),r=s(1795),n=s(3610),a=s(691);e.default=class{constructor(t){this.fps=60,this.frameCount=0,this.then=0,this.render=()=>{this.gameObject.transform.addYawRotation(1),this.gameObject.transform.addPitchRotation(1),this.clear(),this.drawScene(),setTimeout((()=>{requestAnimationFrame(this.render.bind(this))}),1e3/this.fps)},this.canvas=t,this.context=t.getContext("2d"),this.canvas.style.border="1px solid black",this.width=300,this.height=300,this.canvas.width=this.width,this.canvas.height=this.height,this.canvas.style.width=`${this.width}px`,this.canvas.style.height=`${this.height}px`,this.camera=new n.CameraObject,this.camera.transform.setPosition(new o.Vector3(0,0,500)),this.camera.transform.setRotation(new r.Rotator(180,0,0)),this.gameEngine=new a.GameEngine(this.camera),this.gameObject=this.gameEngine.createGameObject("cube",a.GameEngine.CubeMesh),this.gameObject.transform.setScale(new o.Vector3(50,50,50)),console.log("canvas has been set!"),requestAnimationFrame(this.render)}render3D(){const t=this.gameEngine.getGameObjects();for(const e of t){this.camera.transform.update(),e.transform.update();const t=this.camera.getViewMatrix().multiplyMatrix(this.gameObject.transform.getModelingMatrix());this.drawMesh3D(e.getMesh(),t,e.transform)}}drawMesh3D(t,e,s,o){const r=t.getVertices(),n=t.getIndices(),a=r.map((t=>e.multiplyVector(t.toAffine(!0)).toVector3())),h=n.length/3;for(let t=0;t<h;++t){const e=3*t,o=a[n[e+1]].subtract(a[n[e]]),r=a[n[e+2]].subtract(a[n[e]]),h=o.crossProduct(r),c=s.position.subtract(this.camera.transform.position);h.dot(c)>=0||((0,i.drawLine)(this.canvas,a[n[e]].toAffine(!0),a[n[e+1]].toAffine(!0)),(0,i.drawLine)(this.canvas,a[n[e]].toAffine(!0),a[n[e+2]].toAffine(!0)),(0,i.drawLine)(this.canvas,a[n[e+1]].toAffine(!0),a[n[e+2]].toAffine(!0)))}}drawScene(){this.render3D()}clear(){this.context.clearRect(0,0,this.width,this.height)}}},8092:function(t,e,s){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=o(s(9560)),r=document.getElementById("canvas");console.log(r),new i.default(r)},1246:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.CubeMesh=void 0;const o=s(5008),i=s(7185),r=[new o.Vector3(-1,-1,-1),new o.Vector3(-1,1,-1),new o.Vector3(-1,1,1),new o.Vector3(-1,-1,1),new o.Vector3(-1,-1,1),new o.Vector3(-1,1,1),new o.Vector3(1,1,1),new o.Vector3(1,-1,1),new o.Vector3(1,-1,-1),new o.Vector3(1,1,-1),new o.Vector3(-1,1,-1),new o.Vector3(-1,-1,-1),new o.Vector3(1,-1,1),new o.Vector3(1,1,1),new o.Vector3(1,1,-1),new o.Vector3(1,-1,-1),new o.Vector3(-1,1,1),new o.Vector3(-1,1,-1),new o.Vector3(1,1,-1),new o.Vector3(1,1,1),new o.Vector3(1,-1,1),new o.Vector3(1,-1,-1),new o.Vector3(-1,-1,-1),new o.Vector3(-1,-1,1)],n=[0,2,1,0,3,2],a=n.map((t=>t+4)),h=a.map((t=>t+4)),c=h.map((t=>t+4)),l=c.map((t=>t+4)),u=l.map((t=>t+4)),d=[...n,...a,...h,...c,...l,...u];e.CubeMesh=new i.Mesh3D(r,d)},3610:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.CameraObject=void 0;const o=s(5008),i=s(9436),r=s(4735),n=s(7879);e.CameraObject=class{constructor(){this.transform=new n.TransformComponent}getViewAxes(){return{OutViewX:this.transform.getLocalX().scalarBy(-1),OutViewY:this.transform.getLocalY(),OutViewZ:this.transform.getLocalZ().scalarBy(-1)}}getViewMatrix(){const{OutViewX:t,OutViewY:e,OutViewZ:s}=this.getViewAxes(),i=this.transform.position;return new r.Matrix4x4(new o.Vector3(t.x,e.x,s.x).toAffine(!1),new o.Vector3(t.y,e.y,s.y).toAffine(!1),new o.Vector3(t.z,e.z,s.z).toAffine(!1),new o.Vector3(-t.dot(i),-e.dot(i),-s.dot(i)).toAffine(!0))}getViewMatrixRotationOnly(){const{OutViewX:t,OutViewY:e,OutViewZ:s}=this.getViewAxes();return new r.Matrix4x4(new o.Vector3(t.x,e.x,s.x).toAffine(!1),new o.Vector3(t.y,e.y,s.y).toAffine(!1),new o.Vector3(t.z,e.z,s.z).toAffine(!1),i.Vector4.UnitW)}}},691:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.GameEngine=void 0;const o=s(1246),i=s(5930);class r{constructor(t){this.gameObjects=[],this.mainCamera=t}createGameObject(t,e){const s=new i.GameObject(t,e);return this.gameObjects.push(s),s}getSpecificGameObject(t){return this.gameObjects.find((e=>e.getName()===t))}getGameObjects(){return this.gameObjects}getMainCamera(){return this.mainCamera}}e.GameEngine=r,r.CubeMesh=o.CubeMesh},5930:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.GameObject=void 0;const o=s(7879);e.GameObject=class{constructor(t,e){this.isVisible=!0,this.name=t,this.mesh=e,this.transform=new o.TransformComponent}setHash(t){this.hash=t}getName(){return this.name}setMesh(t){this.mesh=t}getMesh(){return this.mesh}}},7879:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.TransformComponent=void 0;const o=s(5008),i=s(4735),r=s(1795);e.TransformComponent=class{constructor(){this.position=o.Vector3.Zero,this.rotation=new r.Rotator,this.scale=o.Vector3.One,this.right=o.Vector3.UnitX,this.up=o.Vector3.UnitY,this.forward=o.Vector3.UnitZ}addYawRotation(t){this.rotation.Yaw+=t,this.update()}addPitchRotation(t){this.rotation.Pitch+=t,this.update()}addRollRotation(t){this.rotation.Roll+=t,this.update()}update(){this.rotation.clamp();const{OutRight:t,OutUp:e,OutForward:s}=this.rotation.getLocalAxes();this.right=t,this.up=e,this.forward=s}setPosition(t){this.position=t,this.update()}setRotation(t){this.rotation=t,this.update()}setLocalAxes(t,e,s){this.right=t,this.up=e,this.forward=s}setScale(t){this.scale=t}getModelingMatrix(){return new i.Matrix4x4(this.right.scalarBy(this.scale.x).toAffine(!1),this.up.scalarBy(this.scale.y).toAffine(!1),this.forward.scalarBy(this.scale.z).toAffine(!1),this.position.toAffine(!0))}getLocalX(){return this.right}getLocalY(){return this.up}getLocalZ(){return this.forward}}},7185:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Mesh3D=void 0,e.Mesh3D=class{constructor(t,e,s,o){this.vertices=t,this.indices=e,this.color=s||[],this.UVs=o||[]}getVertices(){return this.vertices}getIndices(){return this.indices}getColors(){return this.color}getUVs(){return this.UVs}}},3592:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.drawCartesianPoint=e.drawLine=void 0;const o=s(2869),i=s(561),r=s(6086);e.drawLine=(t,s,n,a=r.LinearColor.Black)=>{let h=s instanceof o.Vector2?s:s.toVector2(),c=n instanceof o.Vector2?n:n.toVector2();const l=new o.Vector2(-t.width/2,-t.height/2),u=new o.Vector2(t.width/2,t.height/2);if(!(0,i.CohenSutherlandLineClip)(h,c,l,u))return;const d=h.toScreenPointVector(),w=c.toScreenPointVector(),C=w.x-d.x,x=w.y-d.y,y=Math.abs(C)>=Math.abs(x),V=C>=0?1:-1,m=x>0?1:-1,f=V*C,g=m*x;let p=y?2*g-f:2*f-g;const M=y?2*g:2*f,b=y?2*(g-f):2*(f-g);let v=d.x,O=d.y;if(y)for(;v!=w.x;)(0,e.drawCartesianPoint)(t,new o.Vector2(v,O).toScreenPointVector(),a),p<0?p+=M:(p+=b,O+=m),v+=V;else for(;O!=w.y;)(0,e.drawCartesianPoint)(t,new o.Vector2(v,O).toScreenPointVector(),a),p<0?p+=M:(p+=b,v+=V),O+=m},e.drawCartesianPoint=(t,e,s=r.LinearColor.Black)=>{e.y=-e.y;const i=t.getContext("2d"),n=e.toScreenPointVector().add(new o.Vector2(Math.floor(t.width/2),Math.floor(t.height/2))),a=s.toColor32();i.fillStyle=`rgba(${a.R}, ${a.G}, ${a.B}, ${a.A})`,i.strokeStyle=`rgba(${a.R}, ${a.G}, ${a.B}, ${a.A})`,i.fillRect(n.x,n.y,1,1)}},7098:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Color32=void 0;const o=s(1701);class i{constructor(t,e,s,o=255){this.R=t,this.G=e,this.B=s,this.A=o}static hexToColor32(t){return new i(t>>24&255,t>>16&255,t>>8&255,255&t)}toColorValue(){return((255&this.R)<<24)+((255&this.G)<<16)+((255&this.B)<<8)+(255&this.A)}add(t){const e=(0,o.clamp)(this.R+t.R,0,255),s=(0,o.clamp)(this.G+t.G,0,255),r=(0,o.clamp)(this.B+t.B,0,255),n=(0,o.clamp)(this.A+t.A,0,255);return new i(e,s,r,n)}}e.Color32=i},6086:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.LinearColor=void 0;const o=s(1701),i=s(7098);class r{constructor(t=0,e=0,s=0,o=1){this.OneOver255=1/255,this.R=t,this.G=e,this.B=s,this.A=o}add(t){return new r(this.R+t.R,this.G+t.G,this.B+t.B,this.A+t.A)}scalarBy(t){return new r(this.R*t,this.G*t,this.B*t,this.A*t)}toColor32(){const t=(0,o.clamp)(this.R,0,1),e=(0,o.clamp)(this.G,0,1),s=(0,o.clamp)(this.B,0,1),r=(0,o.clamp)(this.A,0,1);return new i.Color32(255*t,255*e,255*s,255*r)}}e.LinearColor=r,r.White=new r(1,1,1,1),r.Black=new r(0,0,0,1),r.Red=new r(1,0,0,1),r.Green=new r(0,1,0,1),r.Blue=new r(0,0,1,1),r.Yellow=new r(1,1,0,1)},9480:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Matrix2x2=void 0;const o=s(2869);class i{constructor(t=o.Vector2.UnitX,e=o.Vector2.UnitY){this.Cols=[t,e]}transpose(){return new i(new o.Vector2(this.Cols[0].x,this.Cols[1].x),new o.Vector2(this.Cols[0].y,this.Cols[1].y))}add(t){const e=this.Cols[0].add(t.Cols[0]),s=this.Cols[1].add(t.Cols[1]);return new i(e,s)}subtract(t){const e=this.Cols[0].subtract(t.Cols[0]),s=this.Cols[1].subtract(t.Cols[1]);return new i(e,s)}scalarBy(t){return new i(this.Cols[0].scalarBy(t),this.Cols[1].scalarBy(t))}negative(){const t=this.Cols[0].negative(),e=this.Cols[1].negative();return new i(t,e)}determinant(){return this.Cols[0].x*this.Cols[1].y-this.Cols[0].y-this.Cols[1].x}multiplyMatrix(t){const e=this.transpose();return new i(new o.Vector2(e.Cols[0].dot(t.Cols[0]),e.Cols[1].dot(t.Cols[0])),new o.Vector2(e.Cols[0].dot(t.Cols[1]),e.Cols[1].dot(t.Cols[1])))}multiplyVector(t){const e=this.transpose();return new o.Vector2(e.Cols[0].dot(t),e.Cols[1].dot(t))}}e.Matrix2x2=i},1635:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Matrix3x3=void 0;const o=s(5008),i=s(9480);class r{constructor(t=o.Vector3.UnitX,e=o.Vector3.UnitY,s=o.Vector3.UnitZ){this.Cols=[t,e,s]}transpose(){return new r(new o.Vector3(this.Cols[0].x,this.Cols[1].x,this.Cols[2].x),new o.Vector3(this.Cols[0].y,this.Cols[1].y,this.Cols[2].y),new o.Vector3(this.Cols[0].z,this.Cols[1].z,this.Cols[2].z))}add(t){const e=this.Cols[0].add(t.Cols[0]),s=this.Cols[1].add(t.Cols[1]),o=this.Cols[2].add(t.Cols[2]);return new r(e,s,o)}subtract(t){const e=this.Cols[0].subtract(t.Cols[0]),s=this.Cols[1].subtract(t.Cols[1]),o=this.Cols[2].subtract(t.Cols[2]);return new r(e,s,o)}scalarBy(t){return new r(this.Cols[0].scalarBy(t),this.Cols[1].scalarBy(t),this.Cols[2].scalarBy(t))}negative(){const t=this.Cols[0].negative(),e=this.Cols[1].negative(),s=this.Cols[2].negative();return new r(t,e,s)}determinant(){}multiplyMatrix(t){const e=this.transpose();return new r(new o.Vector3(e.Cols[0].dot(t.Cols[0]),e.Cols[1].dot(t.Cols[0]),e.Cols[2].dot(t.Cols[0])),new o.Vector3(e.Cols[0].dot(t.Cols[1]),e.Cols[1].dot(t.Cols[1]),e.Cols[2].dot(t.Cols[1])),new o.Vector3(e.Cols[0].dot(t.Cols[2]),e.Cols[1].dot(t.Cols[2]),e.Cols[2].dot(t.Cols[2])))}multiplyVector(t){const e=this.transpose();return new o.Vector3(e.Cols[0].dot(t),e.Cols[1].dot(t),e.Cols[2].dot(t))}toMatrix2x2(){return new i.Matrix2x2(this.Cols[0].toVector2(),this.Cols[1].toVector2())}}e.Matrix3x3=r},4735:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Matrix4x4=void 0;const o=s(9436),i=s(1635);class r{constructor(t=o.Vector4.UnitX,e=o.Vector4.UnitY,s=o.Vector4.UnitZ,i=o.Vector4.UnitW){this.Cols=[t,e,s,i]}transpose(){return new r(new o.Vector4(this.Cols[0].x,this.Cols[1].x,this.Cols[2].x,this.Cols[3].x),new o.Vector4(this.Cols[0].y,this.Cols[1].y,this.Cols[2].y,this.Cols[3].y),new o.Vector4(this.Cols[0].z,this.Cols[1].z,this.Cols[2].z,this.Cols[3].z),new o.Vector4(this.Cols[0].w,this.Cols[1].w,this.Cols[2].w,this.Cols[3].w))}add(t){const e=this.Cols[0].add(t.Cols[0]),s=this.Cols[1].add(t.Cols[1]),o=this.Cols[2].add(t.Cols[2]),i=this.Cols[3].add(t.Cols[3]);return new r(e,s,o,i)}subtract(t){const e=this.Cols[0].subtract(t.Cols[0]),s=this.Cols[1].subtract(t.Cols[1]),o=this.Cols[2].subtract(t.Cols[2]),i=this.Cols[3].subtract(t.Cols[3]);return new r(e,s,o,i)}scalarBy(t){return new r(this.Cols[0].scalarBy(t),this.Cols[1].scalarBy(t),this.Cols[2].scalarBy(t),this.Cols[3].scalarBy(t))}negative(){const t=this.Cols[0].negative(),e=this.Cols[1].negative(),s=this.Cols[2].negative(),o=this.Cols[3].negative();return new r(t,e,s,o)}multiplyMatrix(t){const e=this.transpose();return new r(new o.Vector4(e.Cols[0].dot(t.Cols[0]),e.Cols[1].dot(t.Cols[0]),e.Cols[2].dot(t.Cols[0]),e.Cols[3].dot(t.Cols[0])),new o.Vector4(e.Cols[0].dot(t.Cols[1]),e.Cols[1].dot(t.Cols[1]),e.Cols[2].dot(t.Cols[1]),e.Cols[3].dot(t.Cols[1])),new o.Vector4(e.Cols[0].dot(t.Cols[2]),e.Cols[1].dot(t.Cols[2]),e.Cols[2].dot(t.Cols[2]),e.Cols[3].dot(t.Cols[2])),new o.Vector4(e.Cols[0].dot(t.Cols[3]),e.Cols[1].dot(t.Cols[3]),e.Cols[2].dot(t.Cols[3]),e.Cols[3].dot(t.Cols[3])))}multiplyVector(t){const e=this.transpose();return new o.Vector4(e.Cols[0].dot(t),e.Cols[1].dot(t),e.Cols[2].dot(t),e.Cols[3].dot(t))}toMatrix3x3(){return new i.Matrix3x3(this.Cols[0].toVector3(),this.Cols[1].toVector3(),this.Cols[2].toVector3())}}e.Matrix4x4=r,r.Identity=[o.Vector4.UnitX,o.Vector4.UnitY,o.Vector4.UnitZ,o.Vector4.UnitW]},1795:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Rotator=void 0;const o=s(5008),i=s(1635);class r{constructor(t=0,e=0,s=0){this.Yaw=r.getAxisClampedValue(t),this.Roll=r.getAxisClampedValue(e),this.Pitch=r.getAxisClampedValue(s)}static getAxisClampedValue(t){let e=t%360;return e<0&&(e+=360),e}clamp(){this.Yaw=r.getAxisClampedValue(this.Yaw),this.Roll=r.getAxisClampedValue(this.Roll),this.Pitch=r.getAxisClampedValue(this.Pitch)}toRadian(){return this.clamp(),{Yaw:this.Yaw*Math.PI/180,Roll:this.Roll*Math.PI/180,Pitch:this.Pitch*Math.PI/180}}getLocalAxes(){const{Yaw:t,Roll:e,Pitch:s}=this.toRadian(),r=new i.Matrix3x3(new o.Vector3(Math.cos(t),0,-Math.sin(t)),o.Vector3.UnitY,new o.Vector3(Math.sin(t),0,Math.cos(t))),n=new i.Matrix3x3(o.Vector3.UnitX,new o.Vector3(0,Math.cos(s),Math.sin(s)),new o.Vector3(0,-Math.sin(s),Math.cos(s))),a=new i.Matrix3x3(new o.Vector3(Math.cos(e),Math.sin(e),0),new o.Vector3(-Math.sin(e),Math.cos(e),0),o.Vector3.UnitZ),h=r.multiplyMatrix(n).multiplyMatrix(a);return{OutRight:h.Cols[0],OutUp:h.Cols[1],OutForward:h.Cols[2]}}}e.Rotator=r},561:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.equalsInTolerance=e.CohenSutherlandLineClip=e.testRegion=void 0;const o=s(2869);e.testRegion=(t,e,s)=>{let o=0;return t.x<e.x?o|=1:t.x>s.x&&(o|=2),t.y<e.y?o|=4:t.y>s.y&&(o|=8),o},e.CohenSutherlandLineClip=(t,s,i,r)=>{let n=(0,e.testRegion)(t,i,r),a=(0,e.testRegion)(s,i,r);const h=s.x-t.x,c=s.y-t.y;for(;;){if(0===n&&0===a)return!0;if(n&a)return!1;{let l=new o.Vector2(0,0);const u=0!==n,d=u?n:a;d<4?(l.x=1&d?i.x:r.x,(0,e.equalsInTolerance)(c,0)?l.y=t.y:l.y=t.y+c*(l.x-t.x)/h):(l.y=4&d?i.y:r.y,(0,e.equalsInTolerance)(h,0)?l.x=t.x:l.x=t.x+h*(l.y-t.y)/c),u?(t=l,n=(0,e.testRegion)(t,i,r)):(s=l,a=(0,e.testRegion)(s,i,r))}}return!0},e.equalsInTolerance=(t,e,s=1e-8)=>Math.abs(e-t)<=s},1701:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.clamp=void 0,e.clamp=(t,e,s)=>Math.min(Math.max(t,e),s)},2869:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Vector2=void 0;const o=s(5008);class i{constructor(t,e){this.x=t||0,this.y=e||0}add(t){return new i(this.x+t.x,this.y+t.y)}subtract(t){return new i(this.x-t.x,this.y-t.y)}negative(){return new i(-this.x,-this.y)}dot(t){return this.x*t.x+this.y*t.y}clone(){return new i(this.x,this.y)}crossProduct(t){return new i(this.x*t.y-this.y*t.x,0)}length(){return Math.sqrt(this.dot(this))}scalarBy(t){return new i(this.x*t,this.y*t)}equals(t){return this.x===t.x&&this.y===t.y}toAffine(t){return new o.Vector3(this.x,this.y,t?1:0)}toArray(){return[this.x,this.y]}normalize(){return this.scalarBy(1/this.length())}toScreenPointVector(){return new i(Math.floor(this.x),Math.floor(this.y))}}e.Vector2=i,i.One=new i(1,1),i.Zero=new i(0,0),i.UnitX=new i(1,0),i.UnitY=new i(0,1)},5008:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Vector3=void 0;const o=s(2869),i=s(9436);class r{constructor(t,e,s){this.x=t||0,this.y=e||0,this.z=s||0}add(t){return new r(this.x+t.x,this.y+t.y,this.z+t.z)}subtract(t){return new r(this.x-t.x,this.y-t.y,this.z-t.z)}negative(){return new r(-this.x,-this.y,-this.z)}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}crossProduct(t){return new r(this.y*t.z-this.z*t.y,this.z*t.x-this.x*t.z,this.x*t.y-this.y*t.x)}clone(){return new r(this.x,this.y,this.z)}length(){return Math.sqrt(this.dot(this))}scalarBy(t){return new r(this.x*t,this.y*t,this.z*t)}equals(t){return this.x===t.x&&this.y===t.y&&this.z===t.z}toAffine(t){return new i.Vector4(this.x,this.y,this.z,t?1:0)}toArray(){return[this.x,this.y,this.z]}toVector2(){return new o.Vector2(this.x,this.y)}normalize(){return this.scalarBy(1/this.length())}}e.Vector3=r,r.One=new r(1,1,1),r.Zero=new r(0,0,0),r.UnitX=new r(1,0,0),r.UnitY=new r(0,1,0),r.UnitZ=new r(0,0,1)},9436:(t,e,s)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Vector4=void 0;const o=s(2869),i=s(5008);class r{constructor(t,e,s,o){this.x=t||0,this.y=e||0,this.z=s||0,this.w=o||0}add(t){return new r(this.x+t.x,this.y+t.y,this.z+t.z,this.w+t.w)}subtract(t){return new r(this.x-t.x,this.y-t.y,this.z-t.z,this.w-t.w)}negative(){return new r(-this.x,-this.y,-this.z,-this.w)}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}crossProduct(t){return new r(this.z*t.w-this.w*t.z,this.w*t.x-this.x*t.w,this.x*t.y-this.y*t.x,this.y*t.z-this.z*t.y)}clone(){return new r(this.x,this.y,this.z,this.w)}length(){return Math.sqrt(this.dot(this))}scalarBy(t){return new r(this.x*t,this.y*t,this.z*t,this.w*t)}equals(t){return this.x===t.x&&this.y===t.y&&this.z===t.z&&this.w===t.w}toArray(){return[this.x,this.y,this.z,this.w]}toVector2(){return new o.Vector2(this.x,this.y)}toVector3(){return new i.Vector3(this.x,this.y,this.z)}normalize(){return this.scalarBy(1/this.length())}}e.Vector4=r,r.One=new r(1,1,1,1),r.Zero=new r(0,0,0,0),r.UnitX=new r(1,0,0,0),r.UnitY=new r(0,1,0,0),r.UnitZ=new r(0,0,1,0),r.UnitW=new r(0,0,0,1)}},e={};!function s(o){var i=e[o];if(void 0!==i)return i.exports;var r=e[o]={exports:{}};return t[o].call(r.exports,r,r.exports,s),r.exports}(8092)})();