import { useState } from "react";
import { PRINT_PAGE_NAMES, ROUTE_PATHS } from "../../../utilities/constants";
import { useSelector } from "react-redux";

function PdfDownloader({ isComponent, downloadFileName, isDisabled }) {
  const [processing, setProcessing] = useState(false);
  const reportToPrint = useSelector(
    (state) => state.gameReport.printableReport
  );

  const downloadPdfDocument = () => {
    if (isComponent) {
      setProcessing(true);
      const windowFeatures =
        "fullscreen=no,location=no,menubar=no,scrollbars=yes,status=no,titlebar=no,toolbar=no,width=1000,height=1000";
      // TODO: Send the active report type to download in the URL
      const url = `${window.location.origin}${ROUTE_PATHS.PRINT}/${
        PRINT_PAGE_NAMES.REPORT
      }?report_type=${reportToPrint}&fileName=${
        downloadFileName || "game-report-" + new Date().toDateString()
      }`;
      const tempWindow = window.open(url, "_blank", windowFeatures);

      setTimeout(() => {
        tempWindow.addEventListener("afterprint", (event) => {});
        tempWindow.onafterprint = () => {
          console.log("After Printing");
          tempWindow.close();
          setProcessing(false);
        };

        // This EVENT is not reliable for mobile devices
        // TODO: Can update to "visibilitychange" or "pagehide" events
        tempWindow.addEventListener("unload", () => {});
        tempWindow.onunload = () => {
          setProcessing(false);
        };
      }, 2000);
    } else {
    }
  };

  return (
    <button
      className="btn btn-primary btn-filled download-button no-print"
      disabled={isDisabled}
      onClick={() => downloadPdfDocument()}
    >
      <span className="icon-wrapper me-2">
        <i
          className={`fa-solid ${
            processing ? "fa-circle-notch fa-spin" : "fa-file-arrow-down"
          }`}
        ></i>
      </span>
      <span>{processing ? "Generating PDF..." : "Download Report"}</span>
    </button>
  );
}

export default PdfDownloader;
