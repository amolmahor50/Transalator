import React, { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import Container from "../components/ui/Container";
import { FeedBackLink } from "../components/ui/FeedBackLink";
import ManageDataHistory from "../components/ui/DataHistory";
import UploadFileIcon from "@mui/icons-material/UploadFile"; // Icon for drag-and-drop cloud
import { Button } from "../components/ui/button";
import { Box, Typography } from "@mui/material";
import { FaFile } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import ToolTip from "../components/ui/ToolTip";
// import LoadingButton from '@mui/lab/LoadingButton';
import { SaveIcon } from "lucide-react";
import { AiOutlineDownload } from "react-icons/ai";
import { IoOpenOutline } from "react-icons/io5";
import { TranslateContextData } from "../context/TranslateContext";
import { Link } from "react-router-dom";

function DocumentUpload() {
  const { sourceLanguage, targetLanguage } = useContext(TranslateContextData)
  const [uploadedDocument, setUploadedDocument] = useState(null); // Stores the selected or dropped document
  const [uploadError, setUploadError] = useState(""); // For handling errors

  // Functionality for drag-and-drop document selection
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
    onDrop: (acceptedDocuments) => {
      if (acceptedDocuments.length > 0) {
        setUploadedDocument(acceptedDocuments[0]); // Set the dropped document in state
        setUploadError(""); // Clear any previous error
      } else {
        setUploadError("Invalid file type. Please upload a supported document.");
      }
    },
  });

  // Handle document selection via the "Browse your files" button
  const handleDocumentChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = [".docx", ".pdf", ".pptx", ".xlsx"];
      const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      if (validTypes.includes(fileExtension)) {
        setUploadedDocument(file); // Set the selected document in state
        setUploadError(""); // Clear any error
      } else {
        setUploadError("Invalid file type. Please upload a supported document.");
      }
    }
  };

  // Function to convert file size to MB
  const getFileSizeInMB = (sizeInBytes) => {
    return (sizeInBytes / (1024 * 1024)).toFixed(2); // Convert bytes to MB and keep two decimal places
  };

  return (
    <>
      <Container className="sm:h-[300px] text-center h-auto sm:pb-0 pb-4 border-b sm:border-2 sm:rounded-lg grid sm:grid-cols-12 grid-cols-1">
        {/* Show document preview after upload, no drag-and-drop or selection options */}
        {uploadedDocument ? (
          <Box className="col-span-12 my-10 flex justify-center items-center">

            <div className="flex gap-3 sm:items-end flex-col sm:justify-end items-center">

              <Box className='flex rounded-lg sm:gap-64 w-[280px] sm:w-fit bg-[#eeeeee] max-w-7xl sm:p-2 p-1 justify-between items-center'>
                <div className="flex items-center gap-1">
                  <ToolTip>
                    <FaFile className="sm:text-3xl text-2xl" />
                  </ToolTip>
                  <div className="flex flex-col items-start">
                    <Typography variant="subtitle2" fontSize={12}>
                      {uploadedDocument.name}
                    </Typography>
                    <Typography variant="caption" color="gray">
                      {getFileSizeInMB(uploadedDocument.size)} MB
                    </Typography>
                  </div>
                </div>
                <ToolTip TitleToolTip="Clear file" onClick={() => setUploadedDocument(null)} >
                  <IoCloseOutline />
                </ToolTip>
              </Box>

              <Box>
                <Button variant="blue">
                  Translate
                </Button>

                {/* <div className="flex sm:flex-row flex-col gap-4">
                  <Button variant="outline"
                    className='px-3 text-blue-800'
                  >
                    <AiOutlineDownload />
                    Download translation
                  </Button>

                  <Button variant="blue">
                    <IoOpenOutline />
                    Open translation
                  </Button>
                </div> */}

              </Box>

            </div>
          </Box>
        ) : (
          <>
            {/* Drag and Drop Document Box */}
            <div
              {...getRootProps()}
              className={`col-span-6 my-8 p-6 sm:m-16 flex flex-col items-center justify-center border-2 border-dashed ${isDragActive ? "border-blue-500" : "border-gray-300"
                } rounded-lg bg-gray-50 hover:cursor-pointer`}
            >
              <input {...getInputProps()} />
              <UploadFileIcon fontSize="large" color="primary" />
              <p className="mt-4 text-2xl font-medium">Drag and drop Doc.</p>
            </div>

            {/* File Selection Options */}
            <div className="sm:m-12 flex flex-col justify-center sm:border-l-2 items-center col-span-6">
              <p>Or choose a document</p>

              {/* Browse Documents Button */}
              <Button variant="blue" className="px-14 mt-4">
                <label className="cursor-pointer">
                  Browse your documents
                  <input
                    type="file"
                    hidden
                    accept=".docx, .pdf, .pptx, .xlsx" // Ensure file input accepts the correct formats
                    onChange={handleDocumentChange} // Handle document selection
                  />
                </label>
              </Button>

              {/* Footer Info */}
              <p className="text-xs mt-6 text-gray-600">
                Supported file types: .docx, .pdf, .pptx, .xlsx.
                <Link to='/' className='text-blue-600 ml-2 font-semibold'>Learn more</Link>
              </p>

              {/* Error Message */}
              {uploadError && (
                <p className="mt-4 text-red-500 text-sm">{uploadError}</p>
              )}
            </div>
          </>
        )}
      </Container>
      <FeedBackLink />
      <ManageDataHistory />
    </>
  );
}

export default DocumentUpload;
