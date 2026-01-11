const valueInput = document.getElementById("valueInput");
const conversionType = document.getElementById("conversionType");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const swapBtn = document.getElementById("swapBtn");
const inputError = document.getElementById("inputError");
const precisionSelect = document.getElementById("precisionSelect");
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");

function kmToMiles(value) {
  return value * 0.621371;
}

function showToast() {
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1500);
}

/* Meters to Feet */
function metersToFeet(value) {
  return value * 3.28084;
}

/* Centimeters to Inches */
function cmToInches(value) {
  return value * 0.393701;
}

/* Kilograms to Pounds */
function kgToPounds(value) {
  return value * 2.20462;
}

function milesToKm(value) {
  return value / 0.621371;
}

function feetToMeters(value) {
  return value / 3.28084;
}

function inchesToCm(value) {
  return value / 0.393701;
}

function poundsToKg(value) {
  return value / 2.20462;
}

/* Conversion history */
let history = [];
let isSwapped = false; //controls swap direction
let lastHistoryEntry = "";
let precision = Number(precisionSelect.value);

function showInputError(message) {
  inputError.textContent = message;
  valueInput.classList.add("invalid", "shake");

  // Restart shake animation cleanly
  valueInput.addEventListener(
    "animationend",
    () => valueInput.classList.remove("shake"),
    { once: true }
  );
}

function clearInputError() {
  inputError.textContent = "";
  valueInput.classList.remove("invalid");
}

function performConversion() {
  // const value = Number(valueInput.value);

  // if (!valueInput.value || value < 0) {
  //   result.textContent = "";
  //   return;
  // }

  const rawValue = valueInput.value.trim();

  // Empty input  no error, no result
  if (rawValue === "") {
    clearInputError();
    result.textContent = "";
    return null;
  }

  const value = Number(rawValue);

  if (Number.isNaN(value)) {
    showInputError("Enter a valid number");
    result.textContent = "";
    return null;
  }

  if (value < 0) {
    showInputError("Value cannot be negative");
    result.textContent = "";
    return null;
  }

  clearInputError();


  let convertedValue;
  let fromUnit = "";
  let toUnit = "";

  switch (conversionType.value) {
    case "kmToMiles":
      convertedValue = isSwapped ? milesToKm(value) : kmToMiles(value);
      fromUnit = isSwapped ? "miles" : "km";
      toUnit = isSwapped ? "km" : "miles";
      break;

    case "mToFeet":
      convertedValue = isSwapped ? feetToMeters(value) : metersToFeet(value);
      fromUnit = isSwapped ? "feet" : "meters";
      toUnit = isSwapped ? "meters" : "feet";
      break;

    case "cmToInches":
      convertedValue = isSwapped ? inchesToCm(value) : cmToInches(value);
      fromUnit = isSwapped ? "inches" : "cm";
      toUnit = isSwapped ? "cm" : "inches";
      break;

    case "kgToPounds":
      convertedValue = isSwapped ? poundsToKg(value) : kgToPounds(value);
      fromUnit = isSwapped ? "pounds" : "kg";
      toUnit = isSwapped ? "kg" : "pounds";
      break;

    default:
      return;
  }
  // apply selected precision
  const output = `${value} ${fromUnit} = ${convertedValue.toFixed(precision)} ${toUnit}`;
  result.textContent = output;
  return output;
}

function commitToHistory(output) {
  if (output === lastHistoryEntry) return;

  const historyItem = {
    value: Number(valueInput.value),
    conversionType: conversionType.value,
    isSwapped,
    precision,
    output
  };

  history.unshift(historyItem);
  if (history.length > 5) history.pop();

  lastHistoryEntry = output;
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";

  history.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item.output;
    li.dataset.index = index; 
    li.style.cursor = "pointer";

    historyList.appendChild(li);
  });
}

function swapUnits() {
  if (!valueInput.value) return;

  isSwapped = !isSwapped; // only swap direction
  
  // Update dropdown label text
  const option = conversionType.selectedOptions[0];
  const text = option.textContent;
  const parts = text.split("→");

  if (parts.length === 2) {
    option.textContent = `${parts[1].trim()} → ${parts[0].trim()}`;
  }

  performConversion(true); // recompute using SAME input
}


clearHistoryBtn.addEventListener("click", () => {
  history = [];
  lastHistoryEntry = "";
  historyList.innerHTML = "";
});

convertBtn.addEventListener("click", () => {
  const output = performConversion();
  if (output) commitToHistory(output);
});

valueInput.addEventListener("input", () => performConversion());

conversionType.addEventListener("change", () => {
  isSwapped = false;
  syncConversionLabel(); // reset label
  performConversion(); 
});

swapBtn.addEventListener("click", () => {
  if (!valueInput.value) return;

  isSwapped = !isSwapped;
  
  syncConversionLabel(); // always sync label

  // const option = conversionType.selectedOptions[0];
  // const parts = option.textContent.split("→");
  // if (parts.length === 2) {
  //   option.textContent = `${parts[1].trim()} → ${parts[0].trim()}`;
  // }

  const output = performConversion();
  if (output) commitToHistory(output);
});

precisionSelect.addEventListener("change", () => {
  precision = Number(precisionSelect.value);
  performConversion(); // live update, no history spam
});

copyBtn.addEventListener("click", async () => {
  const text = result.textContent;
  if (!text) return;

  if (!navigator.clipboard) {
    console.warn("Clipboard API not supported");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    copyBtn.classList.add("copied");

    setTimeout(() => {
      copyBtn.classList.remove("copied");
    }, 1200);

    showToast();
  } catch (err) {
    console.error("Failed to copy:", err);
  }
});

// re-apply conversion on history click
historyList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const index = Number(li.dataset.index);
  const item = history[index];
  if (!item) return;

  // Restore raw state
  valueInput.value = item.value;
  conversionType.value = item.conversionType;
  isSwapped = item.isSwapped;
  precision = item.precision;
  precisionSelect.value = item.precision;

  // normalize label
  syncConversionLabel();

  // Preview only (no history write)
  performConversion();
});

// dropdown label state match 
function syncConversionLabel() {
  const option = conversionType.selectedOptions[0];
  const map = {
    kmToMiles: ["Kilometers", "Miles"],
    mToFeet: ["Meters", "Feet"],
    cmToInches: ["Centimeters", "Inches"],
    kgToPounds: ["Kilograms", "Pounds"]
  };

  const [from, to] = map[conversionType.value];

  option.textContent = isSwapped
    ? `${to} → ${from}`
    : `${from} → ${to}`;
}
