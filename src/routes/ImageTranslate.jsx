import { FeedBackLink } from "../components/ui/FeedBackLink";
import ManageDataHistory from "../components/ui/DataHistory";
import React, { useContext, useState } from "react";
import { useDropzone } from "react-dropzone"; // Drag and Drop integration
import ContentPasteIcon from "@mui/icons-material/ContentPaste"; // Paste Icon
import { FaRegCopy } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { HiOutlineDownload } from "react-icons/hi";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ToolTip from "../components/ui/ToolTip";
import Switch from '@mui/material/Switch';
import { TranslateContextData } from "../context/TranslateContext";
import Tesseract from "tesseract.js";
import { toast } from "sonner";

export const ImagePreviewCard = ({ selectedImage, setSelectedImage }) => {

  // Extract text and copy it immediately
  const extractTextAndCopy = async () => {
    if (!selectedImage) return;
    try {
      const { data } = await Tesseract.recognize(
        URL.createObjectURL(selectedImage),
        "eng",
      );
      navigator.clipboard.writeText(data.text);
      toast.success("copied to clipboard!");
    } catch (error) {
      console.error("Error extracting text:", error);
      toast.error("Failed to extract text.");
    }
  };

  const downloadImage = () => {
    if (!selectedImage) return;
    const url = URL.createObjectURL(selectedImage);
    const link = document.createElement("a");
    link.href = url;
    link.download = selectedImage.name || "downloaded-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center w-full py-1 bg-white border-b px-2 sm:border-t-none border-t">
        <Typography variant="body2" fontWeight="semibold" color="gray" className="flex items-center gap-0 sm:gap-2">
          Show original
          <Switch defaultChecked size="small" />
        </Typography>

        <div className="flex items-center sm:gap-4">
          <div className="px-4 py-2 cursor-pointer rounded-sm hover:bg-accent">
            <Typography
              variant="body2"
              fontWeight="semibold"
              color="gray"
              className="flex items-center gap-2"
              onClick={extractTextAndCopy}
            >
              <FaRegCopy size={20} />
              <span className="sm:flex hidden">Copy Text</span>
            </Typography>
          </div>
          <div className="px-4 py-2 cursor-pointer rounded-sm hover:bg-accent">
            <Typography
              variant="body2"
              fontWeight="semibold"
              color="gray"
              className="flex items-center gap-2"
              onClick={downloadImage}
            >
              <HiOutlineDownload size={20} />
              <span className="sm:flex hidden">Download</span>
            </Typography>
          </div>
          <ToolTip
            TitleToolTip="Clear Image"
            onClick={() => setSelectedImage(null)}
          >
            <IoClose />
          </ToolTip>
        </div>
      </div>

      {/* Image Preview Section */}
      <div className='flex justify-center items-center flex-col py-2 bg-accent'>
        <Typography variant="body2" color="gray">
          Uploaded File:{" "}
          <span className="text-blue-600 font-semibold">
            {selectedImage?.name || "Pasted Image"}
          </span>
        </Typography>
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="preview"
          />
        )}
      </div>
    </div>
  );
};

export default function ImageUploader() {
  const { sourceLanguage, targetLanguage } = useContext(TranslateContextData);
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle file drop functionality using react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"] // Proper MIME and extensions
    },
    onDrop: (acceptedFiles) => {
      setSelectedImage(acceptedFiles[0]);
    },
    noClick: true,
  });

  // Handle pasting images from the clipboard

  // Handle pasting images from the clipboard
  const handleClipboardPaste = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        if (item.types.includes("image/png") || item.types.includes("image/jpeg") || item.types.includes("image/jpg")) {
          const blob = await item.getType(item.types[0]);
          const file = new File([blob], "pasted-image.png", { type: blob.type });
          setSelectedImage(file);
          toast.success("Image pasted successfully!");
          return;
        }
      }
      toast.error("No image found in clipboard.");
    } catch (error) {
      console.error("Error pasting image:", error);
      toast.error("Failed to paste image.");
    }
  };
  return (
    <>
      <Box className='h-auto sm:border-2 border-b sm:rounded-lg grid sm:grid-cols-2 grid-cols-1'>
        {/* Drag and Drop Box */}
        {!selectedImage && (
          <div
            {...getRootProps()}
            className={`my-8 p-6 sm:m-16 flex flex-col items-center justify-center`}
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
          <div className="col-span-12">
            <ImagePreviewCard
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </div>
        )}

        {/* File Selection Options */}
        {!selectedImage && (
          <div className="sm:m-12 flex flex-col sm:border-l-2 items-center pb-4 sm:pb-0">
            <p>Or choose a file</p>

            {/* Browse Files Button */}
            <Button variant="blue" className='px-20 mt-4'>
              <label htmlFor="imageUpload">
                <Input
                  id="imageUpload"
                  type="file"
                  className="hidden"
                  accept=".jpeg,.jpg,.png"
                  onChange={(e) => {
                    setSelectedImage(e.target.files[0]);
                  }}
                />
                <span>Browse your files</span>
              </label>
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
      </Box>
      <FeedBackLink />
      <ManageDataHistory />
    </>
  );
}

