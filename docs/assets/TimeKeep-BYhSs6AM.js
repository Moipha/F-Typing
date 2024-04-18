import{s as W,n as R,o as O,d as Y,r as z,a as Z,w as x,b,c as C,e as s,F,f as V,g as U,v as G,u as p,h as P,i as j,j as T,k as J,l as K,m as H,T as I,p as A,q as ee,t as S,x as te,y as se,_ as oe}from"./index-lrhmLs6o.js";import{u as q}from"./useTypingStore-Cb1ZAk2R.js";function le(e){const{blockRefs:m,caret:u,blocksContainer:y}=W(q()),k=()=>{const o=m.value[e.value[0]];if(!o){console.error("Block元素未定义");return}l(e.value[1],o)},l=(o,f)=>{if(!f){console.error("Block元素不存在");return}const n=f.children[1].children;if(n.length<o){console.error(`Block中不足${o}个code`);return}const a=n[o]||n[o-1];o!=n.length,w(a,o!=n.length)};function w(o,f){const d=u.value;if(!d){console.error("CaretElement元素不存在");return}const n=o.offsetTop+o.offsetHeight/2-d.offsetHeight/2,a=o.offsetLeft+(f?0:o.offsetWidth);d.style.top=`${n}px`,d.style.left=`${a}px`}return{handleTyping:k}}function ae(e,m){const{words:u,blockRefs:y,caret:k,enWords:l,startTime:w}=W(q());function o(){var a,i;(a=k.value)==null||a.classList.remove("hide"),(i=k.value)==null||i.classList.add("waiting")}function f(){var a;(a=k.value)==null||a.classList.add("hide")}function d(a){const{codeElements:i,cn:v}=n(e.value[0]);if(k.value&&k.value.classList.remove("waiting"),a.code.startsWith("Key")){if(w.value||(w.value=Date.now()),l.value[e.value[0]].typing?l.value[e.value[0]].typing+=a.key:l.value[e.value[0]].typing=a.key,e.value[1]!=i.length){const r=i[e.value[1]];r.classList.add(a.key==l.value[e.value[0]].en[e.value[1]]?"correct":"wrong"),r.classList.remove("skip")}u.value.length<=e.value[0]&&console.error("block索引越界"),e.value[1]<u.value[e.value[0]].en.length?e.value[0]==u.value.length-1&&e.value[1]==l.value[e.value[0]].en.length-1?m(l.value):e.value[1]++:u.value.length>e.value[0]+1?(u.value[e.value[0]].en+=a.key,R(()=>{i[e.value[1]].classList.add("wrong"),e.value[1]++})):m(l.value)}else if(a.code==="Space")e.value[1]!=0&&(e.value[0]<u.value.length-1?([...i].slice(e.value[1],i.length).forEach(g=>g.classList.add("skip")),l.value[e.value[0]].isCorrect=l.value[e.value[0]].typing==l.value[e.value[0]].en,v.classList.toggle("wrong",!l.value[e.value[0]].isCorrect),v.classList.toggle("correct",l.value[e.value[0]].isCorrect),e.value=[e.value[0]+1,0]):m(l.value));else if(a.code==="Backspace"){if(e.value[0]==0&&e.value[1]==0)return;if(e.value[1]<=0){const{codeElements:r,cn:g}=n(e.value[0]-1),h=[...r];if(g.classList.remove("wrong","correct"),l.value[e.value[0]-1].isCorrect=void 0,h.filter(_=>_.classList.contains("skip")).length>0){let _;for(let t=0;t<h.length;t++)if(h[t].classList.contains("skip")){_=t;break}h.slice(_,h.length).forEach(t=>t.classList.remove("skip")),_?e.value=[e.value[0]-1,_]:console.error("索引元素不存在")}else e.value=[e.value[0]-1,u.value[e.value[0]-1].en.length]}else{const r=l.value[e.value[0]].typing;r&&(l.value[e.value[0]].typing=r.slice(0,-1)),e.value[1]>l.value[e.value[0]].en.length?(u.value[e.value[0]].en=u.value[e.value[0]].en.slice(0,-1),R(()=>e.value[1]--)):(e.value[1]--,i[e.value[1]].classList.remove("correct","wrong"))}}}function n(a){const i=y.value[a];if(!i){console.error("Block元素不存在");return}const v=i.children[0],g=i.children[1].children;return{cn:v,codeElements:g}}return{startTyping:o,endTyping:f,typing:d,startTime:w}}function ne(e,m,u){const{generateWords:y,updateRefs:k,settings:l}=q(),{words:w,startTime:o,blocksContainer:f,blockRefs:d}=W(q());function n(v){v[m.value[0]].isCorrect=v[m.value[0]].typing==v[m.value[0]].en;const r=Date.now();if(!o.value){console.error("计时未开始");return}const g=(r-o.value)/1e3,h=Math.round(g)+"s",E=v.filter(D=>D.isCorrect).length;let _=E/g*60;_=Math.round(_*100)/100;const N=_.toFixed(2);let t=E/w.value.length;t=Math.round(t*100);const L=t+"%";e.value.wpm=N,e.value.correctness=L,e.value.during=h,u.value=!0}function a(v){d.value.forEach(r=>{r.children[0].classList.remove("wrong","correct","skip"),[...r.children[1].children].forEach(h=>{h.classList.remove("wrong","correct","skip")})}),o.value=null,i(v),u.value=!1,R(()=>{f.value&&f.value.focus(),m.value=[0,0]})}function i(v){k(),y(v)}return y(l.generateWordsNum),O(()=>{o.value=null}),{handleEnd:n,restart:a}}const B=e=>(te("data-v-fc29729b"),e=e(),se(),e),ie={class:"items-center column"},re={class:"q-ma-lg num-chooser"},ce={key:0,class:"num-chooser-split"},ue=["onClick"],ve={class:"items-center column"},pe={class:"cn-word"},fe={class:"en-word"},de=B(()=>s("span",null,"点击词块开始输入",-1)),ge=B(()=>s("span",null,"祝玩得开心 : )",-1)),me={class:"result items-center column"},he={class:"row justify-around result-item-container"},_e={class:"result-item"},ke={class:"result-key row items-center"},ye=B(()=>s("b",null,[s("em",{style:{"text-decoration":"underline","font-size":"14px"}},"Words Per Minute")],-1)),we=B(()=>s("br",null,null,-1)),be=B(()=>s("span",{style:{"font-size":"13px"}},"每分钟键入的单词数",-1)),Ce={class:"result-value correct"},Te={class:"result-item"},Le=B(()=>s("div",{class:"result-key"},"正确率",-1)),Be={class:"result-value correct"},Ee={class:"result-item"},Ne=B(()=>s("div",{class:"result-key"},"用时",-1)),Se={class:"result-value correct"},qe=Y({__name:"TimeKeep",setup(e){const{words:m,caret:u,blocksContainer:y,startTime:k}=W(q()),{setBlockRef:l,settings:w}=q(),o=z(!1),f=z({wpm:"",correctness:"",during:""}),d=z([0,0]),n=z(w.generateWordsNum),a=z([20,30,40,50]),{handleTyping:i}=le(d),{handleEnd:v,restart:r}=ne(f,d,o),{startTyping:g,endTyping:h,typing:E}=ae(d,v);function _(N){n.value!=N&&(n.value=N,r(n.value))}return R(()=>{y.value&&y.value.focus()}),Z(()=>{window.addEventListener("resize",i),x(d,()=>{i()},{deep:!0,immediate:!0})}),O(()=>{window.removeEventListener("resize",i)}),(N,t)=>{const L=A("q-btn"),D=A("q-tooltip"),Q=A("q-icon");return b(),C("div",ie,[s("div",re,[(b(!0),C(F,null,V(a.value,(c,$)=>(b(),C("span",{key:$},[$!=0?(b(),C("span",ce,"/")):ee("",!0),s("span",{onClick:M=>_(c),class:J([n.value==c?"correct":"","num-chooser-num"])},S(c),11,ue)]))),128))]),U(s("div",ve,[s("div",{ref_key:"blocksContainer",ref:y,onFocus:t[0]||(t[0]=(...c)=>p(g)&&p(g)(...c)),onBlur:t[1]||(t[1]=(...c)=>p(h)&&p(h)(...c)),onKeydown:[t[2]||(t[2]=(...c)=>p(E)&&p(E)(...c)),t[3]||(t[3]=P(j(()=>{},["prevent"]),["space"]))],onClick:t[4]||(t[4]=(...c)=>p(i)&&p(i)(...c)),tabindex:"0",class:"row words-container"},[s("div",{ref_key:"caret",ref:u,class:"caret"},null,512),(b(!0),C(F,null,V(p(m),(c,$)=>(b(),C("div",{ref_for:!0,ref:M=>p(l)(M,$),key:$,class:"column items-center word-block"},[s("div",pe,S(c.cn),1),s("div",fe,[(b(!0),C(F,null,V(c.en,(M,X)=>(b(),C("code",{key:X},S(M),1))),128))])]))),128))],544),T(L,{onKeydown:t[5]||(t[5]=P(j(c=>p(r)(n.value),["prevent"]),["space"])),onClick:t[6]||(t[6]=c=>p(r)(n.value)),class:"re-btn",padding:"xl",icon:"refresh",size:"lg",unelevated:""}),s("div",{class:J([p(k)?"transport":"","tip column q-mt-xl items-center"])},[de,s("span",null,[K("按"),T(L,{padding:"0px 3px",push:"",label:"Space"}),K("进入下一个词块")]),s("span",null,[T(L,{padding:"0px 3px",push:"",label:"Tab"}),K(" + "),T(L,{padding:"0px 3px",push:"",label:"Space"}),K("可以重来")]),ge],2)],512),[[G,!o.value]]),T(I,{name:"result"},{default:H(()=>[U(s("div",me,[s("div",he,[s("div",_e,[s("div",ke,[K("WPM "),T(Q,{class:"q-ml-xs cursor-pointer",name:"info"},{default:H(()=>[T(D,{"transition-show":"scale","transition-hide":"scale",class:"text-btnText bg-active",anchor:"top middle",self:"bottom middle",offset:[10,10]},{default:H(()=>[ye,we,be]),_:1})]),_:1})]),s("div",Ce,S(f.value.wpm),1)]),s("div",Te,[Le,s("div",Be,S(f.value.correctness),1)]),s("div",Ee,[Ne,s("div",Se,S(f.value.during),1)])]),T(L,{onKeydown:t[7]||(t[7]=P(j(c=>p(r)(n.value),["prevent"]),["space"])),onClick:t[8]||(t[8]=c=>p(r)(n.value)),class:"re-btn",padding:"xl",icon:"refresh",size:"lg",unelevated:""})],512),[[G,o.value]])]),_:1})])}}}),Ke=oe(qe,[["__scopeId","data-v-fc29729b"]]);export{Ke as default};