// FileConverterModal.tsx
import React, { useState } from "react";
import { UploadSection } from "./UploadSection";
import { DownloadSection } from "./DownloadSection";

const FileConverterModal: React.FC = () => {
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | undefined>(undefined);

  const handleFileConverted = (url: string | null) => {
    setConvertedFileUrl(url);
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-8 flex gap-8">
        <UploadSection
          onFileConverted={handleFileConverted}
          setFileName={setFileName}
        />
        <div className="w-0.5 bg-gray-300 self-stretch" />
        <DownloadSection
          convertedFileUrl={convertedFileUrl}
          fileName={fileName}
        />
      </div>
    </div>
  );
};

export default FileConverterModal;
