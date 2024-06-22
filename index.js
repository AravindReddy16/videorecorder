let videocam = document.querySelector('#videocam')
let vstart = document.querySelector('#v-start')
let vrotate = document.querySelector('#v-rotate')
let vstop = document.querySelector('#v-stop')

let front = true

const rotate = () => {
    front = !front
}

function timer() {
    return front ? 'user' : 'environment'
}

setInterval(timer,1000)

navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
        facingMode: setInterval(timer,1000)
    },
}).then((stream) => {
    videocam.autoplay = true
    videocam.srcObject = stream
    let recorder = new MediaRecorder(stream,{
        mimeType: "video/webm"
    })

    vstart.addEventListener('click', () => {
        recorder.start(1000)
        vstop.disabled = false
        vstart.disabled = true
    })

    vstop.addEventListener('click', ()=>{
        recorder.stop()
        vstop.disabled = true
        vstart.disabled = false
    })

    vrotate.addEventListener('click', ()=>{
        rotate()
    })
})
