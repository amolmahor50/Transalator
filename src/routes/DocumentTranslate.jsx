import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Container from "../components/ui/Container";
import { FeedBackLink } from "../components/FeedBackLink";
import ManageDataHistory from "../components/ui/DataHistory";
import UploadFileIcon from "@mui/icons-material/UploadFile"; // Icon for drag-and-drop cloud
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

function DocumentUpload() {
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

  return (
    <>
      <Container className="sm:h-[300px] text-center h-auto border-b sm:border-2 pb-6 sm:rounded-lg grid sm:grid-cols-12 grid-cols-1">
        {/* Show document preview after upload, no drag-and-drop or selection options */}
        {uploadedDocument ? (
          <div className="my-20 col-span-6 flex justify-center items-center flex-col">
            <p className="text-gray-600">
              Uploaded Document:{" "}
              <span className="text-blue-600 font-semibold mt-4">
                {uploadedDocument.name}
              </span>
            </p>
          </div>
        ) : (
          <>
            {/* Drag and Drop Document Box */}
            <div
              {...getRootProps()}
              className={`col-span-6 my-8 p-6 sm:m-16 flex flex-col items-center justify-center border-2 border-dashed ${
                isDragActive ? "border-blue-500" : "border-gray-300"
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
