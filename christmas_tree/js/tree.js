export function createChristmasTree() {
    const particleCount = 22000; //số lượng hạt
    const geometry = new THREE.BufferGeometry();

    //kt mảng
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        //conic
        const h = Math.random() * 12; 
        const ratio = (12 - h) / 12;//tỉ lệ thu hẹp
        const maxRadius = ratio * 5.5; 

        //phân bổ đều
        const r = maxRadius * Math.sqrt(Math.random()); 
        const theta = Math.random() * Math.PI * 2;
        const x = Math.cos(theta) * r;
        const y = h - 6; // căn chỉnh trọng tâm
        const z = Math.sin(theta) * r;
        //lưu vào buffer
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const color = new THREE.Color();
        const rand = Math.random();
        
        if (rand > 0.5) {
            color.setRGB(0.01, 0.3, 0.015); //xanh 
        } else if (rand > 0.15) {
            color.setHSL(0.12, 1.0, 0.6); // vàng
        } else if (rand > 0.05) {
            color.setRGB(0.8, 0.1, 0.02); //đỏ
        } else {
            color.setRGB(1.0, 0.8, 0.9); //trắng
        }
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        //bung ra theo phương ngang
        velocities[i * 3] = x * 0.15;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
        velocities[i * 3 + 2] = z * 0.15;
    }
    //đẩy vào attribute
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    
    //thiết lập hệ thống hạt
    const material = new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending, //hạt sáng
        depthWrite: false
    });

    return new THREE.Points(geometry, material);
}