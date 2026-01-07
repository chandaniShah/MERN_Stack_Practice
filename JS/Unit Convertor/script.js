const valueInput = document.getElementById("valueInput");
const conversionType = document.getElementById("conversionType");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");


function kmToMiles(value) {
  return value * 0.621371;
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

/* Conversion history */
let history = [];

function performConversion() {
  const value = Number(valueInput.value);

  if (!valueInput.value || value < 0) {
    result.textContent = "";
    return;
  }

  let convertedValue;
  let fromUnit = "";
  let toUnit = "";

  switch (conversionType.value) {
    case "kmToMiles":
      convertedValue = kmToMiles(value);
      fromUnit = "km";
      toUnit = "miles";
      break;

    case "mToFeet":
      convertedValue = metersToFeet(value);
      fromUnit = "meters";
      toUnit = "feet";
      break;

    case "cmToInches":
      convertedValue = cmToInches(value);
      fromUnit = "cm";
      toUnit = "inches";
      break;

    case "kgToPounds":
      convertedValue = kgToPounds(value);
      fromUnit = "kg";
      toUnit = "pounds";
      break;

    default:
      return;
  }

  const output = `${value} ${fromUnit} = ${convertedValue.toFixed(2)} ${toUnit}`;
  result.textContent = output;

  addToHistory(output);
}

function addToHistory(text) {
  history.unshift(text);

  if (history.length > 5) {
    history.pop();
  }

  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";

  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

clearHistoryBtn.addEventListener("click", () => {
  history = [];
  historyList.innerHTML = "";
});

convertBtn.addEventListener("click", performConversion);
valueInput.addEventListener("input", performConversion);
conversionType.addEventListener("change", performConversion);
