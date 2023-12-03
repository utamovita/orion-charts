import { useRef, useState } from "react";
import Papa from "papaparse";
import cx from "classnames";
import { useData } from "../../hooks/useData.hook";
import styles from "./file-uploader.module.scss";

const FileUploader = () => {
  const { handleData, validateData } = useData();
  const [error, setError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropContainerRef = useRef<HTMLLabelElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    handleFileChange(null, e.dataTransfer.files[0]);
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement> | null,
    file?: any
  ) => {
    if (e !== null || file) {
      try {
        let currentFile = null;

        if (file) {
          currentFile = file;
        } else {
          currentFile = e!.target.files![0];
        }

        const fileUrl = URL.createObjectURL(currentFile);
        const response = await fetch(fileUrl);
        const text = await response.text();

        Papa.parse(text, {
          complete: (result: any) => {
            const error = validateData(result.data);

            if (error === null) {
              handleData(result.data);
            }

            return setError(error);
          },
          header: false,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <label
        htmlFor="file"
        className={cx(styles.dropContainer, {
          [styles.dragActive]: isDragActive,
        })}
        ref={dropContainerRef}
        onDragOver={(e) => {
          e.preventDefault(), false;
        }}
        onDragEnter={() => setIsDragActive(true)}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={handleDrop}
      >
        <span className={styles.dropTitle}>Upuść pliki tutaj</span>
        lub
        <input
          type="file"
          accept=".csv"
          className={styles.input}
          id="file"
          onChange={handleFileChange}
          ref={inputRef}
        />
      </label>
      {error ? <p className={styles.error}>{error}</p> : null}
    </>
  );
};

export { FileUploader };
