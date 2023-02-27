import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

function PdfDownloader({rootElementId, downloadFileName}) {

  const downloadPdfDocument = (isLibrary) => {
    if (isLibrary) {
      const pdf = new jsPDF({
        format: 'a4',
        unit: 'pt',
        orientation: 'portrait'
      });
      const elementId = rootElementId ? rootElementId : 'root';
      const printSrc = document.getElementById(elementId);
  
      const pdfWidth = pdf.internal.pageSize.width;
      const srcWidth = printSrc.scrollWidth;
      const margin = 18;
      const scaleFactor = (pdfWidth - margin * 2) / srcWidth;
  
      pdf.html(printSrc, {
        x: margin,
        y: margin,
        html2canvas: {
          useCORS: true,
          backgroundColor: "#000",
          scale: scaleFactor,
          ignoreElements: function(element) {
            if (element.classList.contains('no-print')) {
              return true;
            }
            return false;
          },
          svgRendering: true,
        },
        autoPaging: 'text',
        callback: async function(doc) {
          try {
            await doc.save(downloadFileName || 'game-report-' + new Date().toDateString());
            // window.open(doc.output('bloburl'));
          } catch (error) {
            console.error('error while downloading file');
          }
        },
      });
    } else {
      window.print();
    }
  }

  return (
    <button className="btn btn-primary btn-filled download-button no-print" onClick={() => downloadPdfDocument(true)}>
      <img src="/images/download_black.png" alt="Download Icon" />
      <span>Download Report</span>
    </button>
  );
}

export default PdfDownloader;