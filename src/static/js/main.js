(function() {
  const form = document.querySelector('.chat-form')
  const ul = document.querySelector('#messages')
  const input = document.querySelector('#m')

  console.log("have fun");

  const socket = io()

  socket.on('welcomeMessage', function(res) {

    const msg = `welcome to this room!`
    const newLi = document.createElement('li')
    const p = document.createElement('p')
    newLi.setAttribute('class', 'chat-msg-welcome')
    newLi.appendChild(p)
    p.textContent = msg
    ul.append(newLi)
  })

  socket.on('connectedUser', function(res) {

    const msg = `${res.id} joined the room`
    const newLi = document.createElement('li')
		newLi.setAttribute('class', 'joined')
		newLi.textContent = msg
		ul.append(newLi)

  })

  form.addEventListener('submit', function(e) {
		e.preventDefault()

    if (input.value.length > 0 && input.value !== ' ' && input.value !== '  ' && input.value !== '   ') {
      socket.emit('chat message', input.value)

      const newLi = document.createElement('li')
      newLi.setAttribute('class', 'me')
      newLi.textContent = input.value
      ul.append(newLi)

      input.value = ''
  		return false
    } else {
      console.log("ewa mag niet");
    }

  })

	socket.on('chatMessage', function(msg) {

    const newLi = document.createElement('li')
    const p = document.createElement('p')
		newLi.setAttribute('class', 'chat-msg')
    newLi.setAttribute('class', 'chat-msg-me')
		newLi.appendChild(p)
    p.textContent = msg.message
    ul.append(newLi)

  })


}())
