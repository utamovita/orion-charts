import "./styles/global.scss";

import { FileUploader } from "./components/file-uploader/file-uploader.component";
import { Layout } from "./components/layout/layout.component";
import { DataProvider } from "./context/data.context";
import { Charts } from "./components/charts/charts.component";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
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
