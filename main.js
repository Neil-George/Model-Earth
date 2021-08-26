import * as THREE from '/js/three.module.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer(
    {
        antialias: true
    }
)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

const vertexShader = `
void  main(){
    gl_Position = vec4(1, 0, 0, 1);
}`;

const fragmentShader = `
void  main(){
    gl_FragColor = vec4(1, 0, 0, 1);
}`;


const base = new THREE.Mesh(new THREE.SphereGeometry(5, 100, 100), new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader
    })
)

scene.add(base)
camera.position.z = 10

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    base.rotation.y += 0.005
}

animate()