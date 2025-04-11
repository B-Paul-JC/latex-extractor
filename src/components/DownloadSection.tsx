// DownloadSection.tsx
import React from "react";
import { FaDownload } from "react-icons/fa";

interface DownloadSectionProps {
  convertedFileUrl: string | null;
  fileName: string | undefined;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  convertedFileUrl,
  fileName,
}) => (
  <div className="flex-1 flex flex-col items-center">
    <div className="flex items-center gap-2 mb-6">
      <FaDownload className="text-blue-600 text-2xl" />
      <h3 className="text-xl font-bold text-gray-800">Download</h3>
    </div>

    <div className="flex-1 flex items-center justify-center w-full">
      {convertedFileUrl ? (
        <div className="text-center">
          <a
            href={convertedFileUrl}
            download={`Converted_${fileName}`}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 hover:bg-green-200 transition-colors">
              <FaDownload className="text-green-500 text-4xl" />
            </div>
            <span className="inline-block py-2 px-4 text-green-800 font-bold rounded-lg">
              Download Ready!
              <br />
              {fileName?.replace(/\.[^/.]+$/, "")} has been converted!
            </span>
          </a>
        </div>
      ) : (
        <div className="text-center grid items-center">
          <div className="h-28 w-28 m-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <FaDownload className="text-gray-500 text-4xl" />
          </div>
          <span className="inline-block py-2 px-4 text-gray-500 rounded-lg">
            No file to download
          </span>
        </div>
      )}
    </div>
  </div>
);
