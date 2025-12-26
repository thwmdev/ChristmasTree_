import { setupScene } from './scene.js';
import { createChristmasTree } from './tree.js';
import { createStar } from './star.js';
import { spawnSurpriseArc } from './surprise.js';

//init
const { scene, camera, renderer } = setupScene();
const tree = createChristmasTree();
const star = createStar();

scene.add(tree);
if (star) scene.add(star);

//state
let isExploded = false;
let canExplode = false;
let photoMeshes = [];
let giftMeshes = [];

const openBtn = document.getElementById('openBtn');
if (openBtn) {
    openBtn.addEventListener('click', () => {
        canExplode = true;
        openBtn.style.display = 'none';
    });
}

//render
function animate() {
    requestAnimationFrame(animate);

    if (!canExplode) {
        tree.rotation.y += 0.005;
        if(star) {
            star.rotation.y += 0.005;
            star.scale.setScalar(1 + Math.sin(Date.now() * 0.005) * 0.1);
        }
    } else {
        if (!isExploded) {
            spawnSurpriseArc(scene, photoMeshes, giftMeshes);
            isExploded = true;
            if(star) star.visible = false;
        }
        updateExplosionAnimation(tree, photoMeshes, giftMeshes);
    }

    renderer.render(scene, camera);
}

///logic di chuyển sau ấn: xoay, tung, tan rã

function updateExplosionAnimation(tree, photoMeshes, giftMeshes) {
    const time = Date.now() * 0.001; 
    //hạt bay
    photoMeshes.forEach((p) => {
        const angle = p.userData.angleOffset + time;
        const radius = 8;
        p.position.x = Math.sin(angle) * radius;
        p.position.z = Math.cos(angle) * radius;
        p.position.y = Math.sin(time * 0.5) * 2;
        p.rotation.y = angle; 
    });
    //quà bay
    giftMeshes.forEach(g => {
        g.position.add(g.userData.velocity);
        g.rotation.x += 0.02; 
        g.rotation.y += 0.02;
    });
    //tan rã
    const posAttr = tree.geometry.attributes.position;
    const velAttr = tree.geometry.attributes.velocity;
    const pos = posAttr.array;
    const vel = velAttr.array;

///////////vị trí 
    for (let i = 0; i < pos.length; i++) {
        pos[i] += vel[i];
        vel[i] *= 0.96; 
        pos[i] += Math.sin(time + i) * 0.002;
    }
    posAttr.needsUpdate = true;// three.js render vị trí mới
    
    //thu nhỏ, nhấp nháy
    if (tree.material.size > 0.06) {
        tree.material.size *= 0.99;
    } else {
        tree.material.size = 0.06; 
    }
    tree.material.opacity = 0.6 + Math.sin(time * 3) * 0.2;
}

animate();