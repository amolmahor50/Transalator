import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import ImageTranslate from "./routes/ImageTranslate";
import DocumentTranslate from "./routes/DocumentTranslate";
import WebsiteTranslate from "./routes/WebsiteTranslate";
import Text from "./routes/Text";

export default function App() {
  return (
    <>
      <HomePage />
      <div className="max-w-7xl mx-auto px-6">
        <Routes>
          <Route path="/" element={<Text />} />
          <Route path="/images" element={<ImageTranslate />} />
          <Route path="/docs" element={<DocumentTranslate />} />
          <Route path="/websites" element={<WebsiteTranslate />} />
        </Routes>
      </div>
    </>
  )
}