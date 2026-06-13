<<<<<<< HEAD
const volume =
    document.getElementById("volume");

const muteBtn =
    document.getElementById("mute-btn");

// Song Data

const songs = [
    {
        title: "Dreamscape",
        artist: "Alan Walker",

        description:
        "A cinematic electronic journey through glowing desert vibes.",

        src: "assets/songs/song1.mp3",
        cover: "assets/images/song1.jpg",
        video: "assets/videos/song1.mp4"
    },

    {
        title: "Faded",
        artist: "Alan Walker",

        description:
        "Legendary emotional EDM track with nostalgic energy.",
    
        src: "assets/songs/song2.mp3",
        cover: "assets/images/song2.jpg",
        video: "assets/videos/song2.mp4"
    },

    {
        title: "Spectre",
        artist: "Alan Walker",

        description:
        "Dark futuristic electronic atmosphere with powerful beats.",

        src: "assets/songs/song3.mp3",
        cover: "assets/images/song3.jpg",
        video: "assets/videos/song3.mp4"
    }
];

// Select Elements

const title = document.getElementById("title");
const artist = document.getElementById("artist");

const cover = document.getElementById("cover");

const miniTitle =
    document.getElementById("mini-title");

const miniArtist =
    document.getElementById("mini-artist");

const miniCover =
    document.getElementById("mini-cover");

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

const urlParams =
    new URLSearchParams(window.location.search);

const songIndex =
    urlParams.get("song");

if(songIndex !== null){

    currentSong = parseInt(songIndex);

}

let isPlaying = false;

let isShuffle = false;
let isLoop = false;

// Load Song

function loadSong(song){

    // PLAYER PAGE ELEMENTS

    if(title){
        title.textContent = song.title;
    }

    if(artist){
        artist.textContent = song.artist;
    }

    // HERO SECTION UPDATE

    document.getElementById("hero-title")
    .textContent = song.title;

    document.getElementById("hero-artist")
    .textContent = song.artist;

    document.getElementById("hero-description")
    .textContent = song.description;

    document.getElementById("hero-image")
    .src = song.cover;

    if(cover){

        cover.style.opacity = "0";

        setTimeout(() => {

            cover.src = song.cover;

            cover.style.opacity = "1";

        }, 200);

        cover.src = song.cover;
    }

    // MINI PLAYER

    const miniTitle =
        document.getElementById("mini-title");

    const miniArtist =
        document.getElementById("mini-artist");

    const miniCover =
        document.getElementById("mini-cover");

    if(miniTitle){
        miniTitle.textContent = song.title;
    }

    if(miniArtist){
        miniArtist.textContent = song.artist;
    }

    if(miniCover){
        miniCover.src = song.cover;
    }

    // BACKGROUND VIDEO

    if(bgVideo){

        bgVideo.innerHTML = `
            <source src="${song.video}" type="video/mp4">
        `;

        bgVideo.load();

        bgVideo.play();
    }

    audio.src = song.src;
}

loadSong(songs[currentSong]);

// Play Song

function playSong(){

    isPlaying = true;

    updateMiniPlayerIcon();

    audio.play();

    playBtn.innerHTML =
        '<i class="ri-pause-fill"></i>';

    document.querySelector(".music-player")
        .classList.add("playing");
}

// Pause Song

function pauseSong(){

    isPlaying = false;

    updateMiniPlayerIcon();

    audio.pause();

    playBtn.innerHTML =
        '<i class="ri-play-fill"></i>';

    document.querySelector(".music-player")
        .classList.remove("playing");
}

// Play Button Event

if(playBtn){

    playBtn.addEventListener("click", () => {

        if(isPlaying){
            pauseSong();
        }
        else{
            playSong();
        }

    });

}

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

if(shuffleBtn){

    shuffleBtn.addEventListener("click", () => {

        isShuffle = !isShuffle;

        shuffleBtn.style.color =
            isShuffle ? "#1db954" : "white";

    });

}

// Loop Toggle

