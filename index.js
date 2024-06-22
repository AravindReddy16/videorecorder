let videocam = document.querySelector('#videocam')
let vstart = document.querySelector('#v-start')
let vrotate = document.querySelector('#v-rotate')
let vstop = document.querySelector('#v-stop')
let vrecord = document.querySelector('#record')
let videoplayer = document.querySelector('.videoplayer')
let recordlist = document.querySelector('.recordlist')

let front = true

let list = []

let contrains = {
    audio: true,
    video: {
        facingMode: {exact: 'user'}
    }
};

function route(url) {
    videocam.autoplay = true
    videocam.muted = false
    videocam.srcObject = null
    videocam.src = url
    videocam.controls = true
    vstop.disabled = true
    vstart.disabled = true
    vrotate.disabled = true
    vrecord.disabled = false
}

function access(contrains) {
    navigator.mediaDevices.getUserMedia(contrains).then((stream) => {
        videocam.autoplay = true
        videocam.muted = true
        videocam.srcObject = stream
        vrecord.disabled = true
        let rname = ''
        let recorder = new MediaRecorder(stream,{
            mimeType: "video/webm"
        })

        vrecord.addEventListener('click', () => {
            videocam.autoplay = true
            videocam.muted = true
            videocam.srcObject = stream
            videocam.src = null
            videocam.controls = false
            vstop.disabled = true
            vstart.disabled = false
            vrotate.disabled = false
            vrecord.disabled = true
        })

        vstart.addEventListener('click', () => {
            let name = prompt('Enter Recording Name: ')
            if(name === '' || name === null){} else {
                recorder.start()
                vstop.disabled = false
                vstart.disabled = true
                rname = name
            }
        })

        vstop.addEventListener('click', ()=>{
            let url = ''
            recorder.stop()
            vstop.disabled = true
            vstart.disabled = false
            
            recorder.ondataavailable = (e)=> {
                url = URL.createObjectURL(e.data)
                list.push([rname,url])
                
                recordlist.innerHTML = ''

                list.forEach(video=>{
                    let videoele = `
                    <div class="recorded">
                        <div class="recordname">
                            <p>${video[0]}</p>
                        </div>
                        <div class="recordmore">
                            <button onclick=route('${video[1]}')>👁️</button>
                            <a href="${video[1]}">ↆ</a>
                        </div>
                    </div>`
                    recordlist.innerHTML += videoele
                })
            }
        })
    })
}

access(contrains)

vrotate.addEventListener('click', ()=>{
    front = !front
    contrains.video.facingMode.exact = front ? 'user' : 'environment'
    access(contrains)
})