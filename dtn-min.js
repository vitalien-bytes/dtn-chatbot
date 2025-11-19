(function(){function loadCSS(s){var l=document.createElement("style");l.textContent=s;document.head.appendChild(l);}
function addMsg(t,f){var b=document.getElementById("dtn-chat-msgs");var m=document.createElement("div");
m.className="msg "+(f=="user"?"user":"bot");m.innerHTML="<div class='bub'>"+t+"</div>";b.appendChild(m);b.scrollTop=b.scrollHeight;}
loadCSS(`
#dtn-chat-btn{position:fixed;right:20px;bottom:20px;background:#0b7f8f;color:#fff;
padding:14px 22px;border-radius:999px;cursor:pointer;font-weight:600;z-index:999999;box-shadow:0 6px 20px rgba(0,0,0,0.25);}
#dtn-chat-win{position:fixed;right:20px;bottom:80px;width:360px;max-height:520px;background:#fff;border-radius:18px;
display:none;flex-direction:column;z-index:9999999;box-shadow:0 18px 40px rgba(0,0,0,0.35);}
#dtn-chat-head{padding:14px;background:#0b7f8f;color:#fff;font-weight:600;display:flex;justify-content:space-between;}
#dtn-chat-msgs{flex:1;padding:14px;overflow-y:auto;background:#f6fafc;}
.msg{margin-bottom:10px;}
.bub{padding:10px 12px;border-radius:14px;max-width:80%;display:inline-block;}
.msg.bot .bub{background:#e8f6f7;color:#0b4b57;}
.msg.user .bub{background:#0b7f8f;color:#fff;margin-left:auto;}
#dtn-chat-input{display:flex;border-top:1px solid #ddd;}
#dtn-chat-input input{flex:1;padding:10px;border:none;outline:none;}
#dtn-chat-input button{background:#0b7f8f;color:#fff;padding:0 16px;border:none;cursor:pointer;font-weight:600;}
.opts button{margin:6px 6px 0 0;padding:6px 10px;border-radius:14px;border:1px solid #0b7f8f;background:white;color:#0b7f8f;cursor:pointer;}
`);
var r=document.createElement("div");
r.innerHTML=`<button id="dtn-chat-btn">Besoin d’un devis ? 💬</button>
<div id="dtn-chat-win">
<div id="dtn-chat-head">Assistant DTN <span id="dtn-x" style="cursor:pointer;font-weight:bold;">✖</span></div>
<div id="dtn-chat-msgs"></div>
<div id="dtn-chat-input"><input id="txt" placeholder="Votre message..."><button id="send">Envoyer</button></div>
</div>`;
document.body.appendChild(r);

function showOpts(){var b=document.getElementById("dtn-chat-msgs");var o=document.createElement("div");
o.className="opts";o.innerHTML=`<button onclick="window.dtnStart('info')">Aide / renseignements</button>
<button onclick="window.dtnStart('devis')">Demander un devis</button>`;b.appendChild(o);}

window.dtnStart=function(t){addMsg(t=="info"?"Aide / renseignements":"Demander un devis","user");
if(t=="info"){addMsg("Très bien 😊 Quel renseignement puis-je vous apporter ?");}
else{addMsg("Très bien 👍 Quel type de besoin souhaitez-vous pour votre devis ?");
showType();}};

function showType(){var b=document.getElementById("dtn-chat-msgs");var o=document.createElement("div");
o.className="opts";o.innerHTML=`
<button onclick="window.ask('terrassement')">Terrassement</button>
<button onclick="window.ask('electricite')">Électricité</button>
<button onclick="window.ask('regard')">Regard télécom</button>
<button onclick="window.ask('internet')">Internet</button>
<button onclick="window.ask('irve')">IRVE</button>
<button onclick="window.ask('pv')">Photovoltaïque</button>
<button onclick="window.ask('autre')">Autre</button>`;b.appendChild(o);}

window.ask=function(t){addMsg(t,"user");addMsg("Merci 😊 Pouvez-vous m'en dire un peu plus sur votre besoin ?");}

document.getElementById("dtn-chat-btn").onclick=function(){document.getElementById("dtn-chat-win").style.display="flex";
document.getElementById("dtn-chat-btn").style.display="none";
addMsg("Bonjour 😊 et bienvenue chez Digital Telecom Network.");
addMsg("Souhaitez-vous une aide ou demander un devis ?");
showOpts();};

document.getElementById("dtn-x").onclick=function(){
document.getElementById("dtn-chat-win").style.display="none";document.getElementById("dtn-chat-btn").style.display="block";};

document.getElementById("send").onclick=function(){
var v=document.getElementById("txt").value.trim();if(!v)return;
addMsg(v,"user");document.getElementById("txt").value="";setTimeout(()=>addMsg("Merci 🙏"),200);};

})();
