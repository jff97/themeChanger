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
var selectedTheme = "default1";
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
      changeColorInputs(customTheme);
      changeRootVars(customTheme);
      selectedTheme = "customTheme";
   } else {
      //lock color inputs
      lockUnlockColors("lock");
      if (type === 1) {
         //TODO get the colors of default theme 1 and put them into hex1-4
         changeColorInputs(defaultTheme1);
         changeRootVars(defaultTheme1)
         selectedTheme = "default1";
      } else if (type === 2) {
         //TODO get the colors of default theme 2 and put them into hex1-4
         changeColorInputs(defaultTheme2);
         changeRootVars(defaultTheme2);
         selectedTheme = "default2";
      }
   }
   //no matter what happens every time a radio button is clicked the selected theme needs to be updated
   setSelectedTheme();
   getAndUpdateSelectedTheme();
}

//this function updates the color displayed in the color input form boxes
//parameters: hex code strings of the format "#rrggbb"
function changeColorInputs(theme) {
   //get all the color input elements
   let clrInput1 = document.getElementById("clrInput1");
   let clrInput2 = document.getElementById("clrInput2");
   let clrInput3 = document.getElementById("clrInput3");
   let clrInput4 = document.getElementById("clrInput4");
   //set their color value to the parameters passed in
   clrInput1.value = theme.hex1;
   clrInput2.value = theme.hex2;
   clrInput3.value = theme.hex3;
   clrInput4.value = theme.hex4;
}
function changeRootVars(theme) {
   //get the root element
   let root = document.querySelector(':root');
   //set the values of the 4 root variables to the values in the passed in theme
   root.style.setProperty('--color1', theme.hex1);
   root.style.setProperty('--color2', theme.hex2);
   root.style.setProperty('--color3', theme.hex3);
   root.style.setProperty('--color4', theme.hex4);
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
function applyCustomColors(type) {
   //get the values of the 4 color inputs
   let clrInput1 = document.getElementById("clrInput1").value;
   let clrInput2 = document.getElementById("clrInput2").value;
   let clrInput3 = document.getElementById("clrInput3").value;
   let clrInput4 = document.getElementById("clrInput4").value;
   //change the values of the 4 hex codes in the global var
   customTheme.hex1 = clrInput1;
   customTheme.hex2 = clrInput2;
   customTheme.hex3 = clrInput3;
   customTheme.hex4 = clrInput4;
   changeRootVars(customTheme);
   //store the theme object in local storage
   setCustomTheme(customTheme);
}
function initializeThemes() {
   //get the root elements style
   let root = document.querySelector(':root');
   let rootStyle = getComputedStyle(root);
   //get all the values of the :root vars
   let color1 = rootStyle.getPropertyValue('--color1');
   let color2 = rootStyle.getPropertyValue('--color2');
   let color3 = rootStyle.getPropertyValue('--color3');
   let color4 = rootStyle.getPropertyValue('--color4');
   getAndUpdateSelectedTheme();
   if (customTheme == null) {
      //then the user does not have a theme in their local storage so use the default 1 colors
      customTheme = new Theme(color1, color2, color3, color4);
      //store the custom theme in local storage
      setCustomTheme(customTheme);
   }
   //If the user does not have a selection in local storage make one
   if (selectedTheme == null) {
      selectedTheme = "default1";
      setSelectedTheme();
   }
   //instantiate the default1 theme object
   defaultTheme1 = new Theme(color1, color2, color3, color4);
   
   //set all the colors for default2 theme
   color1 = "#D9B626";
   color2 = "#26D9B6";
   color3 = "#B626D9";
   color4 = "#FFFFFF";
   //instantiate the default2 theme object
   defaultTheme2 = new Theme(color1, color2, color3, color4);

   
   if (selectedTheme === "default1") {
      //update the colors displayed in the color inputs
      changeColorInputs(defaultTheme1);
   } else if (selectedTheme === "default2") {
      //update the colors displayed in the color inputs
      changeColorInputs(defaultTheme2);
   } else if (selectedTheme === "customTheme") {
      getAndUpdateCustomTheme();
      changeColorInputs(customTheme);
      lockUnlockColors("unlock");
   }
   updateRadioButtons();
}
function setCustomTheme(themeObj) {
   if (typeof(Storage) !== "undefined") {
      //go ahead with local storage code
      localStorage.setItem("customTheme", JSON.stringify(themeObj));
   } else {
      //no local storage supported
   }
} 
function getAndUpdateCustomTheme() {
   if (typeof(Storage) !== "undefined") {
      //go ahead with local storage code
      customTheme = JSON.parse(localStorage.getItem("customTheme"));
   } else {
      //no local storage supported
   }
}
function setSelectedTheme() {
   if (selectedTheme === "default1") {
      localStorage.setItem("selection", "default1");
   } else if (selectedTheme === "default2") {
      localStorage.setItem("selection", "default2");
   } else if (selectedTheme === "customTheme") {
      localStorage.setItem("selection", "customTheme");
   } else {
      localStorage.setItem("selection", "test");
   }
}
function getAndUpdateSelectedTheme() {
   selectedTheme = localStorage.getItem("selection");
}
function updateRadioButtons() {
   let radioButton = null;
   if (selectedTheme === "default1") {
      radioButton = document.getElementById("default1");
   } else if (selectedTheme === "default2") {
      radioButton = document.getElementById("default2");
   } else if (selectedTheme === "customTheme") {
      radioButton = document.getElementById("customTheme");
   } else {
      radioButton = document.getElementById("default1");
   }
   radioButton.checked = true;
}


