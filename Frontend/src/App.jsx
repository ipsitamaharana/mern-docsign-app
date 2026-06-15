import { useEffect, useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function App() {
  const [files, setFiles] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);

  const [signaturePosition, setSignaturePosition] = useState({
    x: 480,
    y: 715,
  });

  const [isDragging, setIsDragging] = useState(false);
  const pdfContainerRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/docs")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data);
      })
      .catch((err) => {
        console.log("Fetch Error:", err);
      });
  }, []);

  const startDrag = () => {
    setIsDragging(true);
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !pdfContainerRef.current) return;

    const rect = pdfContainerRef.current.getBoundingClientRect();

    setSignaturePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const saveSignature = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/signatures",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileId: selectedFileId,
            coordinates: {
              x: signaturePosition.x,
              y: signaturePosition.y,
            },
            signer: "Ipsita",
          }),
        }
      );

      const data = await response.json();

      console.log("Signature Saved:", data);

      alert("Signature coordinates saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save signature");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-8">
        Document Dashboard
      </h1>

      <div className="max-w-3xl mx-auto">
        {files.map((file) => (
          <div
            key={file._id}
            className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center"
          >
            <div>📄 {file.filename}</div>

            <div className="flex gap-4 items-center">
              <span>{(file.size / 1024).toFixed(2)} KB</span>

              <button
                onClick={() => {
                  setSelectedPdf(
                    `http://localhost:5000/uploads/${file.filename}`
                  );

                  setSelectedFileId(file._id);
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPdf && (
        <div className="mt-8 bg-white p-4 rounded-lg shadow max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            PDF Preview
          </h2>

          <div
            ref={pdfContainerRef}
            className="relative inline-block"
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
          >
            <Document
              file={selectedPdf}
              onLoadError={(error) => console.log(error)}
            >
              <Page pageNumber={1} />
            </Document>

            <div
              className="absolute bg-yellow-300 border-2 border-black px-4 py-2 font-bold whitespace-nowrap cursor-move"
              style={{
                left: `${signaturePosition.x}px`,
                top: `${signaturePosition.y}px`,
                zIndex: 9999,
              }}
              onMouseDown={startDrag}
            >
              SIGN HERE
            </div>
          </div>

          <button
            onClick={saveSignature}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Signature
          </button>
        </div>
      )}
    </div>
  );
}

export default App;