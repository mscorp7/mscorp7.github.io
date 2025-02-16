const textarea = document.getElementById('inputText');
const canvas = document.getElementById('handwritingCanvas');
const ctx = canvas.getContext('2d');
const generateButton = document.getElementById('generateButton');
const downloadButton = document.getElementById('downloadButton');
const resetButton = document.getElementById('resetButton');
const fontSelector = document.getElementById('fontSelector');
const colorPicker = document.getElementById('colorPicker');
const fontSizeSlider = document.getElementById('fontSize');

let fontSize = parseInt(fontSizeSlider.value, 10);

// Load font dynamically
const loadFont = (fontName, fontUrl) => {
    const font = new FontFace(fontName, `url(${fontUrl})`);
    return font.load().then(() => document.fonts.add(font));
};

let currentFont = 'handwr.ttf';
loadFont('Handwriting', currentFont);

fontSelector.addEventListener('change', (event) => {
    currentFont = event.target.value;
    loadFont('Handwriting', currentFont);
});

fontSizeSlider.addEventListener('input', (event) => {
    fontSize = parseInt(event.target.value, 10);
});

// Function to split text into lines with a maximum of 30 characters per line
const splitTextIntoLines = (text, maxCharsPerLine) => {
    const lines = [];
    for (let i = 0; i < text.length; i += maxCharsPerLine) {
        lines.push(text.slice(i, i + maxCharsPerLine));
    }
    return lines;
};

generateButton.addEventListener('click', () => {
    const text = textarea.value;
    const lines = splitTextIntoLines(text, 30);

    // Calculate the required height for the canvas based on text
    const requiredHeight = lines.length * (fontSize + 10) + 20; // Adding a margin

    // Adjust the canvas height dynamically
    canvas.height = requiredHeight;

    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set font and color
    ctx.font = `${fontSize}px Handwriting`;
    ctx.fillStyle = colorPicker.value;

    // Draw each line with jitter
    const jitter = (value) => value + Math.random() * 2 - 1;

    lines.forEach((line, index) => {
        ctx.fillText(line, jitter(20), jitter(50 + index * (fontSize + 10)));
    });
});

downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'handwriting.png';
    link.href = canvas.toDataURL();
    link.click();
});

resetButton.addEventListener('click', () => {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Clear the text input
    textarea.value = '';
});