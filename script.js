const container = document.querySelector('.container')
const nowPlaying = document.querySelector('.now-playing')
const trackArt = document.querySelector('.track-art')
const trackName = document.querySelector('.track-name')
const trackArtist = document.querySelector('.track-artist')
const prevButton = document.querySelector('.prev-track')
const playButton = document.querySelector('.play-track')
const nextButton = document.querySelector('.next-track')
const seekSlider = document.querySelector('.seek-slider')
const volumeSlider = document.querySelector('.volume-slider')
const currentTime = document.querySelector('.current-time')
const totalDuration = document.querySelector('.total-duration')
const currTrack = document.querySelector('#audio')

let trackIndex = 0
let isPlaying = false
let updateTimer

const allTracks = [
  {
    name: 'Hey',
    artist: 'None',
    image: 'hey.jpg',
    path: 'hey.mp3'
  },
  {
    name: 'Summer',
    artist: 'None',
    image: 'summer.jpg',
    path: 'summer.mp3'
  },
  {
    name: 'Ukulele',
    artist: 'None',
    image: 'ukulele.jpg',
    path: 'ukulele.mp3'
  },
  {
    name: 'First Times',
    artist: 'Ed Sheeran',
    image: 'equals.jpg',
    path: 'firsttimes.mp3'
  },
  {
    name: '2steps',
    artist: 'Ed Sheeran',
    image: 'equals.jpg',
    path: '2steps.mp3'
  },
  {
    name: 'Shape of you',
    artist: 'Ed Sheeran',
    image: 'divide.jpg',
    path: 'shapeofyou.mp3'
  },
  {
    name: 'Perfect',
    artist: 'Ed Sheeran',
    image: 'perfect.jpg',
    path: 'perfect.mp3'
  }
]

const nextTrack = () => {
  if(trackIndex < allTracks.length - 1) {
    trackIndex++
  } else {
    trackIndex = 0
  }
  loadTrack(trackIndex)
  playTrack()
}

const prevTrack = () => {
  if(trackIndex > 0) {
    trackIndex--
  } else {
    trackIndex = allTracks[trackIndex] - 1
  }
  loadTrack(trackIndex)
  playTrack()
}

const resetValues = () => {
  currentTime.innerText = '00:00'
  totalDuration.innerText = '00:00'
  seekSlider.value = 0
}


const seekUpdate = () => {
  let seekPosition = 0
  if(!isNaN(currTrack.duration)) {
    seekPosition = currTrack.currentTime * (100 / currTrack.duration)
    seekSlider.value = seekPosition

    let currentMinutes = Math.floor(currTrack.currentTime / 60)
    let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60)
    let totalMinutes = Math.floor(currTrack.duration / 60)
    let totalSeconds = Math.floor(currTrack.duration - totalMinutes * 60)

    if(currentMinutes < 10) currentMinutes = `0${currentMinutes}`
    if(currentSeconds < 10) currentSeconds = `0${currentSeconds}`
    if(totalMinutes < 10) totalMinutes = `0${totalMinutes}`
    if(totalSeconds < 10) totalSeconds = `0${totalSeconds}`

    currentTime.innerText = `${currentMinutes}:${currentSeconds}`
    totalDuration.innerText =  `${totalMinutes}:${totalSeconds}`
  }
}

const loadTrack = (trackIndex) => {
  resetValues()
  clearInterval(updateTimer)

  nowPlaying.innerText = `Playing ${trackIndex + 1} of ${allTracks.length}`
  trackArt.src = `./images/${allTracks[trackIndex].image}`
  trackName.innerText = allTracks[trackIndex].name
  trackArtist.innerText = allTracks[trackIndex].artist

  currTrack.src = `./music/${allTracks[trackIndex].path}`
  currTrack.load()

  updateTimer = setInterval(seekUpdate, 1000)
  currTrack.addEventListener('ended', nextTrack)
}

loadTrack(trackIndex)

const playTrack = () => {
  currTrack.play()
  isPlaying = true
  playButton.innerHTML = `<i class='fas fa-pause-circle'></i>`
}

const pauseTrack = () => {
  currTrack.pause()
  isPlaying = false
  playButton.innerHTML = `<i class='fas fa-play-circle'></i>`
}

const playAndPause = () => {
  if(isPlaying) {
    pauseTrack()
  } else {
    playTrack()
  }
}

const volumeUpdate = () => {
  currTrack.volume = volumeSlider.value / 100
}

const seekTo = () => {
  let seek = currTrack.duration * (seekSlider.value / 100)
  currTrack.currentTime = seek
}


prevButton.addEventListener('click', prevTrack)
nextButton.addEventListener('click', nextTrack)
playButton.addEventListener('click', playAndPause)
volumeSlider.addEventListener('input', volumeUpdate)
seekSlider.addEventListener('change', seekTo)