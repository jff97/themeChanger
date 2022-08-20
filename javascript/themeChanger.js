//document.getElementById('textbox_id').value

function radioClick(type) {
   let customContainer = document.getElementById("customContainer");
   if (type == 1) {
      //do default1 stuff
      customContainer.style.display = "none";
      //change the colors displayed in the color boxes as default 1 colors
   } else if (type == 2) {
      //do default2 stuff
      customContainer.style.display = "none";
      //change the colors displayed in the color boxes as default 2 colors
   } else if (type == 3) {
      //do custom stuff
      customContainer.style.display = "inline-block";
      //change the colors displayed in the color boxes as black colors
   }
}

function initializeThemes() {
   //initialize a theme object with a name and 4 colors
}

//make a theme object with a name and 4 colors