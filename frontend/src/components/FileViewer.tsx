"use client";
import React from 'react';
import { useGetFileQuery } from '@/redux/feature/file/fileApi';
import { CircularProgress, Typography } from '@mui/material';
import Image from 'next/image';
import { Editor } from '@/lib/types';

interface FileUpload {
  id: string;
  Url: string;
  originalName: string;
}

interface FileEditor {
  editor: Editor | undefined;
}

const FileViewer: React.FC<FileEditor> = ({ editor }) => {
  const { data, isLoading, isError, error } = useGetFileQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
        <Typography variant="h6" className="ml-4">Loading...</Typography>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-full">
        <Typography variant="h6" color="error">Error: {error?.message || 'An error occurred'}</Typography>
      </div>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <Typography variant="h6">No files available</Typography>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {data.data.map((file: FileUpload) => (
        <button
          key={file.id}
          className="flex flex-col items-center"
          onClick={() => editor?.addImage(file.Url)}
        >
          <Image
              src={file.Url}
              alt={`file-${file.originalName}`}
              height={200}
              width={200}
              className="max-w-full h-auto rounded-lg"
            />
        </button>
      ))}
    </div>
  );
};

export default FileViewer;