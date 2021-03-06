import "./styles/index.css";
import Sidebar from "./scripts/sidebar/sidebar";
import sidebarData from "./scripts/util/sidebar_data";
import MyCanvas from "./scripts/canvas/canvas";

window.addEventListener("DOMContentLoaded", (main) => {

  const canvasElement = document.getElementById('myCanvas');
  const myCanvas = new MyCanvas(canvasElement);
  const ctx = canvasElement.getContext("2d");

  const sidebarElement = document.getElementById("section-content-sidebar");
  const sidebar = new Sidebar(
    sidebarData[0],
    sidebarElement,
    myCanvas.drawShapes
  );

  myCanvas.height = window.innerHeight;
  myCanvas.width = window.innerWidth;

   let modal = document.getElementById("myModal");
   let btn = document.getElementById("myBtn");
   let close = document.getElementsByClassName("close")[0];
   let startPlanningButton = document.getElementById("submit-dimension-button");
   let print = document.getElementById("print-file");

   print.onclick = function () {
     window.print();
   };

   btn.onclick = function () {
     modal.style.display = "block";
   };

   close.onclick = function () {
     modal.style.display = "none";
     let container = document.getElementById("konvaContainer");
     container.style.display = 'block';
   };

   startPlanningButton.onclick = function () {
     if (event.target === modal) {
       modal.style.display = "none";
     }
   };

   startPlanningButton.addEventListener("click", function defineRoom(event) {
     event.preventDefault();
     let feetHeight = document.getElementById("height-input-feet").value;
     let inchesHeight = document.getElementById("height-input-inches").value;
    //  if(inchesHeight="inches") inchesHeight = 1;
     let height = ((feetHeight * 6) + inchesHeight) * .5;
     let feetWidth = document.getElementById("width-input-feet").value;
     let inchesWidth = document.getElementById("width-input-inches").value;
    //  if(inchesWidth="inches") inchesWidth = 1;
     let width = ((feetWidth * 6) + inchesWidth) * .6;
    
     let container = document.getElementById("konvaContainer");
     container.style.display = 'block';

     ctx.strokeStyle = "black";
     ctx.lineWidth = 5;
     ctx.strokeRect(80, 80, width, height);

     ctx.font = "18px Lato";
     ctx.fillStyle = "steelblue"
     ctx.fillText(feetWidth+"'"+inchesWidth+"''", 60+(width/2), 70);
     ctx.fillText(feetHeight+"'"+inchesHeight+"''", 20, 60+(height/2));
     modal.style.display = "none";
   })

   let closeTipsX = document.getElementById("instruction-container-close");
   let tipsContainer = document.getElementById("instruction-container");

   closeTipsX.onclick = function () {
     tipsContainer.style.display = "none"
   };

   let hamburgerMenuContainer = document.getElementById("modal-hamburger-menu-container");
   let hamburgerMenu = document.getElementById("hamburger-menu");
   let searchMenu = document.getElementById("header-icon-search");
   let hamburgerX = document.getElementById("close-hamburger-modal")
   let konvaContainer = document.getElementById("konvaContainer");

   searchMenu.onclick = function () {
     hamburgerMenuContainer.style.display = "flex";
     konvaContainer.style.display = "none";
     tipsContainer.style.display = "none";
     modal.style.display = "none";
   };

    hamburgerMenu.onclick = function () {
     hamburgerMenuContainer.style.display = "flex";
     konvaContainer.style.display = "none";
     tipsContainer.style.display = "none";
     modal.style.display = "none";
   };

   hamburgerX.onclick = function () {
     hamburgerMenuContainer.style.display = "none"
   };

   let openTipsBtn = document.getElementById("tips-open");

   openTipsBtn.onclick = function () {
     tipsContainer.style.display = "flex"
   };
  
    document.getElementById('delete-object-button').addEventListener('click', () => {
      const tr = MyCanvas.layer.find('Group').toArray().find(group => group.nodes()[0] === currentShape);
      group.destroy();
      currentShape.destroy();
      MyCanvas.layer.draw();
   });
});