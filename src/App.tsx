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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function App() {
  return (
    <DataProvider>
      <Layout>
        <FileUploader />
        <Charts />
      </Layout>
    </DataProvider>
  );
}

export default App;
