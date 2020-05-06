# Get a room · rtw 1920

"Get a Room" is a real-time application using the spotify API and socket.io. Users can join or create rooms to listen to a certain album together. Within the chatroom users can discuss the songs on the album; talk about the artist, share facts about the album, etc.

![prototype 2](/img/prototype3.png)

## Table of contents
- [Live demo](#Live-demo)
- [Install](#Install)
- [Events](#Events)
- [API](#API)
- [Concept](#Concept)
- [Data](#DLC)
- [Snippets](#Snippets)
- [Checklist](#Checklist)
- [To-do](#To-do)
- [Credits](#Credits)

## Live demo
[Click here](https://get-a-recordroom.herokuapp.com/) to see my live demo.

As you can see this version is not yet finished. There is still a lot to do - please take a look at my [checklist](#Checklist) to see everything I'd still like to do/add. Besides several functionalities this app is missing valuable error handling and overall checks; forgive me if something goes wrong... <3

## Install
To install this project you'll have to fork this repository and open your terminal

```bash
  # insert your username to this link
  # put this in your terminal to clone the repo
  git clone https://github.com/your-user-name/real-time-web-1920/
  npm install
  node app.js
```

## Events
- `join room` & `leave room` -> If you're the first one to join a room you will become the host; you can play and pause the album. If you (the host) leave the room someone else will become the host. If the room is empty, it will stop playing the tracks of the album until a user joins the room again. Joining- and leaving a room will also fire socket events to show other users someone has joined/left the room.
- `currently playing` -> The profile picture in the top right corner will change to the album cover of your currently playing track. If this is not available we'll use the cover of your most recently played track.
- `play album` & `pause album` -> As a host you can play and pause the album. This effects all the users/sockets inside the room.
- `leaving the room` -> Leaving the room will stop/pause the listening session. This way users will need to join a room to listen to an album.

## API
The Spotify API has a lot of different endpoint you could use. For this application we'll be using;
- `/search?q=name:{...}&type=album` -> to search for an album, use user input to complete the query
- `/albums`, `/albums/{id}`-> get several albums or get a specific album using the Spotify ID
- `/albums/{id}/tracks` -> get the tracks from a specific album using the Spotify ID  
- `/me/player/{play of pause}` -> interact with spotify app; start/play/pause tracks
- `/me/player/recently-played` -> interact with spotify app; start/play/pause tracks
- `/me/top/{artist or tracks}` -> get personal top tracks or artists

## Concept
The chatrooms in this app are created by users and revolve around different albums on Spotify. When a user enters the room they will join the others inside the room and listen to the set album together. This way everyone can listen to the same album at the same time, as if you're listening to a record with your friends. Users can join and leave as they please, everything is connected to your Spotify account. You will need to open Spotify so the app can set the right song, when listening to the album together.

Your profile shows your Top Artists and -Songs. This tells other users a lot about your use of Spotify and maybe it will even spark a new friendship. Who knows :)

### DLC
![DLC](/img/DLC.png)

## Snippets
There are a few elements in my code that I'm very proud of. For example, the part where I send my album data to the sockets. I struggles with this for a while, but I finally got it figured out.

```js
// snippet from main.js
// this is the part where I change the control buttons and send an event to the server.
// here I can handle the pause album event.
// which is almost the same as the 'leave room' event below
pause.addEventListener('click', (btn) => {

  btn.preventDefault()

  const data = {
    // uri & token data
  }

  play.classList.toggle('invisible')
  pause.classList.toggle('invisible')

  socket.emit('pause album', data)

})
```

The following code snippets show my app handling an event, both server- and client side. I struggled with figuring out how to do a PUT request using oAuth. This took a lot of time and it still needs a lot of thinking, but I felt like I needed to move on. Next time, I will for sure use a database to store my data and tokens, cause I feel like this will make a lot of thinks much easier.

```js
// snippet from app.js
// this is the part where I handle the event of a user leaving the room.
// first I pause the album playing, then I emit the event to the client.
socket.on('leave room', function(album) {

  function pauseAlbum(album){

    return fetch(`https://api.spotify.com/v1/me/player/pause`,
    {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + album.token
      },
      body: JSON.stringify({
        context_uri: album.uri
      })
    }).then((response) => response.json())
  }

  pauseAlbum(album)

  io.emit('leave room')
})
```
```js
// snippet from main.js
// on the server I emitted a 'leave room' event.
// now I can respond to this event on the client, using the same event ('leave room').
// this creates a server-msg saying bye.
socket.on('leave room', function(track){

  const newLi = document.createElement('li')
  newLi.setAttribute('class', 'server-msg')
  newLi.textContent = "aju paraplu"
  ul.append(newLi)
})
```

## Checklist
- [x] Search for album
- [x] Get room with album + tracks
  - [ ] Setup custom rooms using socket.io
  - [ ] Set position of track for all users, using socket.io
- [ ] Separate host from clients
- [x] Play/pause album
- [x] Pause album on leave
- [ ] Start/play album on join
- [ ] Chat in room
  - [x] Send messages
  - [x] Receive messages
  - [ ] Styling; personal messages & user messages
  - [ ] Set custom username
- [ ] Show user profile
  - [ ] Currently playing
  - [ ] Top artists/tracks
- [ ] Work with database to store data & messages etc.
- [ ] Use socket.io for everything
- [ ] Make responsive (mobile, tablet)
- [ ] Multi user support: broadcast track to all sockets.

## To-do
- [ ] Data life cycle iteration
- [x] Ejs templates
- [x] CSS
- [x] Setup server
- [x] Connect spotify API
  - [x] Use OAuth
  - [x] Get data
    - [x] Get currently playing track
    - [x] Get recently played tracks
    - [x] Search album, set album to room
    - [x] Play/pause tracks
  - [ ] Use data
- [x] Setup socket.io
  - [ ] Finish chat
  - [ ] Setup rooms
  - [ ] Play album on different sockets
  - [ ] Room host and clients
- [ ] Setup database
- [ ] Error handling
- [ ] Write checks (data check, spotify active check etc)

## Credits
[Guido Bouman](https://github.com/guidobouman) for live-coding   
[Titus Wormer](https://github.com/wooorm) for rubberducking         
[Spotify developer docs](https://developer.spotify.com/console/) for endpoints and documentation   
[maybuzz/meesterproef-1819](https://github.com/maybuzz/meesterproef-1819) for oAuth setup   

## License
[MIT](LICENSE) © [Luna May Johansson](https://github.com/maybuzz)

[rubric]: https://docs.google.com/spreadsheets/d/e/2PACX-1vSd1I4ma8R5mtVMyrbp6PA2qEInWiOialK9Fr2orD3afUBqOyvTg_JaQZ6-P4YGURI-eA7PoHT8TRge/pubhtml
