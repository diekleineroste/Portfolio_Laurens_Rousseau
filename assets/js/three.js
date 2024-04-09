import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const urlMichelangelo = new URL('../models/michelangelo.glb', import.meta.url)
const urlAngel = new URL('../models/angel.glb', import.meta.url)
const urlLacoon = new URL('../models/lacoon.glb', import.meta.url)
const urlThinker = new URL('../models/thinker.glb', import.meta.url)
const urlWoman = new URL('../models/woman.glb', import.meta.url)

//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspect: window.innerWidth / window.innerHeight
}

//scene
const scene = new THREE.Scene();

const grid = new THREE.GridHelper(window.innerHeight * 20, 130, 0xff8ff8, 0x444444);
scene.add(grid);
grid.rotation.x = Math.PI * 0.5
grid.position.set(-window.innerWidth / 9, -window.innerHeight / 3, -750)

//model

let michelangelo
const gltfloader = new GLTFLoader();
gltfloader.load(urlMichelangelo.href,
    function (object) {
        const model = object.scene
        michelangelo = model
        scene.add(model)
        model.scale.set(-1100, 1100, 1100)
        model.position.set((window.innerWidth / 2) - 350, -innerHeight/9, -250)
        if (window.innerWidth > 800) model.position.z = -250
        else model.position.z = -2000
        model.rotation.y = Math.PI * 1.45
    }
)

let woman
const geometry = new THREE.TorusGeometry(40, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({
    color: 0xff8ff8,
    roughness: .5,
    metalness: .2
})
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)
torus.rotation.x = Math.PI * 0.45

gltfloader.load(urlWoman.href,
    function (object) {
        const model = object.scene
        woman = model
        scene.add(model)

        const ws = window.innerHeight / 2.3
        const ts = window.innerHeight / 800

        model.scale.set(ws, ws, ws)
        model.position.set(0, -window.innerHeight / 13, -250)

        torus.scale.set(ts, ts, ts).set(ts, ts, ts)
        torus.position.set(0, window.innerHeight / 2.7, -250)

        if (window.innerWidth > 800) {
            model.position.z = -2000
            torus.position.z = -2000
        }
        else {
            model.position.z = -250
        }
    }
)

let angel
gltfloader.load(urlAngel.href,
    function (object) {
        const model = object.scene
        angel = model
        scene.add(model)
        const s = window.innerHeight / 42
        model.scale.set(s, s, s)
        model.position.set((-window.innerWidth / 4), -window.innerHeight, -250)
        if (window.innerWidth > 800) model.position.z = -250
        else model.position.z = -2000
    }
)

let thinker
gltfloader.load(urlThinker.href,
    function (object) {
        const model = object.scene
        thinker = model
        scene.add(model)
        const s = window.innerHeight / 3.4
        model.rotation.y = Math.PI * 0.7
        model.scale.set(s, s, s)
        model.position.set(-window.innerWidth / 3, -window.innerHeight * 1.47, -250)
        if (window.innerWidth > 800) model.position.z = -2000
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
        model.position.set(0, -window.innerHeight * 2.15, -250)
    }
)

//lights
const pointlight = new THREE.PointLight(0xffffff, 400000, 400000);
const ambientlight = new THREE.AmbientLight(
    0xffffff,
    0.05,
)
scene.add(pointlight, ambientlight);

pointlight.position.set(0, 10, 500);

//camera
// const camera = new THREE.PerspectiveCamera(
//     45,
//     sizes.width / sizes.height,
//     1,
//     100
// );
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
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setClearColor(0x1c1c1c)

function animate() {
    requestAnimationFrame(animate);
    playScrollAnimations()
    if (sizes.aspect > 1) {
        mouseAnimation()
    }

    pointlight.position.y = camera.position.y + 10
    renderer.render(scene, camera);
}

//mouse animation
let mouseX = 0
let mouseY = 0

function mouseAnimation() {
    const X = (mouseX - (sizes.width / 2)) * .00004
    const Y = (mouseY - (sizes.height / 2)) * .00004

    const baseX = Y
    const baseY = X
    const mY = X + (Math.PI * 1.4)
    const aX = Y + (Math.PI * 0.12)

    if (michelangelo) {
        michelangelo.rotation.x = baseX
        michelangelo.rotation.y = mY
    }
    if (angel) {
        angel.rotation.x = aX
        angel.rotation.y = baseY
    }
    if (lacoon) {
        lacoon.rotation.x = baseX
        lacoon.rotation.y = baseY
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
    end: 101,
    func: () => {
        camera.position.y = -lerp(0, window.innerHeight * 2, scalePercent(0, 101))
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
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //change position and scale of models
    if (michelangelo && woman && angel && thinker && lacoon) {
        changeModel()
    }
}, false)

function changeModel() {
    // const ts = (1.2 + (window.innerWidth / 400)) >= 3 ? 3 : (1.2 + (window.innerWidth / 400))

    // if (sizes.aspect >= 1) {
    //     michelangelo.position.z = -250
    //     woman.position.z = -2000
    //     torus.position.z = -2000
    //     sLightTorus.position.z = -2000
    //     thinker.position.z = -2000
    //     angel.position.x = -4
    // }
    // else {
    //     michelangelo.position.z = -2000
    //     woman.position.x = 0
    //     torus.position.x = 0
    //     sLightTorus.position.z = 0
    //     thinker.position.z = -400
    //     angel.position.z = -2000
    // }
    // thinker.scale.set(ts, ts, ts)
    // thinker.position.y = -13.4 + ((window.innerWidth - 300) / 4000)
}

window.scrollTo({ top: 0, behavior: 'smooth' })
animate();