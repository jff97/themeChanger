//document.getElementById('textbox_id').value

function radioClick(type) {
   let customContainer = document.getElementById("customContainer");
   if (type === 3) {
      //unlock color inputs
      lockUnlockColors("unlock");
      //display the custom theme selections
      customContainer.style.display = "inline-block";
      //change the colors displayed in the color boxes as black colors
      changeColorInputs("#000000", "#000000", "#000000", "#000000");
   } else {
      //lock color inputs
      lockUnlockColors("lock");
      //hide custom theme selections
      customContainer.style.display = "none";
      let hex1 = "#FF0000", hex2 = "#FF0000", hex3 = "#FF0000", hex4 = "#FF0000";
      if (type === 1) {
         //TODO get the colors of default and put them into hex1-4
      } else if (type === 2) {
         //TODO get the colors of theme2 and put them into hex1-4
      }
      //change the colors displayed in the color boxes as default 1 colors
      changeColorInputs(hex1, hex2, hex3, hex4);
   }
}

function changeColorInputs(hex1, hex2, hex3, hex4) {
   let clrInput1 = document.getElementById("clrInput1");
   let clrInput2 = document.getElementById("clrInput2");
   let clrInput3 = document.getElementById("clrInput3");
   let clrInput4 = document.getElementById("clrInput4");
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
   //
}
function initializeThemes() {
   //initialize a theme object with a name and 4 colors
}

//make a theme object with a name and 4 colors