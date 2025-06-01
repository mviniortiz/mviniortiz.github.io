import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

// Configuração da cena 3D
function initHeader() {
  const container = document.querySelector('.hero-background');
  if (!container) return;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  
  // Criar partículas de dados
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1000;
  
  const posArray = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0xdc2626,
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  camera.position.z = 2;
  
  // Animação
  function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Responsividade
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

document.addEventListener('DOMContentLoaded', initHeader);