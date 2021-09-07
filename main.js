import * as THREE from '/threejs/three.module.js'
import { OrbitControls } from '/threejs/OrbitControls.js'

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
varying vec2 UV;
varying vec3 Normal;

void  main(){
    UV = uv;
    Normal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}`;

const fragmentShader = `
uniform sampler2D baseTexture;
varying vec2 UV;
varying vec3 Normal;

void  main(){
    vec3 sky = vec3(0, 0.5, 1) * pow(1.05 - dot(Normal, vec3(0, 0, 1)), 1.5);
    gl_FragColor = vec4(sky + vec3(0, 0, 0.2) + texture2D(baseTexture, UV).xyz, 1);
}`;

const vertexShaderAtmosphere = `
varying vec3 Normal;

void  main(){
    Normal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}`;

const fragmentShaderAtmosphere = `
varying vec3 Normal;

void  main(){
    float strength = pow(0.5 - dot(Normal, vec3(0, 0, 1)), 1.5);
    gl_FragColor = vec4(0, 0.6, 1, 1) * strength;
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

const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(5, 100, 100), new THREE.ShaderMaterial({
    vertexShader: vertexShaderAtmosphere,
    fragmentShader: fragmentShaderAtmosphere,

    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
    })
)
atmosphere.scale.set(1.4, 1.4, 1.4)

const moon = new THREE.Mesh(new THREE.SphereGeometry(5, 75, 75), new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('/images/moonUV.jpg')
    })
)
moon.scale.set(0.27, 0.27, 0.27)
moon.position.set(2, 2, 2)

scene.add(base)
scene.add(atmosphere)
scene.add(moon)
camera.position.z = 16


const backgroundGeometry = new THREE.BufferGeometry()

const backgroundMaterial = new THREE.PointsMaterial({
    color: 0xffffff
})

const backgroundStarVertices = []
for (let i = 0; i < 10000; i++){
    const x = (Math.random() - 0.5) * 2500
    const y = (Math.random() - 0.5) * 2500
    const z = -(Math.random() - 0.5) * 3000
    backgroundStarVertices.push(x, y, z)
}

backgroundGeometry.setAttribute('position', new THREE.Float32BufferAttribute(backgroundStarVertices, 3))

const background = new THREE.Points(backgroundGeometry, backgroundMaterial)
scene.add(background)


const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

var t=0
function animate() {
    controls.update()
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    base.rotation.y += 0.003
    
    t+=0.003
    moon.position.x = 10*Math.cos(t);
    moon.position.z = 10*Math.sin(t);
    moon.position.y = 5*Math.sin(t);
}

animate()