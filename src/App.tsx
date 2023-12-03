import "./styles/global.scss";

import FileDisplayer from "./components/file-displayer/file-displayer.component";
import { FileUploader } from "./components/file-uploader/file-uploader.component";
import { Layout } from "./components/layout/layout.component";

function App() {
  return (
    <Layout>
      <FileUploader />
      <FileDisplayer />
    </Layout>
  );
}

export default App;
