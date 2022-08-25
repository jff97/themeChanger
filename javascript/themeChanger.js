/**
 * @file Manages the color picker storage and manipulation
 * author John Fox
 */

/**
 * Theme object holds the 4 hex codes as strings in the format "#rrggbb"
 */
class Theme {
   /**
    * @constructor
    * sets the 4 hex values making up a theme
    * @param {string} h1 
    * @param {string} h2 
    * @param {string} h3 
    * @param {string} h4 
    */
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

//////////////////////////////////////////////////////////////
//Here starts the functions responsible for the main flow of the program aka non helper functions

/**
 * This is the main flow of the program after initilization
 * @param {string} type represents which radio button was clicked
 */
function radioClick(type) {
   if (type === 'customTheme') {
      //unlock color inputs
      lockUnlockColors("unlock");
      //change the colors displayed in the color boxes to the customTheme colors
      updateColorInputs(customTheme);
      //update the actual css color vars
      updateRootVars(customTheme);
      //update the gobal theme selection var
      selectedTheme = "customTheme";
   } else {
      //lock color inputs for both default1 and default2
      lockUnlockColors("lock");
      if (type === 'default1') {
         //TODO get the colors of default theme 1 and put them into hex1-4
         updateColorInputs(defaultTheme1);
         //update the actual css color vars
         updateRootVars(defaultTheme1);
         //update the gobal theme selection var
         selectedTheme = "default1";
      } else if (type === 'default2') {
         //TODO get the colors of default theme 2 and put them into hex1-4
         updateColorInputs(defaultTheme2);
         //update the actual css color vars
         updateRootVars(defaultTheme2);
         //update the gobal theme selection var
         selectedTheme = "default2";
      }
   }
   //these 2 lines need to be executed no matter what type of radio button is clicked
   setSelectedTheme();
   getAndUpdateSelectedTheme();
}

/**
 * This is the second main flow of the program
 * Gets called whenever a color in a color input element gets changed
 */
 function applyCustomColors() {
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
   //update the style of the document
   updateRootVars(customTheme);
   //store the theme object in local storage
   setCustomTheme(customTheme);
   //change the selected theme in local storage and global vars
   selectedTheme = "customTheme";
   getAndUpdateSelectedTheme();
}

/**
 * This runs on startup and handles allot of stuff relating to the saved theme and selection
 * this is also a main flow of the program
 */
function initializeThemes() {
   //
   //Start initilization section
   //get the root elements style
   let root = document.querySelector(':root');
   let rootStyle = getComputedStyle(root);
   //get all the values of the :root vars
   let color1 = rootStyle.getPropertyValue('--color1');
   let color2 = rootStyle.getPropertyValue('--color2');
   let color3 = rootStyle.getPropertyValue('--color3');
   let color4 = rootStyle.getPropertyValue('--color4');
   getAndUpdateSelectedTheme();
   getCustomTheme();
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
   //
   //End initilization section

   //
   //start update document section
   if (selectedTheme === "default1") {
      //update the colors displayed in the color inputs
      updateColorInputs(defaultTheme1);
      updateRootVars(defaultTheme1);
   } else if (selectedTheme === "default2") {
      //update the colors displayed in the color inputs
      updateColorInputs(defaultTheme2);
      updateRootVars(defaultTheme2);
   } else if (selectedTheme === "customTheme") {
      getCustomTheme();
      updateColorInputs(customTheme);
      updateRootVars(customTheme);
      lockUnlockColors("unlock");
   }
   updateRadioButtons();
   //
   //end update document section
}

//////////////////////////////////////////////////////////////
//Here ends the functions responsible for the main flow of the program aka non helper functions

//////////////////////////////////////////////////////////////
//Here starts the helper functions responsible for doing small tasks within the main flow of the program

/**
 * Changes the html value of the color input form boxes this is a functional value and a display value
 * @param {Theme} theme contains the hex values to change the color inputs to the
 * the values of the hex codes are of the format "#rrggbb"
 */
function updateColorInputs(theme) {
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

/**
 * Updates the html to have the right radio button checked
 */
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

/**
 * Changes the actual style of the document by manipulating the style of the :root element
 * @param {Theme} theme contains the hex values to set the root vars values to
 */
function updateRootVars(theme) {
   //get the root element
   let root = document.querySelector(':root');
   //set the values of the 4 root variables to the values in the passed in theme
   root.style.setProperty('--color1', theme.hex1);
   root.style.setProperty('--color2', theme.hex2);
   root.style.setProperty('--color3', theme.hex3);
   root.style.setProperty('--color4', theme.hex4);
}

/**
 * locks and unlocks the html color inputs
 * @param {string} type indicates whether the function should lock or unlock the html color input elements
 */
function lockUnlockColors(type) {
   //get the color input elements
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

//////////////////////////////////////////////////////////////
//Here ends the helper functions responsible for doing small tasks within the main flow of the program

//////////////////////////////////////////////////////////////
//Here Starts the functions to deal with local storage

function setCustomTheme(themeObj) {
   if (typeof(Storage) !== "undefined") {
      //go ahead with local storage code
      localStorage.setItem("customTheme", JSON.stringify(themeObj));
   } else {
      //no local storage supported
   }
} 
function getCustomTheme() {
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

//////////////////////////////////////////////////////////////
//Here ends the functions to deal with local storage