const valueInput = document.getElementById("valueInput");
const conversionType = document.getElementById("conversionType");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");


/* Kilometers to Miles */
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

function performConversion() {
  const value = Number(valueInput.value);

  /* Clear result if input is empty or invalid */
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
      result.textContent = "";
      return;
  }

  /* Display formatted output */
  result.textContent = `${value} ${fromUnit} = ${convertedValue.toFixed(2)} ${toUnit}`;
}

/* Convert button (still works) */
convertBtn.addEventListener("click", performConversion);

/* Live conversion while typing */
valueInput.addEventListener("input", performConversion);

/* Live conversion when unit changes */
conversionType.addEventListener("change", performConversion);
