import jsPDF from "jspdf";

const PrintService = (elementId, fileName, printCallback) => {
  const pdfElement = document.getElementById(elementId);
  const pdf = new jsPDF({
      format: 'a4',
      unit: 'pt',
      orientation: 'portrait'
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
        ignoreElements: function(element) {
          if (element.classList.contains('no-print')) {
            return true;
          }
          return false;
        },
      },
      callback: async (doc) => {
        try {
          await doc.save(fileName || 'file-' + new Date().toDateString());
          // const pdfUrlWindow = window.open(doc.output('bloburl'));
          printCallback({
            printState: 'Success'
          });
        } catch (error) {
          printCallback({
            printState: 'Error'
          });
        }
      }
    });
}

export default PrintService;