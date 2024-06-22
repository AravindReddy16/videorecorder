let videocam = document.querySelector('#videocam')
let vstart = document.querySelector('#v-start')
let vrotate = document.querySelector('#v-rotate')
let vstop = document.querySelector('#v-stop')

let front = true

let contrains = {
    audio: false,
    video: {
        facingMode: {exact: 'user'}
    }
};

function access(contrains) {
    navigator.mediaDevices.getUserMedia(contrains).then((stream) => {
        media(stream)
    })
}

function media(stream) {
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
}

access(contrains)

vrotate.addEventListener('click', ()=>{
    front = !front
    contrains.video.facingMode.exact = front ? 'user' : 'environment'
    access(contrains)
})