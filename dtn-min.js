(function(){

/* ---------- STYLES ---------- */
function loadCSS(s){
  var l=document.createElement("style");
  l.textContent=s;
  document.head.appendChild(l);
}

loadCSS(`
#dtn-chat-btn{
  position:fixed;right:20px;bottom:20px;background:#0b7f8f;color:#fff;
  padding:14px 22px;border-radius:999px;cursor:pointer;font-weight:600;
  z-index:999999;box-shadow:0 6px 20px rgba(0,0,0,0.25);}
#dtn-chat-win{
  position:fixed;right:20px;bottom:80px;width:360px;max-height:520px;
  background:#fff;border-radius:18px;display:none;flex-direction:column;
  z-index:9999999;box-shadow:0 18px 40px rgba(0,0,0,0.35);}
#dtn-chat-head{
  padding:14px;background:#0b7f8f;color:#fff;font-weight:600;
  display:flex;justify-content:space-between;}
#dtn-chat-msgs{
  flex:1;padding:14px;overflow-y:auto;background:#f6fafc;}
.msg{margin-bottom:10px;}
.bub{padding:10px 12px;border-radius:14px;max-width:80%;display:inline-block;}
.msg.bot .bub{background:#e8f6f7;color:#0b4b57;}
.msg.user .bub{background:#0b7f8f;color:#fff;margin-left:auto;}
#dtn-chat-input{display:flex;border-top:1px solid #ddd;}
#dtn-chat-input input{
  flex:1;padding:10px;border:none;outline:none;}
#dtn-chat-input button{
  background:#0b7f8f;color:#fff;padding:0 16px;border:none;
  cursor:pointer;font-weight:600;}
.opts button{
  margin:6px 6px 0 0;padding:6px 10px;border-radius:14px;
  border:1px solid #0b7f8f;background:white;color:#0b7f8f;cursor:pointer;}
`);

/* ---------- HTML STRUCTURE ----------*
