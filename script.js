// all music information

let music = [
  { src: "music/2002.mp3", title: "2002", singer: "Anne-Marie Nicholson" },
  {
    src: "music/10000hours.mp3",
    title: "10,000 Hours",
    singer: "Justin Bieber, Dan + Shay",
  },
  { src: "music/alliwant.mp3", title: "All I Want", singer: "Olivia Rodrigo" },
  { src: "music/asitwas.mp3", title: "As It Was", singer: "Harry Styles" },
  {
    src: "music/athousandyears.mp3",
    title: "A Thousand Years",
    singer: "Chrisitina Perri",
  },
  { src: "music/bealright.mp3", title: "Be Alright", singer: "Dean Lewis" },
  {
    src: "music/calloutmyname.flac",
    title: "Call Out My Name",
    singer: "The Weeknd",
  },
  {
    src: "music/countingstars.mp3",
    title: "Counting Stars",
    singer: "OneRepublic",
  },
  {
    src: "music/dancingwithurghost.mp3",
    title: "Dancing With Your Ghost",
    singer: "Sasha Alex Sloan",
  },
  { src: "music/dandelions.flac", title: "Dandelions", singer: "Ruth B" },
  {
    src: "music/dontblameme.mp3",
    title: "Don't Blame Me",
    singer: "Taylor Swift",
  },
  { src: "music/easyonme.mp3", title: "Easy On Me", singer: "Adele" },
  { src: "music/firatclass.mp3", title: "First Class", singer: "Jack Harlow" },
  { src: "music/glimpseofus.mp3", title: "Glimpse Of Us", singer: "Joji" },
  { src: "music/impossible.mp3", title: "Impossible", singer: "James Arther" },
  {
    src: "music/inthestars.mp3",
    title: "In The Stars",
    singer: "Benson Boone",
  },
  { src: "music/itsyou.mp3", title: "It's You", singer: "Ali Gate" },
  {
    src: "music/letmedownslowly.mp3",
    title: "Let Me Down Slowly",
    singer: "Alec Benjamin",
  },
  {
    src: "music/loveurself.mp3",
    title: "Love Yourself",
    singer: "Justin Bieber",
  },
  {
    src: "music/nightchanges.mp3",
    title: "Night Changes",
    singer: "One Direction",
  },
  { src: "music/older.mp3", title: "Older", singer: "Sasha Alex Sloan" },
  {
    src: "music/onelasttime.mp3",
    title: "One Last Time",
    singer: "Ariana Grande",
  },
  { src: "music/onmyway.mp3", title: "On My Way", singer: "Alan Walker" },
  { src: "music/photograph.mp3", title: "Photograph", singer: "Ed Sheeran" },
  {
    src: "music/runningupthathill.mp3",
    title: "Running Up That Hill",
    singer: "Kate Bush",
  },
  { src: "music/sendmylove.mp3", title: "Send My Love", singer: "Adele" },
  { src: "music/shivers.mp3", title: "Shivers", singer: "ed Sheeran" },
  { src: "music/snap.mp3", title: "Snap", singer: "Rosa Linn" },
  {
    src: "music/someoneyouloved.mp3",
    title: "Someone You Loved",
    singer: "Lewis Capaldi",
  },
  { src: "music/stitches.mp3", title: "Stitches", singer: "Shawn Mendes" },
  {
    src: "music/treatyoubetter.mp3",
    title: "Treat You Better",
    singer: "Shawn Mendes",
  },
  { src: "music/umbrella.mp3", title: "Umbrella", singer: "Rihanna" },
  { src: "music/withoutme.mp3", title: "Without Me", singer: "Halsey" },
  {
    src: "music/youbrokemefirst.mp3",
    title: "You Broke Me First",
    singer: "Tate McRae",
  },
  {
    src: "music/yourarethereason.mp3",
    title: "You Are The Reason",
    singer: "Calum Scott",
  },
];

// Creating a list of songs and adding an event listener to each song.

let lstOfSongs = document.getElementById("listOfSongs");
const audio = document.getElementById("audio");

for (let i = 0; i < music.length; i++) {
  let newEL = document.createElement("li");
  newEL.innerHTML = `<i class="fa-solid fa-guitar"></i> ${music[i].title}    - ${music[i].singer}`;
  lstOfSongs.append(newEL);

  newEL.addEventListener("click", () => {
    let trackId = music[i].src;
    audio.src = trackId;
    audio.play();

    isPlaying = true; // check for controls
    playAndPuse();

    songsNum = i; // update as i for controls
  });
}

/////////////////////////////////////////////////////

// get each songs duration and update time  - display them

const time = document.getElementById("time");

// both are only seconds (124) and not ready to display
let duration;
let currentTime;

// both are min/sec (00:00) and ready to display

let durationTime;
let updateTime;

audio.addEventListener("loadeddata", () => {
  duration = Math.floor(audio.duration);
  durationTime = displayTime(duration);

  audio.addEventListener("timeupdate", () => {
    currentTime = Math.floor(audio.currentTime);
    updateTime = displayTime(currentTime);

    // display -    both at the same time - after it loadeddata
    time.textContent = ` ${updateTime} / ${durationTime}`;

    // run progress in every fire of timeupdate
    updateProgress();
  });
});

// make ready to disply
let displayTime = (time) => {
  let minutes = Math.floor(time / 60);
  let second = time % 60;
  let displayMin = minutes < 10 ? `0${minutes}` : minutes;
  let displaySec = second < 10 ? `0${second}` : second;
  return `${displayMin}:${displaySec} `;
};

//  update progress bar

const progress = document.getElementsByClassName("progress")[0];

function updateProgress() {
  let widthOfProgress = (100 / duration) * currentTime;
  progress.style.width = `${widthOfProgress}%`;
}

///////////////////////////////////////////////////////

// controls

const play = document.getElementById("play");
const pause = document.getElementById("pause");
const previous = document.getElementById("previous");
const next = document.getElementById("next");

let songsNum = 0;
let isPlaying = false;

//     play

play.addEventListener("click", () => {
  let checkTime = Math.floor(audio.currentTime);
  if (checkTime === 0) {
    playSongs();
  } else {
    audio.play();
  }

  isPlaying = true;
  playAndPuse();
});

//    pause

pause.addEventListener("click", () => {
  audio.pause();

  isPlaying = false;
  playAndPuse();
});

//   previous

previous.addEventListener("click", () => {
  if (songsNum === 0) {
    return;
  }
  songsNum -= 1;
  playSongs();

  isPlaying = true;
  playAndPuse();
});

//   next

next.addEventListener("click", () => {
  if (songsNum === music.length - 1) {
    return;
  }
  songsNum += 1;
  playSongs();

  isPlaying = true;
  playAndPuse();
});

// function that change play and pause btn
function playAndPuse() {
  if (isPlaying) {
    pause.style.display = "inline";
    play.style.display = "none";
  } else {
    play.style.display = "inline";
    pause.style.display = "none";
  }
}

// plays song
function playSongs() {
  let songsSrc = music[songsNum].src;
  audio.src = songsSrc;
  audio.play();
}
