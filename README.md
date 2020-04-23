# Get a room ·

"Get a Room" is a real-time application using the spotify API and socket.io. Users can join or create rooms to listen to a certain album together. Within the chatroom users can discuss the songs on the album; talk about the artist, share facts about the album, etc.

![prototype 1](/img/prototype1.png)

## Table of contents
- [Live demo](#Live-demo)
- [Install](#Install)
- [Concept](#Concept)
- [API](#API)
- [Data](#DLC)
- [To-do](#To-do)
- [Resources](#Resources)

## Live demo
[Click here](...) to see my live demo.

## Install
To install this project you'll have to fork this repository and open your terminal

```bash
  # insert your username to this link
  # put this in your terminal to clone the repo
  git clone https://github.com/your-user-name/real-time-web-1920/
```

## Features
The chatrooms in this app are created by users and revolve around different albums on Spotify. When a user enters the room they will join the others inside the room and listen to the set album together. This way everyone can listen to the same album at the same time, as if you're listening to a record with your friends. Users can join and leave as they please, everything is connected to your Spotify account. You will need to open Spotify so the app can set the right song, when listening to the album together.

Your profile shows your Top Artists and -Songs. This tells other users a lot about your use of Spotify and maybe it will even spark a new friendship. Who knows :)

## API
The Spotify API has a lot of different endpoint you could use. For this application we'll be using;
- `/search?q=name:{...}&type=album` -> to search for an album, use user input to complete the query
- `/albums`, `/albums/{id}`-> get several albums or get a specific album using the Spotify ID
- `/albums/{id}/tracks` -> get the tracks from a specific album using the Spotify ID  
- `/me/top/{artist or tracks}` -> get personal top tracks or artists
- `/users/{user_id}` -> get user's profile

### DLC
![DLC](/img/DLC.png)


## To-do
- [ ] Data life cycle
- [x] Setup templates
- [x] Add stylesheet
- [x] Get API keys
- [x] Setup server
- [ ] Connect spotify API
  - [ ] Use OAuth
  - [ ] Get top listened, currently playing, albums
- [ ] Setup socket.io
  - [ ] Chatrooms
  - [ ] Private chat
- [ ] Setup data storage (localstorage? DB?)

## Resources


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
