export function createStar() {
    const starGroup = new THREE.Group();

    //tạo hiệu ứng
    const spriteMaterial = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load('https://threejs.org/examples/textures/lensflare/lensflare0.png'),
        color: 0xFFFF00, 
        transparent: true, 
        blending: THREE.AdditiveBlending// cộng gộp màu
    });
    //2D billboard
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(4, 4, 1);
    starGroup.add(sprite);
    starGroup.position.y = 6;  //vị trí đỉnh cây
    return starGroup;
}