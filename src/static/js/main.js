(function() {
  const socket = io()

  const form = document.querySelector('.chat-form')
  const nameForm = document.querySelector('.username-form')
  const ul = document.querySelector('#messages')
  const input = document.querySelector('#message')
  const name = document.querySelector('#username')

  const play = document.querySelector('.play')
  const pause = document.querySelector('.pause')
  const footer = document.querySelector('.footer')
  const btnBack = document.querySelector('.btn--back')

  const fromUrl = Qs.parse({room: window.location.pathname})

  const room = fromUrl.room

  // join room
  socket.emit('joinRoom', { room })

  // get room and users
  // socket.on('roomUsers', ())

  // client (me) messages
  socket.on('chat message', function(msg){
    console.log("msg", msg)
    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'chat-msg chat-msg-me-text')
    newLi.textContent = msg
    ul.append(newLi)

    ul.scrollTop = ul.scrollHeight
  })

  // recieve user messages
  socket.on('recieve message', function(msg) {

    console.log("other", msg)

    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'chat-msg chat-msg-user-text')
    newLi.textContent = msg
    ul.append(newLi)

    ul.scrollTop = ul.scrollHeight
  })

  // messages from server
  socket.on('server message', function(msg){
    console.log("serverMsg", msg);
    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'server-msg')
    newLi.textContent = msg
    ul.append(newLi)

    ul.scrollTop = ul.scrollHeight

  })

  // play album
  play.addEventListener('click', (btn) => {
    btn.preventDefault()

    const data = {
      uri: play.id
    }

    play.classList.toggle('invisible')
    pause.classList.remove('invisible')

    socket.emit('play album', data)

  })

  // pause album
  pause.addEventListener('click', (btn) => {
    btn.preventDefault()

    const data = {
      uri: play.id
    }

    play.classList.toggle('invisible')
    pause.classList.toggle('invisible')

    socket.emit('pause album', data)
  })

  // leave room
  btnBack.addEventListener('click', (btn) => {
    const data = {
      uri: play.id
    }
    socket.emit('leave room', data)
  })

  // msg sockets play album
  socket.on('play track', function(track){
    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'track-msg--play')
    newLi.textContent = "start playing"
    ul.append(newLi)
  })

  // msg sockets pause album
  socket.on('pause track', function(track){
    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'track-msg--pause')
    newLi.textContent = "stop playing"
    ul.append(newLi)
  })

  // msg sockets leave room
  socket.on('leave room', function(track){
    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'track-msg--pause')
    newLi.textContent = "aju paraplu"
    ul.append(newLi)
  })

  // handle form shizzle
  // send msg
  form.addEventListener('submit', function(e) {
		e.preventDefault()

    if (input.value.length > 0 && input.value !== ' ' && input.value !== '  ' && input.value !== '   ') {

      socket.emit('chat message', input.value)

      input.value = ''

  		return false
    } else {
      console.log("ewa mag niet");
    }

  })

  // set username
  nameForm.addEventListener('submit', function(e) {
		e.preventDefault()

    if (name.value.length > 0 && name.value !== ' ' && name.value !== '  ' && name.value !== '   ') {

      socket.emit('set user', name.value)

  		return false
    } else {
      console.log("ewa mag niet");
    }

  })


}())