if(loopBtn){

    loopBtn.addEventListener("click", () => {

        isLoop = !isLoop;

        audio.loop = isLoop;

        loopBtn.style.color =
            isLoop ? "#1db954" : "white";

    });

}

// Button Events

if(nextBtn){
    nextBtn.addEventListener("click", nextSong);
}

if(prevBtn){
    prevBtn.addEventListener("click", prevSong);
}

// Progress Bar Update

audio.addEventListener("timeupdate", () => {

    const currentTimeEl =
        document.querySelector(".current-time");

    const durationEl =
        document.querySelector(".duration");

    if(!currentTimeEl || !durationEl){
        return;
    }

    const { duration, currentTime } = audio;

    const progressPercent =
        (currentTime / duration) * 100;

    progress.style.width =
        `${progressPercent}%`;

    const currentMinutes =
        Math.floor(currentTime / 60);

    const currentSeconds =
        Math.floor(currentTime % 60);

    const durationMinutes =
        Math.floor(duration / 60);

    const durationSeconds =
        Math.floor(duration % 60);

    currentTimeEl.textContent =
        `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    durationEl.textContent =
        `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;

});

// Click Progress Bar

if(progressBar){

    progressBar.addEventListener("click", (e) => {

        const width = progressBar.clientWidth;

        const clickX = e.offsetX;

        const duration = audio.duration;

        audio.currentTime =
            (clickX / width) * duration;
    });
}

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

    if(playlist.length === 0){
        return;
    }

    playlist.forEach((item) => {

        item.classList.remove("active-song");

    });

    if(playlist[currentSong]){

        playlist[currentSong]
            .classList.add("active-song");

    }

}

updatePlaylist();

// Volume Control

audio.volume = 0.7;

if(volume){

    volume.addEventListener("input", () => {

        audio.volume =
            volume.value / 100;

    });

}

const miniPlayer =
    document.getElementById("mini-player");

const miniPlayBtn =
    document.getElementById("mini-play");

if(miniPlayer){

    miniPlayer.addEventListener("click", () => {

        const player =
            document.querySelector(".music-player");

        if(player){

            player.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.pointerEvents = "none";

        setTimeout(() => {

            loader.style.display = "none";

        }, 1000);

    }, 2000);

});

// PREMIUM DYNAMIC GREETING

const greetingText =
document.getElementById("greeting-text");

const currentHour =
new Date().getHours();

const currentMinutes =
new Date().getMinutes();

const formattedTime =
`${currentHour % 12 || 12}:${currentMinutes
    .toString()
    .padStart(2, "0")}
${currentHour >= 12 ? " PM" : " AM"}`;

let greeting = "";

if(currentHour >= 5 && currentHour < 10){

    greeting =
    `Fresh Morning • ${formattedTime}`;

}

else if(currentHour >= 10 && currentHour < 13){

    greeting =
    `Sunny Day Beats • ${formattedTime}`;

}

else if(currentHour >= 13 && currentHour < 17){

    greeting =
    `Afternoon Chill • ${formattedTime}`;

}

else if(currentHour >= 17 && currentHour < 20){

    greeting =
    `Golden Hour Vibes • ${formattedTime}`;

}

else if(currentHour >= 20 && currentHour < 24){

    greeting =
    `Night Vibes • ${formattedTime}`;

}

else{

    greeting =
    `Late Night Sessions • ${formattedTime}`;

}

greetingText.textContent = greeting;
// MINI PLAYER BUTTON

if(miniPlayBtn){

    miniPlayBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        if(isPlaying){

            pauseSong();

        }
        else{

            playSong();

        }

    });

}

// UPDATE MINI PLAYER ICON

function updateMiniPlayerIcon(){

    if(!miniPlayBtn){
        return;
    }

    miniPlayBtn.innerHTML = isPlaying

    ? '<i class="ri-pause-fill"></i>'

    : '<i class="ri-play-fill"></i>';

}

// MUTE BUTTON

if(muteBtn){

    muteBtn.addEventListener("click", () => {

        audio.muted = !audio.muted;

        muteBtn.innerHTML = audio.muted

        ? '<i class="ri-volume-mute-fill"></i>'

        : '<i class="ri-volume-up-fill"></i>';

    });

}

