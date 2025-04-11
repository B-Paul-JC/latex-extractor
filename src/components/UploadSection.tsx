import React, { useState, useEffect } from "react";
import { type ChangeEvent } from "react";
import { FaUpload } from "react-icons/fa";
import { usePromise } from "./usePromise";
import { LoadingBlocks } from "./LoadingBlocks";

interface UploadSectionProps {
  onFileConverted: (url: string | null, fileName?: string) => void;
  setFileName: (url: string | null, fileName?: string) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  onFileConverted,
  setFileName,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [blockHeights, setBlockHeights] = useState<number[]>([20, 20, 20, 20]);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [convertTrigger, setConvertTrigger] = useState<number>(0);

  const uploadFileToServer = async () => {
    if (convertTrigger) {
      if (!file) throw new Error("No file selected");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://converter.test/converter/server.php",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok)
        throw new Error("Server error: " + (await response.text()));

      const blob = await response.blob();
      return URL.createObjectURL(blob);
    }
    return "";
  };

  const {
    data: convertedFileUrl,
    loading: isConverting,
    error,
  } = usePromise<string>(uploadFileToServer, [convertTrigger]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name.replace(/\.[^/.]+$/, ".txt"));
      setIsComplete(false);
      setBlockHeights([20, 20, 20, 20]);
      setConvertTrigger(0);
    }
  };

  const handleConvert = () => {
    if (file) {
      setIsComplete(false);
      setBlockHeights([20, 20, 20, 20]);
      setConvertTrigger((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (isConverting && !isComplete) {
      const interval = setInterval(() => {
        setBlockHeights((prev) =>
          prev.map(() => Math.floor(Math.random() * 40) + 10)
        );
      }, 300);
      return () => clearInterval(interval);
    } else if (!isConverting && convertedFileUrl) {
      setIsComplete(true);
      setBlockHeights([40, 40, 40, 40]);
      // Pass the original filename without extension
      const fileNameWithoutExt = file
        ? file.name.replace(/\.[^/.]+$/, "")
        : undefined;
      onFileConverted(convertedFileUrl, fileNameWithoutExt);
    }
  }, [isConverting, isComplete, convertedFileUrl, onFileConverted, file]);

  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-6">
        <FaUpload className="text-blue-600 text-2xl" />
        <h3 className="text-xl font-bold text-gray-800">Upload</h3>
      </div>

      <div className="relative mb-6">
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center w-full px-4 py-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors min-h-[140px]"
        >
          <FaUpload className="text-gray-500 mr-2" />
          <span className="text-gray-600 text-center">
            {file ? file.name : "Click to upload or drag file here"}
          </span>
        </label>
      </div>

      <button
        onClick={handleConvert}
        disabled={!file || isConverting}
        className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
          !file || isConverting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-800"
        }`}
      >
        {isConverting ? "Converting..." : "Convert File"}
      </button>

      {isConverting && <LoadingBlocks heights={blockHeights} />}

      {error && (
        <p className="mt-4 text-red-500 text-center">Error: {error.message}</p>
      )}
    </div>
  );
};
