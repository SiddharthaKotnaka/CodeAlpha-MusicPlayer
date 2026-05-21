const volume =
    document.getElementById("volume");

// Song Data

const songs = [
    {
        title: "Dreamscape",
        artist: "Alan Walker",
        src: "assets/songs/song1.mp3",
        cover: "assets/images/song1.jpg",
        video: "assets/videos/song1.mp4"
    },

    {
        title: "Faded",
        artist: "Alan Walker",
        src: "assets/songs/song2.mp3",
        cover: "assets/images/song2.jpg",
        video: "assets/videos/song2.mp4"
    },

    {
        title: "Spectre",
        artist: "Alan Walker",
        src: "assets/songs/song3.mp3",
        cover: "assets/images/song3.jpg",
        video: "assets/videos/song3.mp4"
    }
];

// Select Elements

const title = document.getElementById("title");
const artist = document.getElementById("artist");

const cover = document.getElementById("cover");

const bgVideo =
    document.querySelector(".bg-video");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn =
    document.getElementById("shuffle");

const loopBtn =
    document.getElementById("loop");

const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");

// Audio Object

const audio = new Audio();

let currentSong = 0;
let isPlaying = false;

let isShuffle = false;
let isLoop = false;

// Load Song

function loadSong(song){

    title.textContent = song.title;
    artist.textContent = song.artist;

    cover.style.opacity = "0";

    setTimeout(() => {

        cover.src = song.cover;

        cover.style.opacity = "1";

    }, 200);

    cover.src = song.cover;

    bgVideo.innerHTML = `
        <source src="${song.video}" type="video/mp4">
    `;

    bgVideo.load();

    bgVideo.play();

    audio.src = song.src;
}

loadSong(songs[currentSong]);

// Play Song

function playSong(){

    isPlaying = true;

    audio.play();

    playBtn.innerHTML =
        '<i class="ri-pause-fill"></i>';

    document.querySelector(".music-player")
        .classList.add("playing");
}

// Pause Song

function pauseSong(){

    isPlaying = false;

    audio.pause();

    playBtn.innerHTML =
        '<i class="ri-play-fill"></i>';

    document.querySelector(".music-player")
        .classList.remove("playing");
}

// Play Button Event

playBtn.addEventListener("click", () => {

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }

});

// Next Song

function nextSong(){

    if(isShuffle){

        currentSong =
            Math.floor(Math.random() * songs.length);

    }
    else{

        currentSong++;

    }

    if(currentSong > songs.length - 1){
        currentSong = 0;
    }

    loadSong(songs[currentSong]);

    playSong();
}

// Previous Song

function prevSong(){

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(songs[currentSong]);

    playSong();
}

// Shuffle Toggle

shuffleBtn.addEventListener("click", () => {

    isShuffle = !isShuffle;

    shuffleBtn.style.color =
        isShuffle ? "#1db954" : "white";

});

// Loop Toggle

loopBtn.addEventListener("click", () => {

    isLoop = !isLoop;

    audio.loop = isLoop;

    loopBtn.style.color =
        isLoop ? "#1db954" : "white";

});

// Button Events

nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", prevSong);

// Progress Bar Update

audio.addEventListener("timeupdate", () => {

    const { duration, currentTime } = audio;

    // Progress Percentage

    const progressPercent =
        (currentTime / duration) * 100;

    progress.style.width =
        `${progressPercent}%`;

    // Update Timing

    const currentMinutes =
        Math.floor(currentTime / 60);

    const currentSeconds =
        Math.floor(currentTime % 60);

    const durationMinutes =
        Math.floor(duration / 60);

    const durationSeconds =
        Math.floor(duration % 60);

    document.querySelector(".current-time")
        .textContent =
        `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    document.querySelector(".duration")
        .textContent =
        `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;

});

// Click Progress Bar

progressBar.addEventListener("click", (e) => {

    const width = progressBar.clientWidth;

    const clickX = e.offsetX;

    const duration = audio.duration;

    audio.currentTime =
        (clickX / width) * duration;
});

// Auto Next Song

audio.addEventListener("ended", nextSong);

// Playlist Click Functionality

const playlist =
    document.querySelectorAll("#playlist li");

playlist.forEach((item, index) => {

    item.addEventListener("click", () => {

        currentSong = index;

        loadSong(songs[currentSong]);

        playSong();

        updatePlaylist();

    });

});

// Active Playlist Highlight

function updatePlaylist(){

    playlist.forEach((item) => {
        item.classList.remove("active-song");
    });

    playlist[currentSong]
        .classList.add("active-song");
}

updatePlaylist();

// Volume Control

audio.volume = 0.7;

volume.addEventListener("input", () => {

    audio.volume =
        volume.value / 100;

});
