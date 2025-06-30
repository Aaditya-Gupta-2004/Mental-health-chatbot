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

