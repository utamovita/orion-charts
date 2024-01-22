import { useReactToPrint } from "react-to-print";
import { Button } from "../shared/button/button.component";
import { PdfIcon } from "./assets/pdf-icon.component";
import { usePdfDispatch, usePdfState } from "src/context/pdf.context";
import styles from "./print-pdf.module.scss";

const PrintPDF = () => {
  const { ref } = usePdfState();
  const pdfDispatch = usePdfDispatch();

  const printPdf = useReactToPrint({
    content: () => ref!.current,
  })

  const handlePrint = () => {
    pdfDispatch({ type: "UPDATE_PRINT_VIEW", payload: { isPrintView: true } });
    
    setTimeout(() => {
      printPdf();
      pdfDispatch({ type: "UPDATE_PRINT_VIEW", payload: { isPrintView: false } });
    }, 500);
  }

  return (
    <div className={styles.wrapper}>
      <Button variant="primary" onClick={() => handlePrint()} className={styles.button}>
        Wygeneruj plik <PdfIcon />
      </Button>
    </div>
  );
};

export { PrintPDF };