// MINI PLAYER CONTROLS

const miniPrev =
document.getElementById("mini-prev");

const miniNext =
document.getElementById("mini-next");

const miniMute =
document.getElementById("mini-mute");

const miniVolumeSlider =
document.getElementById("mini-volume-slider");

// PREV

if(miniPrev){

    miniPrev.addEventListener("click", (e) => {

        e.stopPropagation();

        prevSong();

    });

}

// NEXT

if(miniNext){

    miniNext.addEventListener("click", (e) => {

        e.stopPropagation();

        nextSong();

    });

}

// VOLUME SLIDER

if(miniVolumeSlider){

    miniVolumeSlider.addEventListener("input", () => {

        audio.volume =
        miniVolumeSlider.value / 100;

    });

}

// MUTE

if(miniMute){

    miniMute.addEventListener("click", (e) => {

        e.stopPropagation();

        audio.muted = !audio.muted;

        miniMute.innerHTML = audio.muted

        ? '<i class="ri-volume-mute-fill"></i>'

        : '<i class="ri-volume-up-fill"></i>';

    });

}

const searchInput =
document.getElementById("search-input");

const searchResults =
document.getElementById("search-results");

if(searchInput){

    searchInput.addEventListener("input", () => {

        const value =
        searchInput.value.toLowerCase();

        searchResults.innerHTML = "";

        if(value === ""){

            searchResults.style.display = "none";

            return;
        }

        const filteredSongs = songs.filter(song =>

            song.title.toLowerCase().includes(value)

        );

        filteredSongs.forEach(song => {

            const div =
            document.createElement("div");

            div.classList.add("search-item");

            div.textContent =
            song.title;

            div.addEventListener("click", () => {

                const songIndex =
                songs.indexOf(song);

                window.location.href =
                `player.html?song=${songIndex}`;

            });

            searchResults.appendChild(div);

        });

        searchResults.style.display =
        filteredSongs.length > 0

        ? "block"

        : "none";

    });

}

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
const volume =
    document.getElementById("volume");

const muteBtn =
    document.getElementById("mute-btn");

// Song Data

const songs = [
    {
        title: "Dreamscape",
        artist: "Alan Walker",

        description:
        "A cinematic electronic journey through glowing desert vibes.",

        src: "assets/songs/song1.mp3",
        cover: "assets/images/song1.jpg",
        video: "assets/videos/song1.mp4"
    },

    {
        title: "Faded",
        artist: "Alan Walker",

        description:
        "Legendary emotional EDM track with nostalgic energy.",
    
        src: "assets/songs/song2.mp3",
        cover: "assets/images/song2.jpg",
        video: "assets/videos/song2.mp4"
    },

    {
        title: "Spectre",
        artist: "Alan Walker",

        description:
        "Dark futuristic electronic atmosphere with powerful beats.",

        src: "assets/songs/song3.mp3",
        cover: "assets/images/song3.jpg",
        video: "assets/videos/song3.mp4"
    }
];

// Select Elements

const title = document.getElementById("title");
const artist = document.getElementById("artist");

const cover = document.getElementById("cover");

const miniTitle =
    document.getElementById("mini-title");

const miniArtist =
    document.getElementById("mini-artist");

const miniCover =
    document.getElementById("mini-cover");

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

const urlParams =
    new URLSearchParams(window.location.search);

const songIndex =
    urlParams.get("song");

if(songIndex !== null){

    currentSong = parseInt(songIndex);

}

let isPlaying = false;

let isShuffle = false;
let isLoop = false;

// Load Song

