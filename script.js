let codeVisible = true;
let editor; // CodeMirror editor instance

// init code editor and run code
window.onload = function () {
  initCodeEditor();
  runCode();
};

// init code editor
function initCodeEditor() {
  const textArea = document.getElementById("code");
  editor = CodeMirror.fromTextArea(textArea, {
    mode: "javascript",
    theme: "github-dark",
    lineNumbers: true,
    lineWrapping: true,
    indentUnit: 2,
    tabSize: 2,
    autoCloseBrackets: true,
    matchBrackets: true,
  });

  editor.refresh();
}

function toggleCode() {
  const codeContainer = document.getElementById("codeContainer");
  const controlPanel = document.getElementById("controlPanel");
  const toggleButton = document.querySelector(".buttons button:last-child");

  codeVisible = !codeVisible;

  if (codeVisible) {
    codeContainer.style.display = "block";
    controlPanel.style.background = "transparent";
    toggleButton.textContent = "Hide Editor";
    setTimeout(() => editor.refresh(), 10);
  } else {
    codeContainer.style.display = "none";
    controlPanel.style.background = "transparent";
    controlPanel.style.padding = "10px";
    toggleButton.textContent = "Show Editor";
  }
}

function runCode() {
  const userCode = editor
    ? editor.getValue()
    : document.getElementById("code").value;

  const blob = new Blob(
    [
      `
      <html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"><\/script>
        <style>
          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          canvas {
            display: block;
          }
        </style>
      </head>
      <body>
        <script>
          ${userCode}
        <\/script>
      </body>
      </html>
    `,
    ],
    { type: "text/html" }
  );
  const url = URL.createObjectURL(blob);
  const iframe = document.getElementById("output");
  iframe.src = url;
}
