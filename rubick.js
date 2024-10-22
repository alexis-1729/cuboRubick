let scene, camera, renderer, cube;
let mouseX = 0, mouseY = 0;
let isDragging = false;
let prevMouseX, prevMouseY;

function init() {
    // Escena
    scene = new THREE.Scene();
    
    // Cámara
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Crear cubo de Rubik (compuesto por cubitos)
    cube = new THREE.Group();
    let cubieSize = 0.95;
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
                let geometry = new THREE.BoxGeometry(cubieSize, cubieSize, cubieSize);
                let materials = [
                    new THREE.MeshBasicMaterial({color: x === 1 ? 0xff0000 : 0x000000}), // Rojo
                    new THREE.MeshBasicMaterial({color: x === -1 ? 0x0000ff : 0x000000}), // Azul
                    new THREE.MeshBasicMaterial({color: y === 1 ? 0x00ff00 : 0x000000}), // Verde
                    new THREE.MeshBasicMaterial({color: y === -1 ? 0xffff00 : 0x000000}), // Amarillo
                    new THREE.MeshBasicMaterial({color: z === 1 ? 0xffffff : 0x000000}), // Blanco
                    new THREE.MeshBasicMaterial({color: z === -1 ? 0xffa500 : 0x000000})  // Naranja
                ];
                let cubie = new THREE.Mesh(geometry, materials);
                cubie.position.set(x, y, z);
                cube.add(cubie);
            }
        }
    }
    scene.add(cube);

    // Eventos de mouse
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUp, false);
    
    // Responsividad
    window.addEventListener('resize', onWindowResize, false);
    
    // Renderizado
    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseDown(event) {
    isDragging = true;
    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
}

function onMouseMove(event) {
    if (!isDragging) return;
    
    let deltaX = event.clientX - prevMouseX;
    let deltaY = event.clientY - prevMouseY;

    // Rotar el cubo de Rubik
    cube.rotation.y += deltaX * 0.01;
    cube.rotation.x += deltaY * 0.01;

    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
}

function onMouseUp() {
    isDragging = false;
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();