function loadSong(song){

    // PLAYER PAGE ELEMENTS

    if(title){
        title.textContent = song.title;
    }

    if(artist){
        artist.textContent = song.artist;
    }

    // HERO SECTION UPDATE

    document.getElementById("hero-title")
    .textContent = song.title;

    document.getElementById("hero-artist")
    .textContent = song.artist;

    document.getElementById("hero-description")
    .textContent = song.description;

    document.getElementById("hero-image")
    .src = song.cover;

    if(cover){

        cover.style.opacity = "0";

        setTimeout(() => {

            cover.src = song.cover;

            cover.style.opacity = "1";

        }, 200);

        cover.src = song.cover;
    }

    // MINI PLAYER

    const miniTitle =
        document.getElementById("mini-title");

    const miniArtist =
        document.getElementById("mini-artist");

    const miniCover =
        document.getElementById("mini-cover");

    if(miniTitle){
        miniTitle.textContent = song.title;
    }

    if(miniArtist){
        miniArtist.textContent = song.artist;
    }

    if(miniCover){
        miniCover.src = song.cover;
    }

    // BACKGROUND VIDEO

    if(bgVideo){

        bgVideo.innerHTML = `
            <source src="${song.video}" type="video/mp4">
        `;

        bgVideo.load();

        bgVideo.play();
    }

    audio.src = song.src;
}

loadSong(songs[currentSong]);

// Play Song

function playSong(){

    isPlaying = true;

    updateMiniPlayerIcon();

    audio.play();

    playBtn.innerHTML =
        '<i class="ri-pause-fill"></i>';

    document.querySelector(".music-player")
        .classList.add("playing");
}

// Pause Song

function pauseSong(){

    isPlaying = false;

    updateMiniPlayerIcon();

    audio.pause();

    playBtn.innerHTML =
        '<i class="ri-play-fill"></i>';

    document.querySelector(".music-player")
        .classList.remove("playing");
}

// Play Button Event

if(playBtn){

    playBtn.addEventListener("click", () => {

        if(isPlaying){
            pauseSong();
        }
        else{
            playSong();
        }

    });

}

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

if(shuffleBtn){

    shuffleBtn.addEventListener("click", () => {

        isShuffle = !isShuffle;

        shuffleBtn.style.color =
            isShuffle ? "#1db954" : "white";

    });

}

// Loop Toggle

if(loopBtn){

    loopBtn.addEventListener("click", () => {

        isLoop = !isLoop;

        audio.loop = isLoop;

        loopBtn.style.color =
            isLoop ? "#1db954" : "white";

    });

}

// Button Events

if(nextBtn){
    nextBtn.addEventListener("click", nextSong);
}

if(prevBtn){
    prevBtn.addEventListener("click", prevSong);
}

// Progress Bar Update

audio.addEventListener("timeupdate", () => {

    const currentTimeEl =
        document.querySelector(".current-time");

    const durationEl =
        document.querySelector(".duration");

    if(!currentTimeEl || !durationEl){
        return;
    }

    const { duration, currentTime } = audio;

    const progressPercent =
        (currentTime / duration) * 100;

    progress.style.width =
        `${progressPercent}%`;

    const currentMinutes =
        Math.floor(currentTime / 60);

    const currentSeconds =
        Math.floor(currentTime % 60);

    const durationMinutes =
        Math.floor(duration / 60);

    const durationSeconds =
        Math.floor(duration % 60);

    currentTimeEl.textContent =
        `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    durationEl.textContent =
        `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;

});

// Click Progress Bar

if(progressBar){

    progressBar.addEventListener("click", (e) => {

        const width = progressBar.clientWidth;

        const clickX = e.offsetX;

        const duration = audio.duration;

        audio.currentTime =
            (clickX / width) * duration;
    });
}

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

    if(playlist.length === 0){
        return;
    }

    playlist.forEach((item) => {

        item.classList.remove("active-song");

    });

    if(playlist[currentSong]){

        playlist[currentSong]
            .classList.add("active-song");

    }

}

updatePlaylist();

// Volume Control

audio.volume = 0.7;

if(volume){

    volume.addEventListener("input", () => {

        audio.volume =
            volume.value / 100;

    });

}

const miniPlayer =
    document.getElementById("mini-player");

const miniPlayBtn =
    document.getElementById("mini-play");

if(miniPlayer){

    miniPlayer.addEventListener("click", () => {

        const player =
            document.querySelector(".music-player");

        if(player){

            player.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.pointerEvents = "none";

        setTimeout(() => {

            loader.style.display = "none";

        }, 1000);

    }, 2000);

});

