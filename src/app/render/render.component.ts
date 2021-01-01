import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css']
})
export class RenderComponent implements OnInit {


  scene;
  camera;
  renderer;
  fov = 45;
  aspect = 2;
  near = 0.1;
  far = 100;
  constructor() { }

  ngOnInit(): void {
    // this.InitRender();
    this.main();
  }

  main() {
    const canvas = document.querySelector('#here');
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    // renderer.setClearColor (0x333333, 1);
    const camera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
    camera.position.set(0, 10, 20);

    const controls = new THREE.OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#00FFFFFF');

    {
      const planeSize = 40;

      const loader = new THREE.TextureLoader();
      const texture = loader.load('assets/back.jpg');
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      const repeats = planeSize / 2;
      texture.repeat.set(repeats, repeats);

      const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
      const planeMat = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(planeGeo, planeMat);
      mesh.rotation.x = Math.PI * -.5;
      // scene.add(mesh);
    }

    // {
    //   const skyColor = 0xB1E1FF;  // light blue
    //   const groundColor = 0xB97A20;  // brownish orange
    //   const intensity = 2;
    //   const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    //   scene.add(light);
    // }

    // {
    //   const color = 0xFFFFFF;
    //   const intensity = 2;
    //   const light = new THREE.DirectionalLight(color, intensity);
    //   light.position.set(5, 10, 2);
    //   scene.add(light);
    //   scene.add(light.target);
    // }

    {
      let directionalLight = new THREE.DirectionalLight(0xffffff, 3);
      directionalLight.position.set(0, 1, 0);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      let light = new THREE.PointLight(0xc4c4c4, 3);
      light.position.set(0, 300, 500);
      scene.add(light);
      let light2 = new THREE.PointLight(0xc4c4c4, 3);
      light2.position.set(500, 100, 0);
      scene.add(light2);
      let light3 = new THREE.PointLight(0xc4c4c4, 3);
      light3.position.set(0, 100, -500);
      scene.add(light3);
      let light4 = new THREE.PointLight(0xc4c4c4, 3);
      light4.position.set(-500, 300, 500);
      scene.add(light4);
    }

    function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
      const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
      const halfFovY = THREE.Math.degToRad(camera.fov * .5);
      const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
      // compute a unit vector that points in the direction the camera is now
      // in the xz plane from the center of the box
      const direction = (new THREE.Vector3())
        .subVectors(camera.position, boxCenter)
        .multiply(new THREE.Vector3(1, 0, 1))
        .normalize();

      // move the camera to a position distance units way from the center
      // in whatever direction the camera was from the center already
      camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

      // pick some near and far values for the frustum that
      // will contain the box.
      camera.near = boxSize / 100;
      camera.far = boxSize * 100;

      camera.updateProjectionMatrix();

      // point the camera to look at the center of the box
      camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
    }

    {
      const modelName = 'assets/birchtree/scene.gltf';
      console.log('model ==> ' + modelName);
      const gltfLoader = new THREE.GLTFLoader();
      gltfLoader.load(modelName, (gltf) => {
        const root = gltf.scene;
        scene.add(root);

        // compute the box that contains all the stuff
        // from root and below
        const box = new THREE.Box3().setFromObject(root);

        const boxSize = box.getSize(new THREE.Vector3()).length();
        const boxCenter = box.getCenter(new THREE.Vector3());

        // set the camera to frame the box
        frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

        // update the Trackball controls to handle the new size
        controls.maxDistance = boxSize * 10;
        controls.target.copy(boxCenter);
        controls.update();
      });
    }

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    function render() {
      if (resizeRendererToDisplaySize(renderer)) {

        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  InitRender() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xdddddd);
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    this.camera.rotation.y = 45 / 180 * Math.PI;
    this.camera.position.x = 800;
    this.camera.position.y = 100;
    this.camera.position.z = 1000;
    let controls = new THREE.OrbitControls(this.camera);
    controls.addEventListener('change', this.renderer);
    let hlight = new THREE.AmbientLight(0x404040, 100);
    this.scene.add(hlight);
    let directionalLight = new THREE.DirectionalLight(0xffffff, 100);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
    let light = new THREE.PointLight(0xc4c4c4, 10);
    light.position.set(0, 300, 500);
    this.scene.add(light);
    let light2 = new THREE.PointLight(0xc4c4c4, 10);
    light2.position.set(500, 100, 0);
    this.scene.add(light2);
    let light3 = new THREE.PointLight(0xc4c4c4, 10);
    light3.position.set(0, 100, -500);
    this.scene.add(light3);
    let light4 = new THREE.PointLight(0xc4c4c4, 10);
    light4.position.set(-500, 300, 500);
    this.scene.add(light4);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    let loader = new THREE.GLTFLoader();
    loader.load('assets/datsun/scene.gltf', (gltf) => {
      let car = gltf.scene.children[0];
      car.scale.set(0.5, 0.5, 0.5);
      this.scene.add(gltf.scene);
      this.animate();
    });
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  }

}
