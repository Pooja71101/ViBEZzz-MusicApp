console.log("Welcome to ViBEZzz");
// initialize the variables;
let songIndex=0;
let audioElement= new Audio("songs/1.mp3");
let masterPlay= document.getElementById("masterplay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.querySelectorAll("songItem"));

let songs=[
    (songName="Let Me Love You" , filePath="songs/1.mp3", coverPath="images/cover1.jfif"),
    (songName="Faded" , filePath="songs/2.mp3", coverPath="images/faded.jfif"),
    (songName="Friends" , filePath="songs/3.mp3", coverPath="images/friends.jfif"),
    (songName="Love Me Like You Do" , filePath="songs/4.mp3", coverPath="images/love-me-like.jfif"),
    (songName="Love Your Voice" , filePath="songs/5.mp3", coverPath="images/love-your-voice.jfif"),
    (songName="Peaches" , filePath="songs/6.mp3", coverPath="images/peaches.jfif"),
    (songName="Rockstar" , filePath="songs/7.mp3", coverPath="images/rockstar.jfif"),
    (songName="Shape Of You" , filePath="songs/8.mp3", coverPath="images/shape-of-u.jfif"),
]

songItems.forEach((element,i) => {
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});


// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
      if(audioElement.paused || audioElement.currentTime<=0)
      {
         audioElement.play();
         masterPlay.classList.remove('fa-play-circle');
         masterPlay.classList.add('fa-pause-circle');
         gif.style.opacity=1;
      }
      else{
         audioElement.pause();
         masterPlay.classList.remove('fa-pause-circle');
         masterPlay.classList.add('fa-play-circle');
         gif.style.opacity=0;
      }
})
// Listen to events
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    // update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName("SongItemPlay")).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName("SongItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target);
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7)
    {
        songIndex=0;
    }
    else{
        songIndex+=1;
    }

    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0)
    {
        songIndex=0;
    }
    else{
        songIndex-=1;
    }

    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

