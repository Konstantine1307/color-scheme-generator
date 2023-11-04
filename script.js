document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const colorPicker = document.getElementById('color-picker');
  const colorValue = document.getElementById('color-value');
  const schemeSelect = document.getElementById('scheme-select');
  const getSchemeButton = document.getElementById('get-scheme-button');
  const colorSchemeContainer = document.getElementById('color-scheme');

  // Initialize colorValue content
  colorValue.textContent = colorPicker.value;

  // Event listeners
  colorPicker.addEventListener('input', updateColorValueAndBorderColor);
  colorValue.addEventListener('click', copyColorValueToClipboard);
  getSchemeButton.addEventListener('click', fetchColorScheme);
  getSchemeButton.addEventListener('click', fetchColorName);

  // Function to update color value and border color
  function updateColorValueAndBorderColor() {
    const selectedColor = colorPicker.value;
    colorValue.textContent = selectedColor;
    changeBorderColor(selectedColor);
  }

  // Function to copy color value to clipboard
  function copyColorValueToClipboard() {
    const selectedColor = colorPicker.value;
    copyToClipboard(selectedColor);
  }

  // Function to change border color of specified elements
  function changeBorderColor(color) {
    const elementsToUpdate = [
      colorValue,
      getSchemeButton,
      schemeSelect,
      colorPicker,
    ];
    elementsToUpdate.forEach((element) => {
      element.style.borderColor = color;
    });
  }

 // Function to fetch and display color name
function fetchColorName() {
  const selectedColor = colorPicker.value;
  const apiUrl = `https://www.thecolorapi.com/id?hex=${selectedColor.replace('#', '')}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const colorName = data.name.value;
      console.log(colorName);
      displayColorName(colorName);
    })
    .catch((error) => {
      console.error('Error fetching color name information:', error);
    });
}

// Function to display the color name
function displayColorName(name) {
  const colorNameContainer = document.getElementById("color-name-container");
  colorNameContainer.textContent = name;
}

  
  

  // Function to fetch and display color scheme
  function fetchColorScheme() {
    const selectedColor = colorPicker.value;
    const selectedScheme = schemeSelect.value;
    const apiUrl = `https://www.thecolorapi.com/scheme?hex=${selectedColor.replace(
      '#',
      ''
    )}&mode=${selectedScheme}&count=5`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const schemeColors = data.colors.map((color) => ({
          hex: color.hex.value,
          name: color.name.value,
        }));
        displayColorScheme(schemeColors);
      })
      .catch((error) => {
        console.error('Error fetching color scheme information:', error);
      });
  }

  // Function to display the color scheme
  function displayColorScheme(schemeColors) {
    colorSchemeContainer.innerHTML = '';
    schemeColors.forEach((color) => {
      const colorContainer = createColorContainer(color.hex, color.name);
      colorSchemeContainer.appendChild(colorContainer);
    });
  }

  // Function to create a color container
  function createColorContainer(hex, name) {
    const colorContainer = document.createElement('div');
    colorContainer.classList.add('color-container');

    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    colorBox.style.backgroundColor = hex;

    const hexValue = document.createElement('div');
    hexValue.classList.add('hex-value');
    hexValue.textContent = hex;

    const nameValue = document.createElement('div');
    nameValue.classList.add('name-value');
    nameValue.textContent = name;

    colorContainer.addEventListener('click', () => {
      copyToClipboard(hex);
    });

    colorContainer.appendChild(nameValue);
    colorContainer.appendChild(colorBox);
    colorContainer.appendChild(hexValue);

    return colorContainer;
  }

  // Function to copy text to clipboard
  function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard: ' + text);
  }
});
