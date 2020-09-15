let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
  {
    name: "Photograph",
    artist: "Ed Sheeran",
    image: "https://wallpapercave.com/wp/wp3098878.jpg",
	path: "https://r3---sn-cnoa-jv3l.googlevideo.com/videoplayback?expire=1600218813&ei=XRJhX5WrJYSgDMeZjMgG&ip=209.127.174.8&id=o-AA6fsDbbCLNeDncTIrsXY0zT5CobJYEpSbB2ROBIlUeE&itag=251&source=youtube&requiressl=yes&vprv=1&mime=audio%2Fwebm&gir=yes&clen=4259917&dur=274.241&lmt=1574997372847461&fvip=3&keepalive=yes&c=WEB&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgPhj0JMhP-xeFhn9IYDDDlCvLExbrmXIbQpy8wdnXM2YCIH6nTI0FIST7xEmj5wovmJ4lIIUZ2Ka72GMP3ATPcITw&ratebypass=yes&redirect_counter=1&rm=sn-a5mdk7s&req_id=baf2c5c8995ea3ee&cms_redirect=yes&ipbypass=yes&mh=nA&mip=59.98.129.187&mm=31&mn=sn-cnoa-jv3l&ms=au&mt=1600196970&mv=u&mvi=3&pcm2cms=yes&pl=22&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AG3C_xAwRQIgCbq_g6mGgZn0uOCfIJlxJJt503gq8HXM6pRMBhqowVoCIQDuGRonkzAgbqNZ9-ejaqhpN59xgSZDnGTWofN52ISxXQ%3D%3D"
  },
  {
    name: "Hey Mama",
    artist: "Sethupathi",
    image: "https://www.filmibeat.com/img/popcorn/movie_posters/sethupathi-20160120175955-14613.jpg",
    path: "https://r1---sn-cnoa-jv3l.googlevideo.com/videoplayback?expire=1600218625&ei=oRFhX_mjAYrU8wSDsLDoDg&ip=209.127.106.85&id=o-AMTdarFoVUW4fO_AmQXcCpvvubz1MbvIxWKc5bz5Xd_S&itag=251&source=youtube&requiressl=yes&vprv=1&mime=audio%2Fwebm&gir=yes&clen=4543558&dur=267.021&lmt=1540910517496037&fvip=4&keepalive=yes&beids=9466586&c=WEB&txp=5511222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAOUv4n_TI5lSIGpi-jyRVGzGnrjWkf6Xrt6vC0_Y04hHAiAxNAE_0RFuVIvdyGGa0fzEYLqaLYj4NDdBND9T15HrNw==&ratebypass=yes&redirect_counter=1&rm=sn-ab5eel7z&fexp=9466586&req_id=180edbd96aa1a3ee&cms_redirect=yes&ipbypass=yes&mh=5e&mip=59.98.129.187&mm=31&mn=sn-cnoa-jv3l&ms=au&mt=1600196924&mv=m&mvi=1&pl=22&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAJ_mV_j8LzRo22yiiVypbh5VCPG1qjTxKkRsrEoQzxqzAiAi6verbBqswUbInU8OiVEXeUik_qYZkRR2PyhCrtJyJQ%3D%3D"
  },
  {
    name: "Perfect",
    artist: "Ed Sheeran",
    image: "https://wallpapercave.com/wp/wp3098878.jpg" ,
    path: "https://r1---sn-cnoa-jv3l.googlevideo.com/videoplayback?expire=1600219273&ei=KRRhX_-UHObohwbfwYNA&ip=186.179.14.204&id=o-AN9-hHUpGSRvVhY-fZCBGqN9LPJv7afVLOdOE4xkxZMq&itag=251&source=youtube&requiressl=yes&vprv=1&mime=audio%2Fwebm&gir=yes&clen=4736618&dur=279.841&lmt=1582083211485240&fvip=1&keepalive=yes&c=WEB&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAICB9Uz-xIIvezN8ANow9xeAH-b8NDNy2FhCyi_GBsJrAiEAjqF3jdUBpM9UYmb6HLmwffJd-vOhravm4jtasA2NasQ=&ratebypass=yes&redirect_counter=1&rm=sn-ab5rz7e&req_id=7bc7de6d5db5a3ee&cms_redirect=yes&ipbypass=yes&mh=iF&mip=59.98.129.187&mm=31&mn=sn-cnoa-jv3l&ms=au&mt=1600197529&mv=m&mvi=1&pl=22&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAPKKslDWhKb5ogOTsKy3EoqDJEpli3aOybMaQcHgUpQYAiBVtqxcvOJv7O9DppiEjmccqbTF44PXSHpKn7MTa7QiDQ%3D%3D",
  },
];

function random_bg_color() {
  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}