
function updateTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var timeString = hours + ':' + minutes;
    document.getElementById('clock').textContent = timeString;
  }
  setInterval(updateTime, 1000);

var running = false;
document.getElementById("chatbot_toggle").onclick = function () {
if (document.getElementById("chatbot").classList.contains("collapsed")) {
document.getElementById("chatbot").classList.remove("collapsed")
document.getElementById("chatbot_toggle").children[0].style.display = "none"
document.getElementById("chatbot_toggle").children[1].style.display = ""
setTimeout(addResponseMsg,1000,"Hi")
}
else {
document.getElementById("chatbot").classList.add("collapsed")
document.getElementById("chatbot_toggle").children[0].style.display = ""
document.getElementById("chatbot_toggle").children[1].style.display = "none"
}
}

const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "static/img/mhcicon.png";
const PERSON_IMG = "static/img/person.png";
const BOT_NAME = "    Psychiatrist Bot";
const PERSON_NAME = "You";
msgerForm.addEventListener("submit", event => {
event.preventDefault();
const msgText = msgerInput.value;
if (!msgText) return;
appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
msgerInput.value = "";
botResponse(msgText);
});
function appendMessage(name, img, side, text) {
//   Simple solution for small apps
const msgHTML = `
<div class="msg ${side}-msg">
<div class="msg-img" style="background-image: url(${img})"></div>
<div class="msg-bubble">
<div class="msg-info">
<div class="msg-info-name">${name}</div>
<div class="msg-info-time">${formatDate(new Date())}</div>
</div>
<div class="msg-text">${text}</div>
</div>
</div>
`;
msgerChat.insertAdjacentHTML("beforeend", msgHTML);
msgerChat.scrollTop += 500;
}
function botResponse(rawText) {
// Bot Response
$.get("/get", { msg: rawText }).done(function (data) {
console.log(rawText);
console.log(data);
const msgText = data;
appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
});
}
// Utils
function get(selector, root = document) {
return root.querySelector(selector);
}
function formatDate(date) {
const h = "0" + date.getHours();
const m = "0" + date.getMinutes();
return `${h.slice(-2)}:${m.slice(-2)}`;
}







































const toggle = document.getElementById('chat-toggle');
const windowEl = document.getElementById('chat-window');
const form = document.getElementById('chat-form');
const input = document.getElementById('msg-input');
const messages = document.getElementById('messages');

toggle.onclick = () => {
  const collapsed = windowEl.classList.toggle('collapsed');
  toggle.textContent = collapsed ? '+' : '–';
};

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addMessage('user', text);
  input.value = '';
  sendToBot(text);
});

function addMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  msg.appendChild(bubble);
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function sendToBot(text) {
  fetch(`/get?msg=${encodeURIComponent(text)}`)
    .then(res => res.text())
    .then(reply => addMessage('bot', reply));
}













const form = document.getElementById('chat-form');
    const input = document.getElementById('msg-input');
    const messages = document.getElementById('messages');

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      addMessage('user', text);
      input.value = '';

      const res = await fetch(`/get?msg=${encodeURIComponent(text)}`);
      const reply = await res.text();
      addMessage('bot', reply);
    });

    function addMessage(sender, text) {
      const msg = document.createElement('div');
      msg.className = `message ${sender}`;
      msg.textContent = text;
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
    }
