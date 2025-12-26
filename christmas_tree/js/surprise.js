export function createGifts(scene, giftMeshes) {

    //sd chung Geometry cho tất cả hôp
    const giftGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const colors = [0xff0000, 0x00ff00, 0xffd700, 0xffffff];
    for (let i = 0; i < 30; i++) {
        const material = new THREE.MeshPhongMaterial({ color: colors[Math.floor(Math.random() * colors.length)] });
        const gift = new THREE.Mesh(giftGeo, material);

        // khởi tại ngẫu nhiên
        gift.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15);

        //lưu trữ v vào userData
        gift.userData.velocity = new THREE.Vector3((Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1);
        scene.add(gift);
        giftMeshes.push(gift);// Lưu tham chiếu > update frame-by-frame
    }
}

//kích hoạt hiệu ứng
export function spawnSurpriseArc(scene, photoMeshes, giftMeshes) {
    const loader = new THREE.TextureLoader();
    const images = ['js/img/im.png', 'js/img/im2.png', 'js/img/im3.png'];
    
    //khởi tạo Geometry ảnh, viền
    const photoGeo = new THREE.CircleGeometry(2, 64);
    const borderGeo = new THREE.CircleGeometry(2.1, 64);
    const borderMat = new THREE.MeshBasicMaterial({ color: 0xFFD700, side: THREE.DoubleSide });

    images.forEach((imgUrl, i) => {
        //load texture bất đồng bộ
        loader.load(imgUrl, (texture) => {
            const photoGroup = new THREE.Group();
            //tạo viền
            const border = new THREE.Mesh(borderGeo, borderMat);
            border.position.z = -0.01;
            photoGroup.add(border);
            const photoMat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
            const photo = new THREE.Mesh(photoGeo, photoMat);
            photoGroup.add(photo);

            //góc phân bổ 
            photoGroup.userData.angleOffset = (i / images.length) * Math.PI * 2;
            scene.add(photoGroup);
            photoMeshes.push(photoGroup);
        });
    });

    createGifts(scene, giftMeshes);
}