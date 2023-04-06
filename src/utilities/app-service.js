import jsPDF from "jspdf";

const PrintService = (elementId, fileName, printCallback) => {
  const pdfElement = document.getElementById(elementId);
  const pdf = new jsPDF({
    format: "a4",
    unit: "pt",
    orientation: "portrait",
  });

  const pdfWidth = pdf.internal.pageSize.width;
  const srcWidth = pdfElement.scrollWidth;
  const margin = 18;
  const scaleFactor = (pdfWidth - margin * 2) / srcWidth;

  pdf.html(pdfElement, {
    x: margin,
    y: margin,
    html2canvas: {
      useCORS: true,
      scale: scaleFactor,
      svgRendering: true,
      ignoreElements: function (element) {
        if (element.classList.contains("no-print")) {
          return true;
        }
        return false;
      },
    },
    callback: async (doc) => {
      try {
        await doc.save(fileName || "file-" + new Date().toDateString());
        // const pdfUrlWindow = window.open(doc.output("bloburl"));
        printCallback({
          printState: "Success",
        });
      } catch (error) {
        printCallback({
          printState: "Error",
        });
      }
    },
  });
};

/**
 * TODO: Enhance this function - Potential to be used in app
 * Function to merge form Data vlaues
 * @param {Object} formValues  - Actual Initial Form Values
 * @param {Object} savedFormValues  - Data with which Form Values need to be updated
 * @returns {Object} updated form Values
 */
const mergeFormValues = (formValues, savedFormValues, mergeRuleFunc) => {
  [
    ...new Set([...Object.keys(formValues), ...Object.keys(savedFormValues)]),
  ].reduce(
    (acc, key) => ({
      ...acc,
      [key]: mergeRuleFunc(key, formValues[key], savedFormValues[key]),
    }),
    {}
  );

  // Example
  // mergeFormValues(
  //   { a: true, b: { c: [1, 2, 3] } },
  //   { a: false, b: { d: [1, 2, 3] } },
  //   (key, a, b) => (key === "a" ? a && b : Object.assign({}, a, b))
  // );
  //
  // Output: { a: false, b: { c: [ 1, 2, 3 ], d: [ 1, 2, 3 ] } }
};

/**
 * Function to convert 24 hr time to 12 hr
 * @param {string} time24 - 24 hr time
 * @returns {string} - Time in 12 hr time
 */
const ConvertTime_24_to_12 = (time24) => {
  let time = time24
    .toString()
    .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time24];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
    time[0] = time[0] < 10 ? "0" + time[0] : time[0];
  }
  return time.join(""); // return adjusted time or original string
};

const AppService = {
  PrintService,
  mergeFormValues,
  ConvertTime_24_to_12,
};

export default AppService;
