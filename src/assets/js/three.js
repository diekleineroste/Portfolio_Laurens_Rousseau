import * as THREE from 'three'
import { GLTFLoader } from 'https://unpkg.com/three@0.163.0/examples/jsm/loaders/GLTFLoader'

const urlMichelangelo = new URL('../models/michelangelo.glb', import.meta.url)
const urlAngel = new URL('../models/angel.glb', import.meta.url)
const urlLacoon = new URL('../models/lacoon.glb', import.meta.url)
const urlThinker = new URL('../models/thinker.glb', import.meta.url)
const urlWoman = new URL('../models/woman.glb', import.meta.url)

const blog = (document.querySelector("#blog-canvas")? true : false)

//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspect: window.innerWidth / window.innerHeight
}

//scene
const scene = new THREE.Scene()

//grid

let grid = new THREE.GridHelper(window.innerHeight * 20, 130, 0xB264AD, 0x444444)
scene.add(grid)
grid.rotation.x = Math.PI * 0.5
grid.position.set(-window.innerWidth / 9, -window.innerHeight / 3, -750)

//model

let michelangelo
const gltfloader = new GLTFLoader()
gltfloader.load(urlMichelangelo.href,
    function (object) {
        const model = object.scene
        michelangelo = model
        scene.add(model)

        const s = window.innerHeight / .85
        if (blog) model.scale.set(s, s, s)
        else model.scale.set(-s, s, s)
        model.rotation.x = (Math.PI * .4)

        const x = (window.innerWidth >= 1600? (1600 / 2) - 300: (window.innerWidth / 2) - 300)
        model.position.set(0, -innerHeight/9, -350)
        if (window.innerWidth <= 880) model.position.z = -2000
        else if(blog) { 
            model.position.y = -(document.documentElement.scrollHeight || document.body.scrollHeight) / 2.5
            model.position.x = -x
        }
        else model.position.z = -350
    }
)

let woman
const geometry = new THREE.TorusGeometry(40, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({
    color: 0xff8ff8,
    roughness: .5,
    metalness: .2,
})
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)
torus.position.z = -5000
torus.rotation.x = Math.PI * 0.45

gltfloader.load(urlWoman.href,
    function (object) {
        const model = object.scene
        woman = model
        scene.add(model)

        const ws = window.innerHeight / 2.3
        model.scale.set(ws, ws, ws)
        model.position.set(0, -window.innerHeight / 13, -250)
        
        const ts = window.innerHeight / 880
        torus.scale.set(ts, ts, ts)
        torus.position.set(0, window.innerHeight / 2.7, -250)

        if (window.innerWidth > 880 && !blog) {
            model.position.z = -2000
            torus.position.z = -2000
        }
        else {
            model.position.z = -250
            torus.position.z = -250
        }
    }
)

let angel
gltfloader.load(urlAngel.href,
    function (object) {
        const model = object.scene
        angel = model
        if (!blog) scene.add(model)

        const s = window.innerHeight / 42
        model.scale.set(s, s, s)

        const x = (window.innerWidth >= 1600? -1600 / 4: -window.innerWidth / 4)
        model.position.set(x, -(document.documentElement.scrollHeight || document.body.scrollHeight) / 2, -250)
        if (window.innerWidth > 880) model.position.z = -250
        else model.position.z = -2000
    }
)

let thinker
gltfloader.load(urlThinker.href,
    function (object) {
        const model = object.scene
        thinker = model
        if (!blog) scene.add(model)

        const s = window.innerHeight / 3.6
        model.scale.set(s, s, s)
        model.rotation.y = Math.PI * 0.7

        const x = (window.innerWidth >= 1600? -1600 / 3: -window.innerWidth / 3)
        model.position.set(x, -(document.documentElement.scrollHeight || document.body.scrollHeight) / 1.55, -250)
        if (window.innerWidth > 880) model.position.z = -2000
        else model.position.z = -250
    }
)

let lacoon
gltfloader.load(urlLacoon.href,
    function (object) {
        const model = object.scene
        lacoon = model
        scene.add(model)
        const s = window.innerHeight / 37
        model.scale.set(-s, s, s)
        model.rotation.x = Math.PI * 0.1
        model.position.set(0, -(document.documentElement.scrollHeight || document.body.scrollHeight) - 100, -250)
        if (window.innerWidth > 880 || blog) model.position.z = -250
        else model.position.z = -2000
    }
)

//lights
const pointlight = new THREE.PointLight(0xffffff, 400000, 400000)
const ambientlight = new THREE.AmbientLight(
    0xffffff,
    0.05,
)
scene.add(pointlight, ambientlight)
pointlight.position.set(0, 10, 500)

// camera
const camera = new THREE.OrthographicCamera( 
    sizes.width / - 2, 
    sizes.width / 2, 
    sizes.height / 2, 
    sizes.height / - 2, 
    0, 
    1000
)
camera.position.set(0, 0, 0)
scene.add(camera)

//renderer
let canvas
if (blog) {
    canvas = document.querySelector("#blog-canvas")
}
else {
    canvas = document.querySelector("#canvas")
}
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
renderer.setClearColor(0x1c1c1c)

function animate() {
    requestAnimationFrame(animate)
    playScrollAnimations()
    if (window.innerWidth > 880) {
        mouseAnimation()
    }

    pointlight.position.y = camera.position.y + 10
    renderer.render(scene, camera)
}

//mouse animation
let mouseX = 0
let mouseY = 0

