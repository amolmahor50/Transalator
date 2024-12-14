import React, { useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import Container from "../components/ui/Container";
import { TranslateContextData } from "../context/TranslateContext";
import { Button } from "../components/ui/button";
import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { SaveIcon } from "lucide-react";
import { AiOutlineDownload } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { FaFile } from "react-icons/fa";

function DocumentUpload() {
  const {
    sourceLanguage,
    targetLanguage,
    setSourceText,
    translatedText,
    setTranslatedText, // Added this to update translatedText
  } = useContext(TranslateContextData);

  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [loading, setLoading] = useState(false);
  const [translationComplete, setTranslationComplete] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    onDrop: (acceptedDocuments) => {
      if (acceptedDocuments.length > 0) {
        setUploadedDocument(acceptedDocuments[0]);
        setUploadError("");
      } else {
        setUploadError("Invalid file type. Please upload a PDF document.");
      }
    },
  });

  const handleTranslate = async () => {
    setLoading(true);

    try {
      // Simulate text extraction from uploaded document
      const extractedText = "Sample extracted text from uploaded document.";
      setSourceText(extractedText); // Pass the text to context for translation

      // Wait for the translation to be available in translatedText
      const waitForTranslation = new Promise((resolve) => {
        const checkTranslation = setInterval(() => {
          if (translatedText) {
            clearInterval(checkTranslation);
            resolve(translatedText);
          }
        }, 500);
      });

      await waitForTranslation;

      // After translation completes
      setTranslationComplete(true); // Mark translation as complete
    } catch (error) {
      console.error("Error during translation:", error);
      setUploadError("An error occurred while translating the document.");
    }

    setLoading(false);
  };

  const handleDownload = () => {
    if (translatedText) {
      const file = new Blob([translatedText], { type: "text/plain" });
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = `TranslatedDocument_${targetLanguage}.txt`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleOpenInNewTab = () => {
    if (translatedText) {
      const newTab = window.open();
      newTab.document.write(`<pre>${translatedText}</pre>`);
      newTab.document.close();
    }
  };

  return (
    <Container className="sm:h-[300px] text-center h-auto border-b sm:border-2 sm:rounded-lg grid sm:grid-cols-12 grid-cols-1">
      {
        uploadedDocument ? (
          <Box className="col-span-12 my-10 flex justify-center items-center">
            <div className="flex gap-3 sm:items-end flex-col sm:justify-end items-center">

              <Box className="flex rounded-lg sm:gap-64 gap-16 bg-[#eeeeee] max-w-7xl p-2 justify-between items-center">

                <div className="flex items-center gap-2 sm:gap-1">
                  <FaFile className="sm:text-3xl text-2xl" />
                  <div className="flex flex-col items-start">
                    <Typography variant="subtitle2">
                      {uploadedDocument.name}
                    </Typography>
                    <Typography variant="caption" color="gray">
                      {(uploadedDocument.size / (1024 * 1024)).toFixed(2)} MB
                    </Typography>
                  </div>
                </div>

                <IoCloseOutline
                  className="sm:text-3xl text-2xl ml-6 cursor-pointer"
                  onClick={() => setUploadedDocument(null)}
                />
              </Box>

              <Box>
                {!translationComplete ? (
                  loading ? (
                    <LoadingButton
                      loading
                      loadingPosition="start"
                      startIcon={<SaveIcon />}
                      variant="outlined"
                    >
                      Translating...
                    </LoadingButton>
                  ) : (
                    <Button variant="blue" onClick={handleTranslate}>
                      Translate
                    </Button>
                  )
                ) : (
                  <Box className="flex gap-2 sm:flex-row flex-col">
                    <Button
                      variant="outline"
                      className="px-3 text-blue-800"
                      onClick={handleDownload}
                    >
                      <AiOutlineDownload />
                      Download Translation
                    </Button>
                    <Button
                      variant="blue"
                      className="px-3"
                      onClick={handleOpenInNewTab}
                    >
                      Open Translation
                    </Button>
                  </Box>
                )}
              </Box>
            </div>
          </Box>
        ) : (
          <>
            <div
              {...getRootProps()}
              className={`col-span-6 my-8 p-6 sm:m-16 flex flex-col items-center justify-center border-2 border-dashed ${isDragActive ? "border-blue-500" : "border-gray-300"
                } rounded-lg bg-gray-50 hover:cursor-pointer`}
            >
              <input {...getInputProps()} />
              <p className="mt-4 text-2xl font-medium">Drag and drop a PDF document.</p>
            </div>
            <div className="sm:m-12 flex flex-col justify-center sm:border-l-2 items-center col-span-6">
              <p>Or choose a document</p>
              <Button variant="blue" className="px-14 mt-4">
                <label className="cursor-pointer">
                  Browse your documents
                  <input
                    type="file"
                    hidden
                    accept=".pdf"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      setUploadedDocument(file);
                    }}
                  />
                </label>
              </Button>
              {uploadError && <p className="mt-4 text-red-500 text-sm">{uploadError}</p>}
            </div>
          </>
        )}
    </Container>
  );
}

export default DocumentUpload;
