//Theme object holds the 4 hex codes as strings in the format "#rrggbb"
class Theme {
   constructor(h1, h2, h3, h4) {
      this.hex1 = h1;
      this.hex2 = h2;
      this.hex3 = h3;
      this.hex4 = h4;
   }
}
//These 4 lines run on page load
//The variables are global scope
var defaultTheme1 = null;
var defaultTheme2 = null;
var customTheme = null;
initializeThemes();

//This function is the main flow of the program.
//It handles when a user clicks on any of the three radio theme buttons
//parameters: type is a number indicating which of the three radio buttons was clicked
function radioClick(type) {
   let customContainer = document.getElementById("customContainer");
   if (type === 3) {
      //unlock color inputs
      lockUnlockColors("unlock");
      //change the colors displayed in the color boxes to the customTheme colors
      changeColorInputs(customTheme.hex1, customTheme.hex2, customTheme.hex3, customTheme.hex4);
   } else {
      //lock color inputs
      lockUnlockColors("lock");
      if (type === 1) {
         //TODO get the colors of default theme 1 and put them into hex1-4
         changeColorInputs(defaultTheme1.hex1, defaultTheme1.hex2, defaultTheme1.hex3, defaultTheme1.hex4);
      } else if (type === 2) {
         //TODO get the colors of default theme 2 and put them into hex1-4
         changeColorInputs(defaultTheme2.hex1, defaultTheme2.hex2, defaultTheme2.hex3, defaultTheme2.hex4);
      }
   }
}

//this function updates the color displayed in the color input form boxes
//parameters: hex code strings of the format "#rrggbb"
function changeColorInputs(hex1, hex2, hex3, hex4) {
   //get all the color input elements
   let clrInput1 = document.getElementById("clrInput1");
   let clrInput2 = document.getElementById("clrInput2");
   let clrInput3 = document.getElementById("clrInput3");
   let clrInput4 = document.getElementById("clrInput4");
   //set their color value to the parameters passed in
   clrInput1.value = hex1;
   clrInput2.value = hex2;
   clrInput3.value = hex3;
   clrInput4.value = hex4;
}
function lockUnlockColors(type) {
   let clrInput1 = document.getElementById("clrInput1");
   let clrInput2 = document.getElementById("clrInput2");
   let clrInput3 = document.getElementById("clrInput3");
   let clrInput4 = document.getElementById("clrInput4");
   if (type === "lock") {
      //lock the color inputs
      clrInput1.disabled = true;
      clrInput2.disabled = true;
      clrInput3.disabled = true;
      clrInput4.disabled = true;
   } else if (type === "unlock") {
      //unlock the color inputs
      clrInput1.disabled = false;
      clrInput2.disabled = false;
      clrInput3.disabled = false;
      clrInput4.disabled = false;
   }
}
function applyCustomColors() {
   let clrInput1 = document.getElementById("clrInput1").value;
   let clrInput2 = document.getElementById("clrInput2").value;
   let clrInput3 = document.getElementById("clrInput3").value;
   let clrInput4 = document.getElementById("clrInput4").value;
}
function initializeThemes() {
   //initialize a theme object with a name and 4 colors
   let root = document.querySelector(':root');
   let rootStyle = getComputedStyle(root);

   let color1 = rootStyle.getPropertyValue('--color1');
   let color2 = rootStyle.getPropertyValue('--color2');
   let color3 = rootStyle.getPropertyValue('--color3');
   let color4 = rootStyle.getPropertyValue('--color4');
   defaultTheme1 = new Theme(color1, color2, color3, color4);
   defaultTheme2 = new Theme("#D9B626", "#26D9B6", "#B626D9", "#FFFFFF");
   customTheme = new Theme(color1, color2, color3, color4);

   //r.style.setProperty('--blue', 'lightblue');
}
