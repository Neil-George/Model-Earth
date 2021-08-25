import * as THREE from '/js/three.module.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()

renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 100, 100), new THREE.MeshBasicMaterial({
    color: 0x008B8B
    })
)

scene.add(sphere)
camera.position.z = 20

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()