const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.getElementById("input");
const resultInput = document.getElementById("result");

// Only allowing certain keys to be clicked
const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];

// Setting buttons values to the input
document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", function () {
    const value = charKeyBtn.dataset.value;
    input.value += value;
  });
});

// Setting Clear button
document.getElementById("clear").addEventListener("click", function () {
  input.value = "";
  input.focus();
});

// Setting Equal button
document.getElementById("equal").addEventListener("click", calculate);

// Setting keyboard typing function
input.addEventListener("keydown", function (ev) {
  ev.preventDefault(); // dont allowing all keys

  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key;
    return;
  }

  // adding backspace
  if (ev.key === "Backspace" || ev.key === "Delete") {
    input.value = input.value.slice(0, -1);
  }

  // adding enter key
  if (ev.key === "Enter") {
    calculate();
  }
});

// calculate function
function calculate() {
  const result = eval(input.value);
  resultInput.value = result;
}

// Setting copy to clipboard function
document
  .getElementById("copyToClipboard")
  .addEventListener("click", function (ev) {
    const button = ev.currentTarget;
    if (button.innerText === "Copy") {
      button.innerText = "Copied!";
      button.classList.add("success");
      navigator.clipboard.writeText(resultInput.value);
    } else {
      button.innerText = "Copy";
      button.classList.remove("success");
    }
  });

// Setting theme switcher
document.getElementById("themeSwitcher").addEventListener("click", function () {
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--primary-color", "#26834a");
    main.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#4dff91");
    main.dataset.theme = "dark";
  }
});
