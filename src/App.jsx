import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Images from "./routes/Images";
import Document from "./routes/Document";
import Website from "./routes/Website";
import Text from "./routes/Text";

export default function App() {
  return (
    <>
      <HomePage />
      <div className="max-w-7xl mx-auto px-6">
        <Routes>
          <Route path="/" element={<Text />} />
          <Route path="/image" element={<Images />} />
          <Route path="/document" element={<Document />} />
          <Route path="/website" element={<Website />} />
        </Routes>
      </div>
    </>
  )
}