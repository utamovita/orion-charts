import "./styles/global.scss";

import { FileUploader } from "./components/file-uploader/file-uploader.component";
import { Layout } from "./components/layout/layout.component";
import { DataProvider } from "./context/data.context";
import { Charts } from "./components/charts/charts.component";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { CustomDateRangePicker } from "./components/shared/date-range-picker/date-range-picker.component";
import { Modal } from "./components/shared/modal/modal.component";
import { Suspense } from "react";
import { ModalProvider } from "./context/modal.context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

function App() {
  return (
    <DataProvider>
      <ModalProvider>
        <Layout>
          <Suspense fallback={null}>
            <Modal />
          </Suspense>
          <FileUploader />
          <Charts />
        </Layout>
      </ModalProvider>
    </DataProvider>
  );
}

export default App;
