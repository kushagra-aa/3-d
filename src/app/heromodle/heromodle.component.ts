import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'node_modules/three/examples/jsm/loaders/gltfloader.js'
import { OrbitControls } from 'node_modules/three/examples/jsm/controls/orbitcontrols.js'

@Component({
  selector: 'app-heromodle',
  templateUrl: './heromodle.component.html',
  styles: []
})
export class HeromodleComponent implements OnInit {


  constructor() { }



  ngOnInit(): void {
    this.modle();

  }
  uri = "assets/hero/SS.gltf";
  scene;
  height;
  width;
  camera;
  mesh;
  renderer;


  modle() {


    //Scene
    this.scene = new THREE.Scene();

    //Camera
    this.height = 100;
    this.width = 100;
    let distance = 1000;
    let diag = Math.sqrt((this.height * this.height) + (this.width * this.width))
    let fov = 2 * Math.atan((diag) / (2 * distance)) * (180 / Math.PI); //Field of View
    let camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, distance);
    camera.position.set(0, 25, -50);

    //Canvas
    let myCanvas = document.getElementById('hero');

    //Renderer
    let renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: myCanvas,
      alpha: true
    });


    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.antialias = true;
    document.body.appendChild(renderer.domElement);

    //LIGHTS
    var light = new THREE.AmbientLight(0xffffff, 3);
    light.power = 6640;  // GE Lumens @ 60W incade.
    light.decay = 2;
    light.distance = Infinity;
    light.position.set(0, 2, 0);
    light.castShadow = true;
    light.shadowCameraVisible = true;
    this.scene.add(light);

    //OrbitControls
    let orbit = new OrbitControls(this.camera, renderer.domElement);
    orbit.maxPolarAngle = Math.PI / 2;
    orbit.update();

    // Instantiate a loader
    let loader = new GLTFLoader();
    loader.load(this.uri);

  }

  handle_load(gltf) {
    this.mesh = gltf.scene;
    this.scene.add(this.mesh);
  }


  //Render loop


  delta = 0;
  prevTime = Date.now();

  render() {
    //exposure
    this.renderer.toneMappingExposure = Math.pow(0.7, 5.0);  // -> exposure: 0.168
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.render);
  }


}
