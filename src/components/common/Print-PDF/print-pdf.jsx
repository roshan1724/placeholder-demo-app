import React, { Fragment, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import {
  PRINT_PAGE_NAMES,
  PRINT_PREVIEW_CONTAINER,
} from "../../../utilities/constants";
// import useQueryParams from "../../../hooks/useQueryParams";
// import AppService from "../../../utilities/app-service";
import ReportPdf from "./Report-PDF/Report-pdf";

function PrintPDF() {
  const { pageName } = useParams();
  // const query = useQueryParams();
  const [processing, setProcessing] = useState(false);

  // const downloadFileName = query.get("fileName");
  const pdfElement = document.getElementById(PRINT_PREVIEW_CONTAINER);
  let printableComponent = null;

  const handlePrint = () => {
    setProcessing(true);
    // USING BROWSER PRINT
    window.print();

    // USING PRINT LIBRARY
    // AppService.PrintService(
    //   PRINT_PREVIEW_CONTAINER,
    //   downloadFileName,
    //   (data) => {
    //     console.log("PRINT STATUS ==> ", data);
    //     window.close();
    //     setProcessing(false);
    //   }
    // );
  };

  if (pageName === PRINT_PAGE_NAMES.REPORT) {
    const props = {
      onPrint: handlePrint,
      processingState: processing,
    };
    printableComponent = React.createElement(ReportPdf, props);
  }

  const portal = createPortal(printableComponent, pdfElement);

  return <Fragment>{portal}</Fragment>;
}

export default PrintPDF;
