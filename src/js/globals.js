import { WebGLRenderer } from "three";

const DEFAULT_CAMERA_NEAR = 0.1;
const DEFAULT_CAMERA_FAR  = 1000;
const DEFAULT_CAMERA_FOV  = 50;

export function Globals() {

 	const renderer = new WebGLRenderer;

  function dimensions() {
    return [window.innerWidth, window.innerHeight];
  }

  function aspect() {
    return window.innerWidth / window.innerHeight;
  }

  function defaultCamera() {
    return {
      fov:  DEFAULT_CAMERA_FOV,
      near: DEFAULT_CAMERA_NEAR,
      far:  DEFAULT_CAMERA_FAR,
    }
  }

}
