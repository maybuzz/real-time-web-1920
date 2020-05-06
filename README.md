# Get a room · rtw 1920

"Get a Room" is a real-time application using the spotify API and socket.io. Users can join or create rooms to listen to a certain album together. Within the chatroom users can discuss the songs on the album; talk about the artist, share facts about the album, etc.

![prototype 2](/img/prototype2.png)

## Table of contents
- [Live demo](#Live-demo)
- [Install](#Install)
- [Events](#Events)
- [API](#API)
- [Concept](#Concept)
- [Data](#DLC)
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

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- This would be a good place for your data life cycle ♻️-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜  -->

[rubric]: https://docs.google.com/spreadsheets/d/e/2PACX-1vSd1I4ma8R5mtVMyrbp6PA2qEInWiOialK9Fr2orD3afUBqOyvTg_JaQZ6-P4YGURI-eA7PoHT8TRge/pubhtml
