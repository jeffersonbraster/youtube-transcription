import {pipeline} from '@xenova/transformers'
import {loadingMessage} from './loading'
//import data from './data.json'

let data = null

export async function transcribeAudio() {
  const options = {
    chunk_length_s: 30,
    stride_length_s: 5,
    language: 'portuguese',
    task: 'transcribe',
    return_timestamps: true,
  }

  try {
    console.time()
    loadingMessage('Iniciando a transcrição de audio, pode demorar vários minutos.. Aguarde um pouco.')
    console.log('[STARTING TRANSCRIPTION]')

    const transcribe = await pipeline('automatic-speech-recognition', 'Xenova/whisper-small')

    data = await transcribe('../audio.mp3', options)

  } catch (error) {
    console.log('[TRANSCRIPTION ERROR]', error)
    throw new Error(error)
  } finally {
    console.timeEnd()
    loadingMessage('Transcrição finalizada com sucesso!')
    console.log('[TRANSCRIPTION FINISHED]')

    return data
  }
}