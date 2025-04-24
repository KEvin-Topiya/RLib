import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Grid3DFromJSON() {
  const mountRef = useRef(null);
  const [gridData, setGridData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    setLoading(true);
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.grid) {
          setGridData(data);
        } else {
          alert('Invalid file format.');
          setLoading(false);
        }
      } catch {
        alert('Error parsing JSON file.');
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    if (!gridData) return;

    const { grid } = gridData;
    const cellSize = 1;
    const height = 500;
    const width = mountRef.current.clientWidth;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f0f0f0');

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(10, 10, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.enableZoom = true;
controls.enablePan = true; // ✅ Allow panning (grab and move)
controls.screenSpacePanning = true; // ✅ Makes panning intuitive (mouse drag direction matches scene movement)

    const offsetX = -(grid[0].length * cellSize) / 2;
    const offsetZ = -(grid.length * cellSize) / 2;

    const groupMap = {};
    const labelMeshMap = {};

    grid.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell?.groupId) {
          if (!groupMap[cell.groupId]) {
            groupMap[cell.groupId] = { cells: [], ...cell };
          }
          groupMap[cell.groupId].cells.push({ r, c });
        }
      });
    });

    Object.entries(groupMap).forEach(([groupId, group]) => {
      const { cells, color, label, type } = group;
      const minRow = Math.min(...cells.map(cell => cell.r));
      const maxRow = Math.max(...cells.map(cell => cell.r));
      const minCol = Math.min(...cells.map(cell => cell.c));
      const maxCol = Math.max(...cells.map(cell => cell.c));

      const width = (maxCol - minCol + 1) * cellSize;
      const depth = (maxRow - minRow + 1) * cellSize;

      let height = 0.3;
      let positionY = 0.15;

      const xPos = offsetX + (minCol + (maxCol - minCol + 1) / 2) * cellSize;
      const zPos = offsetZ + (minRow + (maxRow - minRow + 1) / 2) * cellSize;

      if (type === 'door') {
        const doorGroup = new THREE.Group();
        const doorGeometry = new THREE.BoxGeometry(width, 2, 0.1);
        const doorMaterial = new THREE.MeshStandardMaterial({ color: '#874800', transparent: true, opacity: 0.5 });
        const doorMesh = new THREE.Mesh(doorGeometry, doorMaterial);
        doorMesh.position.set(width / 2, 1, 0);
        doorGroup.add(doorMesh);
        doorGroup.position.set(xPos - width / 2, 0, zPos);
        scene.add(doorGroup);
      
        // Add label on top of the door
        if (label) {
          const canvas = document.createElement('canvas');
          canvas.width = 256;
          canvas.height = 64;
          const ctx = canvas.getContext('2d');
          ctx.font = '24px Arial';
          ctx.fillStyle = '#000';
          ctx.textAlign = 'center';
          ctx.fillText(label, 128, 40); // Place the label in the middle of the canvas
          const texture = new THREE.CanvasTexture(canvas);
          const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
          const sprite = new THREE.Sprite(spriteMaterial);
          sprite.scale.set(2, 1, 1); // Adjust size as needed
          sprite.position.set(xPos, 2.5, zPos); // Set label position slightly above the door (adjust 2.5 for desired height)
          scene.add(sprite);
        }
      
        return;
      }
      

      if (type === 'desk') {
        height = 1;
        positionY = height / 2;
      } else if (type === 'bookshelf') {
        height = 2;
        positionY = height / 2;
      }

      if (type === 'table') {
        const tableGroup = new THREE.Group();
        const topGeometry = new THREE.BoxGeometry(width, 0.1, depth);
        const topMaterial = new THREE.MeshStandardMaterial({ color: color || '#ff6947' ,transparent:'true',opacity:'0.8'});
        const topMesh = new THREE.Mesh(topGeometry, topMaterial);
        topMesh.position.set(0, 1, 0);
        tableGroup.add(topMesh);

        const legGeometry = new THREE.BoxGeometry(0.1, 1, 0.1);
        const legMaterial = new THREE.MeshStandardMaterial({ color: '#8c8787' });

        const legOffsets = [
          [-width / 2 + 0.05, 0.5, -depth / 2 + 0.05],
          [ width / 2 - 0.05, 0.5, -depth / 2 + 0.05],
          [-width / 2 + 0.05, 0.5,  depth / 2 - 0.05],
          [ width / 2 - 0.05, 0.5,  depth / 2 - 0.05],
        ];

        for (const [lx, ly, lz] of legOffsets) {
          const legMesh = new THREE.Mesh(legGeometry, legMaterial);
          legMesh.position.set(lx, ly, lz);
          tableGroup.add(legMesh);
        }

        tableGroup.position.set(xPos, 0, zPos);
        scene.add(tableGroup);

        // Add label to table top
        if (label) {
          const canvas = document.createElement('canvas');
          canvas.width = 256;
          canvas.height = 64;
          const ctx = canvas.getContext('2d');
          ctx.font = '24px Arial';
          ctx.fillStyle = '#000';
          ctx.textAlign = 'center';
          ctx.fillText(label, 128, 40);
          const texture = new THREE.CanvasTexture(canvas);
          const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
          const sprite = new THREE.Sprite(spriteMaterial);
          sprite.scale.set(2, 1, 1);
          sprite.position.set(xPos, 1.2, zPos);
          scene.add(sprite);
        }

        return;
      }

      const geometry = new THREE.BoxGeometry(width, height, depth);
      const material = new THREE.MeshBasicMaterial({
        color: color || '#cccccc',
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
      });

      const baseMesh = new THREE.Mesh(geometry, material);
      baseMesh.position.set(xPos, positionY, zPos);
      scene.add(baseMesh);

      const edges = new THREE.EdgesGeometry(geometry);
      const lineMaterial = new THREE.LineBasicMaterial({ color: '#000000' });
      const wireframe = new THREE.LineSegments(edges, lineMaterial);
      wireframe.position.copy(baseMesh.position);
      scene.add(wireframe);

      if (label) {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.font = '24px Arial';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.fillText(label, 128, 40);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(2, 1, 1);
        sprite.position.set(xPos, positionY + height / 2 + 0.2, zPos);
        scene.add(sprite);
      }

      if (label) {
        labelMeshMap[label.toLowerCase()] = baseMesh;
      }
    });

    const floorGeometry = new THREE.PlaneGeometry(grid[0].length * cellSize, grid.length * cellSize);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: '#eeeeee', side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, 0);
    scene.add(floor);

    const wallMaterial = new THREE.MeshBasicMaterial({ color: '#888888', transparent: true, opacity: 0.2 });
    const rows = grid.length;
    const cols = grid[0].length;
    const wallHeight = 2;
    const wallThickness = 0.05;

    function addWall(x, y, z, w, h, d) {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, wallMaterial);
      mesh.position.set(x, y, z);
      scene.add(mesh);
    }

    for (let i = 0; i < cols; i++) {
      addWall(offsetX + i * cellSize + cellSize / 2, wallHeight / 2, offsetZ - wallThickness / 2, cellSize, wallHeight, wallThickness);
      addWall(offsetX + i * cellSize + cellSize / 2, wallHeight / 2, offsetZ + rows * cellSize + wallThickness / 2, cellSize, wallHeight, wallThickness);
    }

    for (let i = 0; i < rows; i++) {
      addWall(offsetX - wallThickness / 2, wallHeight / 2, offsetZ + i * cellSize + cellSize / 2, wallThickness, wallHeight, cellSize);
      addWall(offsetX + cols * cellSize + wallThickness / 2, wallHeight / 2, offsetZ + i * cellSize + cellSize / 2, wallThickness, wallHeight, cellSize);
    }

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    scene.add(new THREE.AmbientLight(0x404040));

    function animate() {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    let blinkInterval;
    function highlightLabel(label) {
      clearInterval(blinkInterval);
      const mesh = labelMeshMap[label.toLowerCase()];
      if (!mesh) {
        alert('Label not found.');
        return;
      }
      const originalColor = mesh.material.color.clone();
      const originalOpacity = mesh.material.opacity;
      const originalTransparent = mesh.material.transparent;

      let toggle = true;
      blinkInterval = setInterval(() => {
        if (toggle) {
          mesh.material.color.set('red');
          mesh.material.opacity = 1;
          mesh.material.transparent = false;
        } else {
          mesh.material.color.copy(originalColor);
          mesh.material.opacity = originalOpacity;
          mesh.material.transparent = originalTransparent;
        }
        toggle = !toggle;
      }, 400);

      setTimeout(() => {
        clearInterval(blinkInterval);
        mesh.material.color.copy(originalColor);
        mesh.material.opacity = originalOpacity;
        mesh.material.transparent = originalTransparent;
      }, 3000);
    }

    window.__searchBookshelf = highlightLabel;

    return () => {
      renderer.dispose();
    };
  }, [gridData]);

  const handleSearch = () => {
    if (window.__searchBookshelf) {
      window.__searchBookshelf(searchTerm);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search bookshelf label..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '8px', padding: '4px' }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      {loading && <p>Loading...</p>}
      <div ref={mountRef} style={{ width: '100%', height: '500px' }} />
      <div style={{ 
  backgroundColor: '#f9f9f9', 
  padding: '10px', 
  borderRadius: '8px', 
  marginBottom: '10px', 
  fontSize: '14px', 
  color: '#333',
  boxShadow: '0 0 5px rgba(0,0,0,0.1)' 
}}>
  <strong>Instructions:</strong><br />
  🖱️ <b>Left Click</b>: Rotate<br />
  🖱️ <b>Right Click</b> or <b>Ctrl + Left Click</b>: Pan (Move scene)<br />
  🖱️ <b>Scroll</b>: Zoom in/out<br />
  🔍 Use the search bar to find and highlight a labeled bookshelf
</div>

    </div>
  );
}