// PREMIUM DYNAMIC GREETING

const greetingText =
document.getElementById("greeting-text");

const currentHour =
new Date().getHours();

const currentMinutes =
new Date().getMinutes();

const formattedTime =
`${currentHour % 12 || 12}:${currentMinutes
    .toString()
    .padStart(2, "0")}
${currentHour >= 12 ? " PM" : " AM"}`;

let greeting = "";

if(currentHour >= 5 && currentHour < 10){

    greeting =
    `Fresh Morning • ${formattedTime}`;

}

else if(currentHour >= 10 && currentHour < 13){

    greeting =
    `Sunny Day Beats • ${formattedTime}`;

}

else if(currentHour >= 13 && currentHour < 17){

    greeting =
    `Afternoon Chill • ${formattedTime}`;

}

else if(currentHour >= 17 && currentHour < 20){

    greeting =
    `Golden Hour Vibes • ${formattedTime}`;

}

else if(currentHour >= 20 && currentHour < 24){

    greeting =
    `Night Vibes • ${formattedTime}`;

}

else{

    greeting =
    `Late Night Sessions • ${formattedTime}`;

}

greetingText.textContent = greeting;
// MINI PLAYER BUTTON

if(miniPlayBtn){

    miniPlayBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        if(isPlaying){

            pauseSong();

        }
        else{

            playSong();

        }

    });

}

// UPDATE MINI PLAYER ICON

function updateMiniPlayerIcon(){

    if(!miniPlayBtn){
        return;
    }

    miniPlayBtn.innerHTML = isPlaying

    ? '<i class="ri-pause-fill"></i>'

    : '<i class="ri-play-fill"></i>';

}

// MUTE BUTTON

if(muteBtn){

    muteBtn.addEventListener("click", () => {

        audio.muted = !audio.muted;

        muteBtn.innerHTML = audio.muted

        ? '<i class="ri-volume-mute-fill"></i>'

        : '<i class="ri-volume-up-fill"></i>';

    });

}

// MINI PLAYER CONTROLS

const miniPrev =
document.getElementById("mini-prev");

const miniNext =
document.getElementById("mini-next");

const miniMute =
document.getElementById("mini-mute");

const miniVolumeSlider =
document.getElementById("mini-volume-slider");

// PREV

if(miniPrev){

    miniPrev.addEventListener("click", (e) => {

        e.stopPropagation();

        prevSong();

    });

}

// NEXT

if(miniNext){

    miniNext.addEventListener("click", (e) => {

        e.stopPropagation();

        nextSong();

    });

}

// VOLUME SLIDER

if(miniVolumeSlider){

    miniVolumeSlider.addEventListener("input", () => {

        audio.volume =
        miniVolumeSlider.value / 100;

    });

}

// MUTE

if(miniMute){

    miniMute.addEventListener("click", (e) => {

        e.stopPropagation();

        audio.muted = !audio.muted;

        miniMute.innerHTML = audio.muted

        ? '<i class="ri-volume-mute-fill"></i>'

        : '<i class="ri-volume-up-fill"></i>';

    });

}

const searchInput =
document.getElementById("search-input");

const searchResults =
document.getElementById("search-results");

if(searchInput){

    searchInput.addEventListener("input", () => {

        const value =
        searchInput.value.toLowerCase();

        searchResults.innerHTML = "";

        if(value === ""){

            searchResults.style.display = "none";

            return;
        }

        const filteredSongs = songs.filter(song =>

            song.title.toLowerCase().includes(value)

        );

        filteredSongs.forEach(song => {

            const div =
            document.createElement("div");

            div.classList.add("search-item");

            div.textContent =
            song.title;

            div.addEventListener("click", () => {

                const songIndex =
                songs.indexOf(song);

                window.location.href =
                `player.html?song=${songIndex}`;

            });

            searchResults.appendChild(div);

        });

        searchResults.style.display =
        filteredSongs.length > 0

        ? "block"

        : "none";

    });

}

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