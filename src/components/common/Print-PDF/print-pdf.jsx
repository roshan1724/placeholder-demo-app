import React, { Fragment, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useParams } from 'react-router-dom';
import { PRINT_PAGE_NAMES, PRINT_PREVIEW_CONTAINER } from '../../../utilities/constants';
import { PrintService } from '../../../utilities/app-service';
import ReportPdf from './Report-PDF/Report-pdf';

function PrintPDF() {
  const { pageName } = useParams();
  const { search } = useLocation();
  const [processing, setProcessing] = useState(false);

  const searchParams = new URLSearchParams(search);
  const downloadFileName = searchParams.get('fileName');  
  const pdfElement = document.getElementById(PRINT_PREVIEW_CONTAINER);
  let printableComponent = null;
  
  const handlePrint = () => {
    setProcessing(true);
    // window.print();
    PrintService(PRINT_PREVIEW_CONTAINER, downloadFileName, (data) => {
      console.log('PRINT STATUS ==> ', data);
      window.close();
      setProcessing(false);
    });
  }

  if (pageName === PRINT_PAGE_NAMES.REPORT) {
    const props = {
      onPrint: handlePrint,
      processingState: processing
    };
    printableComponent = React.createElement(ReportPdf, props);
  }

  const portal = createPortal(printableComponent, pdfElement);

  return (
    <Fragment>
      {
        portal
      }
    </Fragment>
  );
}

export default PrintPDF;