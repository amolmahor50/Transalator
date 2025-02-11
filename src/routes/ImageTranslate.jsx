import { FeedBackLink } from '../components/ui/FeedBackLink';
import Container from '../components/ui/Container';
import ManageDataHistory from '../components/ui/DataHistory';
import React, { useState } from "react";
import { useDropzone } from "react-dropzone"; // Shadcn/Radix integration for drag and drop
import ContentPasteIcon from "@mui/icons-material/ContentPaste"; // Icon for "Paste"
import UploadFileIcon from "@mui/icons-material/UploadFile"; // Icon for drag-and-drop cloud
import { Button } from "../components/ui/button";
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle file drop functionality using react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"] // Proper MIME and extensions
    },
    onDrop: (acceptedFiles) => {
      setSelectedImage(acceptedFiles[0]);
    },
  });

  // Handle pasting images from the clipboard
  const handleClipboardPaste = (e) => {
    navigator.clipboard.read().then((clipboardItems) => {
      for (const item of clipboardItems) {
        if (item.types.includes("image/png") || item.types.includes("image/jpeg")) {
          item.getType(item.types[0]).then((blob) => setSelectedImage(blob));
        }
      }
    });
  };

  return (
    <>
      <Container className='sm:h-[300px] h-auto sm:border-2 pb-6 border-b sm:rounded-lg grid sm:grid-cols-12'>
        {/* Drag and Drop Box */}
        {!selectedImage && (
          <div
            {...getRootProps()}
            className={`col-span-6 my-8 p-6 sm:m-16 flex flex-col items-center justify-center`}
          >
            <input {...getInputProps()} />
            <img src="/drag_and_drop.png" className="h-28" />
            <Typography variant="h6" marginTop="10px">
              Drag and drop File.
            </Typography>
          </div>
        )}

        {/* Uploaded File Preview */}
        {selectedImage && (
          <div className="my-8 col-span-6 flex justify-center items-center flex-col">
            <p className="text-gray-600">
              Uploaded File:{" "}
              <span className='text-blue-600 font-semibold mt-4'>
                {selectedImage.name || "Pasted Image"}
              </span>
            </p>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="preview"
              className="mt-4 w-32 h-32 object-cover rounded-md"
            />
          </div>
        )}

        {/* File Selection Options */}
        {!selectedImage && (
          <div className="sm:m-12 flex flex-col sm:border-l-2 items-center col-span-6">
            <p>Or choose a file</p>

            {/* Browse Files Button */}
            <Button variant="blue" className='px-20 mt-4'>
              <input
                type="file"
                accept=".jpeg,.jpg,.png"
                hidden
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
              Browse your files
            </Button>

            {/* Paste from Clipboard Button */}
            <Button
              variant="outline"
              className='mt-4 px-14 text-blue-800'
              onClick={handleClipboardPaste}>
              <ContentPasteIcon />
              Paste from clipboard
            </Button>

            {/* Footer Info */}
            <p className="text-xs mt-6 text-gray-600">
              Supported file types: .jpeg, .jpg, .png.
              <Link to='/' className='text-blue-600 ml-2 font-semibold'>Learn more</Link>
            </p>
          </div>
        )}
      </Container>
      <FeedBackLink />
      <ManageDataHistory />
    </>
  );
}

export default ImageUploader;
