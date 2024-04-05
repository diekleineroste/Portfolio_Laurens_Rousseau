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

const grid = new THREE.GridHelper(200, 160, 0xff8ff8, 0x444444);
scene.add(grid);
grid.rotation.x = Math.PI * 0.5
grid.position.set(-1.25, -3.2, -2)

//model

let michelangelo
const gltfloader = new GLTFLoader();
gltfloader.load(urlMichelangelo.href,
    function (object) {
        const model = object.scene
        michelangelo = model
        scene.add(model)
        model.scale.set(-10, 10, 10)
        if (sizes.aspect >= 1) model.position.set(((window.innerWidth / 2) / 175), -.7, 0)
        else model.position.set(100, -.7, 0)
        model.rotation.y = Math.PI * 1.45
    }
)

let woman
const geometry = new THREE.TorusGeometry(.5, .02, 16, 100)
const material = new THREE.MeshStandardMaterial({
    color: 0xff8ff8,
    roughness: .5,
    metalness: .2
})
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)
torus.rotation.x = Math.PI * 0.5

const sLightTorus = new THREE.SpotLight(0xffffff, .6, 1, 1.4);
scene.add(sLightTorus)
sLightTorus.target = torus

gltfloader.load(urlWoman.href,
    function (object) {
        const model = object.scene
        woman = model
        scene.add(model)
        model.scale.set(3.4, 3.4, 3.4)

        if (sizes.aspect < 1) {
            model.position.set(0, -.4, 0)
            torus.position.set(0, 3.3, 0)
            sLightTorus.position.set(0, 3, 0)
        }
        else {
            model.position.x = 100
            torus.position.x = 100
            sLightTorus.position.x = 100
        }
    }
)

let angel
gltfloader.load(urlAngel.href,
    function (object) {
        const model = object.scene
        angel = model
        scene.add(model)
        model.rotation.x = Math.PI * 0.12
        model.scale.set(0.2, 0.2, 0.2)
        if (sizes.aspect < 1) model.position.set(100, -9, 0)
        else model.position.set(-((window.innerWidth / 2) / 175), -9, 0)
    }
)

let thinker
gltfloader.load(urlThinker.href,
    function (object) {
        const model = object.scene
        thinker = model
        scene.add(model)
        const ts = (1.2 + (sizes.aspect / 0.45)) >= 3 ? 3 : (1.2 + (sizes.aspect / 0.45))
        model.scale.set(ts, ts, ts)
        model.rotation.y = Math.PI * .7
        if (sizes.aspect < 1) model.position.set(-((window.innerWidth / 2) / 200), ts > 2.6 ? -11.17 : -11.8 + sizes.aspect, 0)
        else model.position.set(100, -11.2, 0)
    }
)

let lacoon
gltfloader.load(urlLacoon.href,
    function (object) {
        const model = object.scene
        lacoon = model
        scene.add(model)
        model.scale.set(0.15, 0.15, 0.15)
        model.position.set(0, -19.3, 0)
    }
)

//lights
const pointlight = new THREE.PointLight(0xffffff, 500, 40);
const ambientlight = new THREE.AmbientLight(
    0xffffff,
    0.05,
)
scene.add(pointlight, ambientlight);

pointlight.position.set(0, 10, 20);

//camera
const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    1,
    100
);
camera.position.set(0, 0, 10);
scene.add(camera);

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
        camera.position.y = -lerp(0, 18, scalePercent(0, 101))
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
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //change position and scale of models
    if (michelangelo && woman && angel && thinker && lacoon) {
        changeModel()
    }
}, false)

function changeModel() {
    sizes.aspect = window.innerWidth / window.innerHeight
    const ts = (1.2 + (sizes.aspect / 0.45)) >= 3 ? 3 : (1.2 + (sizes.aspect / 0.45))

    if (sizes.aspect >= 1) {
        michelangelo.position.x = (window.innerWidth / 2) / 175
        woman.position.x = 100
        torus.position.x = 100
        sLightTorus.position.x = 100
        thinker.position.x = 100
        angel.position.x = -((window.innerWidth / 2) / 175)
    }
    else {
        michelangelo.position.x = 100
        woman.position.x = 0
        torus.position.x = 0
        sLightTorus.position.x = 0
        thinker.position.x = -((window.innerWidth / 2) / 200)
        angel.position.x = 100
    }
    thinker.scale.set(ts, ts, ts)
    thinker.position.y = ts > 2.6 ? -11.17 : -11.8 + sizes.aspect
}

window.scrollTo({ top: 0, behavior: 'smooth' })
animate();