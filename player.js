<<<<<<< HEAD
const songs = [

{
    title:"Dreamscape",
    artist:"Alan Walker",
    src:"assets/songs/song1.mp3",
    cover:"assets/images/song1.jpg",
    video:"assets/videos/song1.mp4"
},

{
    title:"Faded",
    artist:"Alan Walker",
    src:"assets/songs/song2.mp3",
    cover:"assets/images/song2.jpg",
    video:"assets/videos/song2.mp4"
},

{
    title:"Spectre",
    artist:"Alan Walker",
    src:"assets/songs/song3.mp3",
    cover:"assets/images/song3.jpg",
    video:"assets/videos/song3.mp4"
}

];

const audio = new Audio();

let currentSong = 0;
let isPlaying = false;

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");

const volume = document.getElementById("volume");
const muteBtn = document.getElementById("mute-btn");

const shuffleBtn = document.getElementById("shuffle");
const loopBtn = document.getElementById("loop");

const playlistItems =
document.querySelectorAll("#playlist li");

const bgVideo =
document.querySelector(".bg-video");

const urlParams =
new URLSearchParams(window.location.search);

const songIndex =
urlParams.get("song");

if(songIndex !== null){

    currentSong = parseInt(songIndex);
}

function loadSong(song){

    title.textContent = song.title;
    artist.textContent = song.artist;

    cover.src = song.cover;

    audio.src = song.src;

    bgVideo.innerHTML = `
    <source src="${song.video}" type="video/mp4">
    `;

    bgVideo.load();

    updatePlaylist();
}

loadSong(songs[currentSong]);

function playSong(){

    isPlaying = true;

    audio.play();

    playBtn.innerHTML =
    '<i class="ri-pause-fill"></i>';

}

function pauseSong(){

    isPlaying = false;

    audio.pause();

    playBtn.innerHTML =
    '<i class="ri-play-fill"></i>';

}

playBtn.addEventListener("click", () => {

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }

});

function nextSong(){

    currentSong++;

    if(currentSong > songs.length - 1){
        currentSong = 0;
    }

    loadSong(songs[currentSong]);

    playSong();
}

function prevSong(){

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(songs[currentSong]);

    playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", () => {

    if(audio.duration){

        const progressPercent =
        (audio.currentTime / audio.duration) * 100;

        progress.style.width =
        `${progressPercent}%`;

        document.querySelector(".current-time")
        .textContent =
        formatTime(audio.currentTime);

        document.querySelector(".duration")
        .textContent =
        formatTime(audio.duration);
    }

});

function formatTime(time){

    const minutes =
    Math.floor(time / 60);

    const seconds =
    Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

progressBar.addEventListener("click", (e) => {

    const rect =
    progressBar.getBoundingClientRect();

    const clickX =
    e.clientX - rect.left;

    const width =
    rect.width;

    const duration =
    audio.duration;

    audio.currentTime =
    (clickX / width) * duration;

});

audio.volume = 0.7;

volume.addEventListener("input", () => {

    audio.volume =
    volume.value / 100;

});

muteBtn.addEventListener("click", toggleMute);

function toggleMute(){

    audio.muted = !audio.muted;

    if(audio.muted){

        muteBtn.innerHTML =
        '<i class="ri-volume-mute-fill"></i>';

    }

    else{

        muteBtn.innerHTML =
        '<i class="ri-volume-up-fill"></i>';

    }

}

playlistItems.forEach((item,index) => {

    item.addEventListener("click", () => {

        currentSong = index;

        loadSong(songs[currentSong]);

        playSong();
    });

});

function updatePlaylist(){

    playlistItems.forEach((item) => {

        item.classList.remove("active-song");
    });

    playlistItems[currentSong]
    .classList.add("active-song");
}

audio.addEventListener("ended", nextSong);

shuffleBtn.addEventListener("click", () => {

    currentSong =
    Math.floor(Math.random() * songs.length);

    loadSong(songs[currentSong]);

    playSong();

});

let isLoop = false;

loopBtn.addEventListener("click", () => {

    isLoop = !isLoop;

    audio.loop = isLoop;

    if(isLoop){

        loopBtn.style.background =
        "#1db954";

    }

    else{

        loopBtn.style.background =
        "rgba(255,255,255,0.08)";
    }

});

// FAVORITES SYSTEM

let favorites = JSON.parse(
localStorage.getItem("favorites")
) || [];

const favoriteBtn =
document.getElementById("favorite-btn");

const favoritePlayerBtn =
document.getElementById("favorite-player-btn");

const favoritesGrid =
document.getElementById("favorites-grid");

// CHECK FAVORITE

function isFavorite(song){

    return favorites.some(
        fav => fav.title === song.title
    );
}

// UPDATE HEART UI

function updateFavoriteButtons(){

    const active =
    isFavorite(songs[currentSong]);

    if(favoriteBtn){

        favoriteBtn.innerHTML = active

        ? '<i class="ri-heart-fill"></i>'

        : '<i class="ri-heart-line"></i>';

        favoriteBtn.classList.toggle(
            "favorite-active",
            active
        );
    }

    if(favoritePlayerBtn){

        favoritePlayerBtn.innerHTML = active

        ? '<i class="ri-heart-fill"></i>'

        : '<i class="ri-heart-line"></i>';

        favoritePlayerBtn.classList.toggle(
            "favorite-active",
            active
        );
    }
}

// HEART POPUP

function showHeartAnimation(){

    const heart =
    document.createElement("div");

    heart.classList.add("heart-popup");

    heart.innerHTML =
    '<i class="ri-heart-fill"></i>';

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 1200);
}

