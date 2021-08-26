import * as THREE from '/threejs/three.module.js'

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
varying vec2 vertexUV;

void  main(){
    vertexUV = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}`;

const fragmentShader = `
uniform sampler2D baseTexture;
varying vec2 vertexUV;

void  main(){
    
    gl_FragColor = texture2D(baseTexture, vertexUV);
}`;


const base = new THREE.Mesh(new THREE.SphereGeometry(5, 100, 100), new THREE.ShaderMaterial({
    uniforms: { 
        baseTexture: { 
            value: new THREE.TextureLoader().load('/images/earth2.jpg')
        }
    },
    vertexShader,
    fragmentShader
    })
)

scene.add(base)
camera.position.z = 15

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    base.rotation.y += 0.005
}

animate()