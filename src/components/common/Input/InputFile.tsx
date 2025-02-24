import { useState } from "react";
import { InfoIcon, UploadCloud } from "lucide-react";

type FileUploadProps = {
  acceptedTypes?: string[]; // Tipe file yang diizinkan
  maxSizeMB?: number; // Maksimal ukuran dalam MB
};

const FileUpload: React.FC<FileUploadProps> = ({
  acceptedTypes = ["image/jpeg", "image/png"],
  maxSizeMB = 5,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    validateFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    validateFile(droppedFile);
  };

  const validateFile = (selectedFile?: File) => {
    if (!selectedFile) return;

    if (!acceptedTypes.includes(selectedFile.type)) {
      setError(`Only ${acceptedTypes.join(", ")} files are allowed.`);
      setFile(null);
      return;
    }

    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB.`);
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  return (
    <div className="w-full mx-auto">
      <div
        className="border border-gray-300 rounded-lg p-6 text-center cursor-pointer flex flex-col items-center justify-center relative"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {!file&& <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />}
        <p className="text-gray-600">
          {file ? (
            <span className="font-semibold text-black">{file.name}</span>
          ) : (
            "Click or drag and drop a file"
          )}
        </p>
        <input
          type="file"
          accept={acceptedTypes.join(",")}
          className="hidden"
          id="file-upload"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file-upload"
          className="absolute inset-0 cursor-pointer"
        ></label>
      </div>

      {file && (
        <p className="mt-2 text-sm text-green-600">{file.name} uploaded!</p>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <p className="mt-2 text-xs text-gray-500 flex items-center">
        {<InfoIcon size={16} className="mr-1" />} Max {maxSizeMB}MB, allowed:{" "}
        {acceptedTypes.map((type) => type.split("/")[1]).join(", ")}
      </p>
    </div>
  );
};

export default FileUpload;