// TOGGLE FAVORITE

function toggleFavorite(){

    const song =
    songs[currentSong];

    if(isFavorite(song)){

        favorites = favorites.filter(
            fav => fav.title !== song.title
        );

    } else {

        favorites.push(song);

        showHeartAnimation();
    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    updateFavoriteButtons();

    renderFavorites();
}

// BUTTON EVENTS

if(favoriteBtn){

    favoriteBtn.addEventListener(
        "click",
        toggleFavorite
    );
}

if(favoritePlayerBtn){

    favoritePlayerBtn.addEventListener(
        "click",
        toggleFavorite
    );
}

// RENDER FAVORITES

function renderFavorites(){

    if(!favoritesGrid){
        return;
    }

    favoritesGrid.innerHTML = "";

    favorites.forEach((song,index) => {

        const card =
        document.createElement("div");

        card.classList.add("album-card");

        card.innerHTML = `

            <img src="${song.cover}">

            <h4>${song.title}</h4>

            <p>${song.artist}</p>

        `;

        card.addEventListener("click", () => {

            window.location.href =
            `player.html?song=${songs.findIndex(
                s => s.title === song.title
            )}`;

        });

        favoritesGrid.appendChild(card);

    });
}

// INITIAL LOAD

renderFavorites();

=======
const songs = [

{
    title:"Dreamscape",
    artist:"Alan Walker",
    src:"assets/songs/song1.mp3",
    cover:"assets/images/song1.jpg",
    video:"assets/videos/song1.mp4"
},

{
    title:"Faded",
    artist:"Alan Walker",
    src:"assets/songs/song2.mp3",
    cover:"assets/images/song2.jpg",
    video:"assets/videos/song2.mp4"
},

{
    title:"Spectre",
    artist:"Alan Walker",
    src:"assets/songs/song3.mp3",
    cover:"assets/images/song3.jpg",
    video:"assets/videos/song3.mp4"
}

];

const audio = new Audio();

let currentSong = 0;
let isPlaying = false;

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");

const volume = document.getElementById("volume");
const muteBtn = document.getElementById("mute-btn");

const shuffleBtn = document.getElementById("shuffle");
const loopBtn = document.getElementById("loop");

const playlistItems =
document.querySelectorAll("#playlist li");

const bgVideo =
document.querySelector(".bg-video");

const urlParams =
new URLSearchParams(window.location.search);

const songIndex =
urlParams.get("song");

if(songIndex !== null){

    currentSong = parseInt(songIndex);
}

function loadSong(song){

    title.textContent = song.title;
    artist.textContent = song.artist;

    cover.src = song.cover;

    audio.src = song.src;

    bgVideo.innerHTML = `
    <source src="${song.video}" type="video/mp4">
    `;

    bgVideo.load();

    updatePlaylist();
}

loadSong(songs[currentSong]);

function playSong(){

    isPlaying = true;

    audio.play();

    playBtn.innerHTML =
    '<i class="ri-pause-fill"></i>';

}

function pauseSong(){

    isPlaying = false;

    audio.pause();

    playBtn.innerHTML =
    '<i class="ri-play-fill"></i>';

}

playBtn.addEventListener("click", () => {

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }

});

function nextSong(){

    currentSong++;

    if(currentSong > songs.length - 1){
        currentSong = 0;
    }

    loadSong(songs[currentSong]);

    playSong();
}

function prevSong(){

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(songs[currentSong]);

    playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", () => {

    if(audio.duration){

        const progressPercent =
        (audio.currentTime / audio.duration) * 100;

        progress.style.width =
        `${progressPercent}%`;

        document.querySelector(".current-time")
        .textContent =
        formatTime(audio.currentTime);

        document.querySelector(".duration")
        .textContent =
        formatTime(audio.duration);
    }

});

