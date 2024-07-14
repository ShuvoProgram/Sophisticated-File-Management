/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { Button, LinearProgress, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useCreateFileMutation } from '@/redux/feature/file/fileApi';

// interface FileUploadProps {
//   onUpload: (filePath: string) => void;
// }

const FileUpload: React.FC = () => {
  const [createFile] = useCreateFileMutation();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  useEffect(() => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      return () => {
        URL.revokeObjectURL(previewUrl);
      };
    } else {
      setPreview(null);
    }
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      setError(null);
      await uploadFile(file);
      // onUpload(filePath);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await createFile(formData);
    const { data: responseData, error } = res;

    if (responseData?.statusCode === 200) {
      throw new Error(responseData?.message || 'File upload Success');
    }

    if (error) {
      throw new Error(error.data?.message || 'File upload failed');
    }

    

    return responseData.filePath;
  };

  const renderPreview = () => {
    if (!preview) return null;

    if (file?.type.startsWith('image/')) {
      return <img src={preview} alt="Preview" className="mb-4" style={{ maxWidth: '100%', height: 'auto' }} />;
    } else if (file?.type === 'application/pdf') {
      return (
        <iframe
          src={preview}
          title="PDF Preview"
          className="mb-4"
          style={{ width: '100%', height: '500px', border: 'none' }}
        />
      );
    }
  };

  return (
    <div className="flex flex-col items-center p-4 border rounded shadow-md">
      {renderPreview()}
      <div className="mb-4 w-full text-center border-dashed border-2 border-gray-300 p-6 rounded">
        <input
          type="file"
          className="hidden"
          id="file-upload"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <CloudUpload fontSize="large" />
          <p className="text-gray-500">Drag and drop an image or PDF file here or click</p>
        </label>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={uploading}
      >
        Upload
      </Button>
      {uploading && <LinearProgress className="w-full mt-4" variant="determinate" value={progress} />}
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
};

export default FileUpload;