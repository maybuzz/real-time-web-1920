(function() {
  const form = document.querySelector('.chat-form')
  const nameForm = document.querySelector('.username-form')
  const ul = document.querySelector('#messages')
  const input = document.querySelector('#message')
  const name = document.querySelector('#username')

  const play = document.querySelector('.play')
  const pause = document.querySelector('.pause')
  const footer = document.querySelector('.footer')
  const btnBack = document.querySelector('.btn--back')

  console.log("have fun");

  const socket = io()

  form.addEventListener('submit', function(e) {
		e.preventDefault()

    if (input.value.length > 0 && input.value !== ' ' && input.value !== '  ' && input.value !== '   ') {

      console.log("h", input.value);

      socket.emit('chat message', input.value)

      // console.log("msg", msg)

      input.value = ''

  		return false
    } else {
      console.log("ewa mag niet");
    }

  })

  nameForm.addEventListener('submit', function(e) {
		e.preventDefault()

    if (name.value.length > 0 && name.value !== ' ' && name.value !== '  ' && name.value !== '   ') {

      socket.emit('set user', name.value)

  		return false
    } else {
      console.log("ewa mag niet");
    }

  })

  socket.on('chat message', function(msg){
    console.log("msg", msg)
    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'chat-msg chat-msg-me-text')
    newLi.textContent = msg
    ul.append(newLi)
  })

  // socket.emit('recieve message')
  //
  socket.on('recieve message', function(msg) {

    console.log("other", msg)

    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'chat-msg chat-msg-user-text')
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

  // play pause tracks
  play.addEventListener('click', (btn) => {
    btn.preventDefault()

    const data = {
      uri: play.id
    }

    play.classList.toggle('invisible')
    pause.classList.remove('invisible')

    socket.emit('play album', data)

  })

  pause.addEventListener('click', (btn) => {
    btn.preventDefault()

    const data = {
      uri: play.id
    }

    play.classList.toggle('invisible')
    pause.classList.toggle('invisible')

    socket.emit('pause album', data)
  })

  btnBack.addEventListener('click', (btn) => {
    const data = {
      uri: play.id
    }
    socket.emit('leave room', data)
  })

  // socket play pause tracks
  socket.on('play track', function(track){
    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'track-msg--play')
    newLi.textContent = "start playing"
    ul.append(newLi)
  })

  socket.on('pause track', function(track){
    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'track-msg--pause')
    newLi.textContent = "stop playing"
    ul.append(newLi)
  })

  socket.on('leave room', function(track){
    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'track-msg--pause')
    newLi.textContent = "aju paraplu"
    ul.append(newLi)
  })


}())