function formatTime(time){

    const minutes =
    Math.floor(time / 60);

    const seconds =
    Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

progressBar.addEventListener("click", (e) => {

    const rect =
    progressBar.getBoundingClientRect();

    const clickX =
    e.clientX - rect.left;

    const width =
    rect.width;

    const duration =
    audio.duration;

    audio.currentTime =
    (clickX / width) * duration;

});

audio.volume = 0.7;

volume.addEventListener("input", () => {

    audio.volume =
    volume.value / 100;

});

muteBtn.addEventListener("click", toggleMute);

function toggleMute(){

    audio.muted = !audio.muted;

    if(audio.muted){

        muteBtn.innerHTML =
        '<i class="ri-volume-mute-fill"></i>';

    }

    else{

        muteBtn.innerHTML =
        '<i class="ri-volume-up-fill"></i>';

    }

}

playlistItems.forEach((item,index) => {

    item.addEventListener("click", () => {

        currentSong = index;

        loadSong(songs[currentSong]);

        playSong();
    });

});

function updatePlaylist(){

    playlistItems.forEach((item) => {

        item.classList.remove("active-song");
    });

    playlistItems[currentSong]
    .classList.add("active-song");
}

audio.addEventListener("ended", nextSong);

shuffleBtn.addEventListener("click", () => {

    currentSong =
    Math.floor(Math.random() * songs.length);

    loadSong(songs[currentSong]);

    playSong();

});

let isLoop = false;

loopBtn.addEventListener("click", () => {

    isLoop = !isLoop;

    audio.loop = isLoop;

    if(isLoop){

        loopBtn.style.background =
        "#1db954";

    }

    else{

        loopBtn.style.background =
        "rgba(255,255,255,0.08)";
    }

});

// FAVORITES SYSTEM

let favorites = JSON.parse(
localStorage.getItem("favorites")
) || [];

const favoriteBtn =
document.getElementById("favorite-btn");

const favoritePlayerBtn =
document.getElementById("favorite-player-btn");

const favoritesGrid =
document.getElementById("favorites-grid");

// CHECK FAVORITE

function isFavorite(song){

    return favorites.some(
        fav => fav.title === song.title
    );
}

// UPDATE HEART UI

function updateFavoriteButtons(){

    const active =
    isFavorite(songs[currentSong]);

    if(favoriteBtn){

        favoriteBtn.innerHTML = active

        ? '<i class="ri-heart-fill"></i>'

        : '<i class="ri-heart-line"></i>';

        favoriteBtn.classList.toggle(
            "favorite-active",
            active
        );
    }

    if(favoritePlayerBtn){

        favoritePlayerBtn.innerHTML = active

        ? '<i class="ri-heart-fill"></i>'

        : '<i class="ri-heart-line"></i>';

        favoritePlayerBtn.classList.toggle(
            "favorite-active",
            active
        );
    }
}

// HEART POPUP

function showHeartAnimation(){

    const heart =
    document.createElement("div");

    heart.classList.add("heart-popup");

    heart.innerHTML =
    '<i class="ri-heart-fill"></i>';

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 1200);
}

// TOGGLE FAVORITE

function toggleFavorite(){

    const song =
    songs[currentSong];

    if(isFavorite(song)){

        favorites = favorites.filter(
            fav => fav.title !== song.title
        );

    } else {

        favorites.push(song);

        showHeartAnimation();
    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    updateFavoriteButtons();

    renderFavorites();
}

// BUTTON EVENTS

if(favoriteBtn){

    favoriteBtn.addEventListener(
        "click",
        toggleFavorite
    );
}

if(favoritePlayerBtn){

    favoritePlayerBtn.addEventListener(
        "click",
        toggleFavorite
    );
}

// RENDER FAVORITES

function renderFavorites(){

    if(!favoritesGrid){
        return;
    }

    favoritesGrid.innerHTML = "";

    favorites.forEach((song,index) => {

        const card =
        document.createElement("div");

        card.classList.add("album-card");

        card.innerHTML = `

            <img src="${song.cover}">

            <h4>${song.title}</h4>

            <p>${song.artist}</p>

        `;

        card.addEventListener("click", () => {

            window.location.href =
            `player.html?song=${songs.findIndex(
                s => s.title === song.title
            )}`;

        });

        favoritesGrid.appendChild(card);

    });
}

// INITIAL LOAD

renderFavorites();

>>>>>>> 70451a8 (added new file)
updateFavoriteButtons();