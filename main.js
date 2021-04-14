window.onload = () => {
  if (!localStorage.getItem('myName')) {
    resetChat()
  }
}

function resetChat() {
  const myName = prompt('Your name');
  localStorage.setItem('myName', myName);
  localStorage.setItem('myMessages', '[]')
  renderMessages()
}

function sendMessage() {
  const input = document.querySelector('#message-input')
  const text = input.value;
  const name = localStorage.getItem('myName');
  let myMessages = JSON.parse(localStorage.getItem('myMessages'));

  myMessages.push({ name, text });

  localStorage.setItem('myMessages', JSON.stringify(myMessages));
  input.value = '';
  renderMessages();
}

function renderMessages() {
  const messageList = document.querySelector('#chat');
  const myMessages = JSON.parse(localStorage.getItem('myMessages'));

  console.log(myMessages)

  while (messageList.firstChild) {
    messageList.removeChild(messageList.firstChild);
  }

  myMessages.forEach(message => {
    const messageItem = document.createElement('li');
    messageItem.classList.add('list-group-item', 'list-group-item-action');
    messageItem.innerHTML = `<h4> ${message.name} </h4> <p>${message.text}</p>`
    messageList.appendChild(messageItem)
  })
}

function sendNotification() {

}

document.querySelector('#message-form').addEventListener('submit', (event) => {
  event.preventDefault();
  sendMessage();
})

document.querySelector('#button-wipe').addEventListener('click', () => {
  resetChat()
})