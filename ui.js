/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as tf from '@tensorflow/tfjs';

var CONTROLS = ['up', 'down', 'left', 'right','after','ex01','ex02','ex03'];
/*const CONTROL_CODES = [38, 40, 37, 39, 36];*/

var ex_num=0;
var ex_name=[];
export function copytxt(){
  for(let i=0;i<500;i++){
    ex_name[i]="ex"+i.toString();
    CONTROLS.push(ex_name[i]);
    totals.push(0);
    var para = document.createElement("div");
    var para01 = document.createElement("div");
    var para02 = document.createElement("div");
    var para03 = document.createElement("div");
    var para04 = document.createElement("div");
    var _canvas= document.createElement("canvas");
    var _button=document.createElement("button")
    var _span=document.createElement("span");
    var _txt=document.createTextNode("Add Sample");
    var para05 = document.createElement("p");
    var _span01=document.createElement("span");
    var _txt01=document.createTextNode("0");
    var _txt02=document.createTextNode("example"+i.toString());

    para.classList=("panel-row panel-row-"+ex_name[i]);
    para01.classList=("panel-cell panel-cell-"+ex_name[i]);
    para02.classList=("thumb-box");
    para03.classList=("thumb-box-outer");
    para04.classList=("thumb-box-inner");
    _canvas.classList=("thumb");
    _canvas.style.width=("224");
    _canvas.style.height=("224");
    _canvas.id=ex_name[i]+"-thumb";
    _button.id=ex_name[i];
    _button.classList.add("record-button");
    _span01.id=ex_name[i]+"-total";

    var element = document.getElementById("joystick");
    para.appendChild(para01);
    element.appendChild(para);
    para.appendChild(para01);
    para01.appendChild(para02);
    para02.appendChild(para03);
    para03.appendChild(para04);
    para04.appendChild(_canvas);
    para03.appendChild(_button);
    _button.appendChild(_span);
    _span.appendChild(_txt);
    para02.appendChild(para05);
    para05.appendChild(_span01);
    _span01.appendChild(_txt01);
    para05.appendChild(_txt02);

  document.getElementById(CONTROLS[i+8]).addEventListener('mousedown', () => handler(i+8));
  document.getElementById(CONTROLS[i+8]).addEventListener('mouseup', () => mouseDown = false);
    
  }
}
export function init() {
  document.getElementById('controller').style.display = '';
  statusElement.style.display = 'none';
}

const trainStatusElement = document.getElementById('train-status');

// Set hyper params from UI values.
const learningRateElement = document.getElementById('learningRate');
export const getLearningRate = () => +learningRateElement.value;

const batchSizeFractionElement = document.getElementById('batchSizeFraction');
export const getBatchSizeFraction = () => +batchSizeFractionElement.value;

const epochsElement = document.getElementById('epochs');
export const getEpochs = () => +epochsElement.value;

const denseUnitsElement = document.getElementById('dense-units');
export const getDenseUnits = () => +denseUnitsElement.value;
const statusElement = document.getElementById('status');

export function startPacman() {
  //google.pacman.startGameplay();
}

export function predictClass(classId) {
  //google.pacman.keyPressed(CONTROL_CODES[classId]);
  document.body.setAttribute('data-active', CONTROLS[classId]);
}

export function isPredicting() {
  statusElement.style.visibility = 'visible';
}
export function donePredicting() {
  statusElement.style.visibility = 'hidden';
}
export function trainStatus(status) {
  trainStatusElement.innerText = status;
}

export let addExampleHandler;
export function setExampleHandler(handler) {
  addExampleHandler = handler;
}
let mouseDown = false;
var totals = [0, 0, 0, 0, 0, 0,0,0];

const upButton = document.getElementById('up');
const downButton = document.getElementById('down');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const afterButton = document.getElementById('after');
const ex01Button = document.getElementById('ex01');

const thumbDisplayed = {};
export function sethandler(QQ){
  //var a=QQ.join('');
  //var b=parseInt(a, 10);
  handler(QQ);
}
async function handler(label) {
  mouseDown = true;
  const className = CONTROLS[label];
  const button = document.getElementById(className);
  const total = document.getElementById(className + '-total');
  while (mouseDown) {
    addExampleHandler(label);
    document.body.setAttribute('data-active', CONTROLS[label]);
    total.innerText = ++totals[label];
    await tf.nextFrame();
    mouseDown = false;
  }
  document.body.removeAttribute('data-active');
  
}

upButton.addEventListener('mousedown', () => handler(0));
upButton.addEventListener('mouseup', () => mouseDown = false);

downButton.addEventListener('mousedown', () => handler(1));
downButton.addEventListener('mouseup', () => mouseDown = false);

leftButton.addEventListener('mousedown', () => handler(2));
leftButton.addEventListener('mouseup', () => mouseDown = false);

rightButton.addEventListener('mousedown', () => handler(3));
rightButton.addEventListener('mouseup', () => mouseDown = false);

afterButton.addEventListener('mousedown', () => handler(4));
afterButton.addEventListener('mouseup', () => mouseDown = false);

ex01Button.addEventListener('mousedown', () => handler(5));
ex01Button.addEventListener('mouseup', () => mouseDown = false);

document.getElementById("ex02").addEventListener('mousedown', () => handler(6));
document.getElementById("ex02").addEventListener('mouseup', () => mouseDown = false);

document.getElementById("ex03").addEventListener('mousedown', () => handler(7));
document.getElementById("ex03").addEventListener('mouseup', () => mouseDown = false);

export function drawThumb(img, label) {
  if (thumbDisplayed[label] == null) {
    const thumbCanvas = document.getElementById(CONTROLS[label] + '-thumb');
    draw(img, thumbCanvas);
  }
}

export function draw(image, canvas) {
  const [width, height] = [224, 224];
  const ctx = canvas.getContext('2d');
  const imageData = new ImageData(width, height);
  const data = image.dataSync();
  for (let i = 0; i < height * width; ++i) {
    const j = i * 4;
    imageData.data[j + 0] = (data[i * 3 + 0] + 1) * 127;
    imageData.data[j + 1] = (data[i * 3 + 1] + 1) * 127;
    imageData.data[j + 2] = (data[i * 3 + 2] + 1) * 127;
    imageData.data[j + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
}
