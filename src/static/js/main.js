(function() {
  const form = document.querySelector('.chat-form')
  const ul = document.querySelector('#messages')
  const input = document.querySelector('#message')
  const play = document.querySelector('.play')
  const pause = document.querySelector('.pause')
  const footer = document.querySelector('.footer')
  const btnBack = document.querySelector('.btn--back')

  console.log("have fun");

  const socket = io()

  form.addEventListener('submit', function(e) {
		e.preventDefault()

    if (input.value.length > 0 && input.value !== ' ' && input.value !== '  ' && input.value !== '   ') {

      socket.emit('chat message', input.value)

      input.value = ''

  		return false
    } else {
      console.log("ewa mag niet");
    }

    if (username.value.length > 0 && username.value !== ' ' && username.value !== '  ' && username.value !== '   ') {

      socket.emit('set user', username.value)

  		return false
    } else {
      console.log("ewa mag niet");
    }

  })

  socket.on('chat message', function(msg){
    console.log("msg", msg);
    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'chat-msg')
    newLi.setAttribute('class', 'chat-msg-me-text')
    newLi.textContent = msg
    ul.append(newLi)
  })

  socket.on('server message', function(msg){
    console.log("serverMsg", msg);
    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'server-msg')
    newLi.textContent = msg
    ul.append(newLi)
  })

  play.addEventListener('click', (btn) => {

    btn.preventDefault()

    const data = {
      uri: play.id,
      token: footer.id
    }

    play.classList.toggle('invisible')
    pause.classList.remove('invisible')

    socket.emit('play album', data)

  })

  pause.addEventListener('click', (btn) => {

    btn.preventDefault()

    const data = {
      uri: play.id,
      token: footer.id
    }

    play.classList.toggle('invisible')
    pause.classList.toggle('invisible')

    socket.emit('pause album', data)

  })

  btnBack.addEventListener('click', (btn) => {

    const data = {
      uri: play.id,
      token: footer.id
    }

    socket.emit('leave room', data)

  })

  socket.on('play track', function(track){

    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'server-msg')
    newLi.textContent = "hoi"
    ul.append(newLi)
  })

  socket.on('pause track', function(track){

    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'server-msg')
    newLi.textContent = "doei"
    ul.append(newLi)
  })

  socket.on('leave room', function(track){

    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'server-msg')
    newLi.textContent = "dikke doei"
    ul.append(newLi)
  })


  // socket.on('server message', (data) => {
  //
  // })
  //
  // socket.on('newConnection', (data) => {
  //   console.log("client", data.id)
  //   socket.emit('welcome', {} )
  //
  //   const msg = `welcome to this room!`
  //   const newLi = document.createElement('li')
  //   const p = document.createElement('p')
  //   newLi.setAttribute('class', 'chat-msg-welcome')
  //   newLi.appendChild(p)
  //   p.textContent = msg
  //   ul.append(newLi)
  // })
  //
  // socket.on('connectedUser', function(res) {
  //
  //   const msg = `${res.id} joined the room`
  //   const newLi = document.createElement('li')
	// 	newLi.setAttribute('class', 'joined')
	// 	newLi.textContent = msg
	// 	ul.append(newLi)
  //
  // })
  //
  // form.addEventListener('submit', function(e) {
	// 	e.preventDefault()
  //
  //   if (input.value.length > 0 && input.value !== ' ' && input.value !== '  ' && input.value !== '   ') {
  //     socket.emit('chat message', input.value)
  //
  //     const newLi = document.createElement('li')
  //     newLi.setAttribute('class', 'me')
  //     newLi.textContent = input.value
  //     ul.append(newLi)
  //
  //     input.value = ''
  // 		return false
  //   } else {
  //     console.log("ewa mag niet");
  //   }
  //
  // })
  //
	// socket.on('chatMessage', function(msg) {
  //
  //   const newLi = document.createElement('li')
  //   const p = document.createElement('p')
	// 	newLi.setAttribute('class', 'chat-msg')
  //   newLi.setAttribute('class', 'chat-msg-me')
	// 	newLi.appendChild(p)
  //   p.textContent = msg.message
  //   ul.append(newLi)
  //
  // })


}())