function mouseAnimation() {
    const X = (mouseX - (sizes.width / 2)) * .0001
    const Y = (mouseY - (sizes.height / 2)) * .0001

    const baseX = Y
    const baseY = X
    const mY = X + (Math.PI * 1.6)
    const bmY = X + (Math.PI * .4)
    const aX = Y + (Math.PI * 0.12)

    if (michelangelo) {
        michelangelo.rotation.x = baseX
        michelangelo.rotation.y = (blog? bmY: mY)
    }
    if (angel) {
        angel.rotation.x = aX
        angel.rotation.y = baseY
    }
    if (lacoon) {
        lacoon.rotation.x = baseX
        lacoon.rotation.y = baseY
    }
    if (woman) {
        woman.rotation.x = baseX
        woman.rotation.y = baseY
    }
}

document.onmousemove = (event) => {
    const {
        clientX,
        clientY
    } = event
    mouseX = clientX
    mouseY = clientY
}

//scroll animation
const scrollAnimations = []
let scrollPercent = 0

function lerp(x, y, a) { return (1 - a) * x + a * y }
function scalePercent(start, end) { return (scrollPercent - start) / (end - start) }

scrollAnimations.push({
    start: 0,
    end: 100,
    func: () => {
        camera.position.y = -lerp(0, (document.documentElement.scrollHeight || document.body.scrollHeight), scalePercent(0, 100))
    },
})

const scroll = ((((document.documentElement.scrollHeight || document.body.scrollHeight) / 2.655)) / ((document.documentElement.scrollHeight || document.body.scrollHeight)))

scrollAnimations.push({
    start: scroll * 100,
    end: 100 - (scroll * 75),
    func: () => {
        if (blog && window.innerWidth > 1280 && michelangelo) {
            michelangelo.position.y = camera.position.y - (window.innerHeight / 9)
        }
    },
})


function playScrollAnimations() {
    scrollAnimations.forEach((animation) => {
        if (scrollPercent >= animation.start && scrollPercent < animation.end) {
            animation.func()
        }
    })
}

document.body.onscroll = () => {
    scrollPercent = (
        (document.documentElement.scrollTop || document.body.scrollTop) /
        ((document.documentElement.scrollHeight || document.body.scrollHeight) - sizes.height)
    ) * 100
}

//resize

window.addEventListener('resize', () => {
    camera.left = window.innerWidth / - 2, 
    camera.right = window.innerWidth / 2, 
    camera.top = window.innerHeight / 2, 
    camera.bottom = window.innerHeight / - 2, 
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)

    //change position and scale of models
    if (michelangelo && woman && angel && thinker && lacoon) {
        changeModel()
    }
}, false)

function changeModel() {
    scene.remove(grid)
    grid = new THREE.GridHelper(window.innerHeight * 20, 130, 0xB264AD, 0x444444)
    grid.rotation.x = Math.PI * 0.5
    grid.position.set(-window.innerWidth / 9, -window.innerHeight / 3, -750)
    scene.add(grid)

    const smichelangelo = window.innerHeight / .85
    if (blog) michelangelo.scale.set(smichelangelo, smichelangelo, smichelangelo)
    else michelangelo.scale.set(-smichelangelo, smichelangelo, smichelangelo)
    const xmichelangelo = (window.innerWidth >= 1600? (1600 / 2) - 300: (window.innerWidth / 2) - 300)
    if (blog) michelangelo.position.set(-xmichelangelo, -(document.documentElement.scrollHeight || document.body.scrollHeight) / 1.75, -2000)
    else michelangelo.position.set(0, -innerHeight/9, -2000)

    const storus = window.innerHeight / 880
    torus.scale.set(storus, storus, storus)
    torus.position.set(0, window.innerHeight / 2.7, -250)

    const swoman = window.innerHeight / 2.3
    woman.scale.set(swoman, swoman, swoman)
    woman.position.set(0, -window.innerHeight / 13, -250)

    const sangel = window.innerHeight / 42
    angel.scale.set(sangel, sangel, sangel)
    const xangel = (window.innerWidth >= 1600? -1600 / 4: -window.innerWidth / 4)
    angel.position.set(xangel, -(document.documentElement.scrollHeight || document.body.scrollHeight) / 2, -250)

    const sthinker = window.innerHeight / 3.4
    thinker.scale.set(sthinker, sthinker, sthinker)
    const xthinker = (window.innerWidth >= 1600? -1600 / 3: -window.innerWidth / 3)
    thinker.position.set(xthinker, -(document.documentElement.scrollHeight || document.body.scrollHeight) / 1.55, -250)

    const slacoon = window.innerHeight / 37
    lacoon.position.set(0, -(document.documentElement.scrollHeight || document.body.scrollHeight) - 100, -250)
    lacoon.scale.set(-slacoon, slacoon, slacoon)

    if (window.innerWidth > 880) {
        angel.position.z = -250
        lacoon.position.z = -250
        thinker.position.z = -2000
        if (window.innerWidth > 1280 && blog)michelangelo.position.z = -300
        if (!blog) woman.position.z = -2000
        if (!blog) torus.position.z = -2000
    }
    else {
        woman.position.z = -250
        torus.position.z = -250
        thinker.position.z = -250
        angel.position.z = -2000
        if (!blog) lacoon.position.z = -2000
        if (window.innerWidth < 1280 && blog) michelangelo.position.z = -2000
    }
}

window.scrollTo({ top: 0, behavior: 'smooth' })
animate()