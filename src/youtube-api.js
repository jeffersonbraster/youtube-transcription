import {loadingMessage} from './loading'

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.YTPlayer = null

export function getVideoId(url) {
  const [p1, p2] = url.split('?v=')
  const [videoId] = p2.split('&')

  return videoId
}

export function loadVideo(url) {
  loadingMessage('Carregando vídeo do YouTube..')

  return new Promise((resolve, reject) => {
    window.YTPlayer = new YT.Player('youtubeVideo', {
      videoId: getVideoId(url),
      events: {
        'onReady': () => resolve(),
      }
    })
  })  
}