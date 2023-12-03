"use client";

import React, { useState } from "react";
import { FileUploader } from "../file-uploader/file-uploader.component";

const FileDisplayer = () => {
  const [data, setData] = useState<string[][]>([]);

  const headers = data[0];
  const rows = data.slice(1);

  // console.log(data);
  return (
    <div>
      
      <table>
        <thead>
          <tr>
            {headers?.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((rowData, i) => {
            return (
              <tr key={i}>
                {rowData?.map((data, i) => {
                  return <td key={i}>{data}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FileDisplayer;
