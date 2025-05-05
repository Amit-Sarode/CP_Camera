import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

const PdfToJsonConverter = () => {
  const [jsonOutput, setJsonOutput] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle PDF file selection
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      convertPdfToJson(file);
    }
  };

  // Function to convert PDF to JSON
  const convertPdfToJson = async (file) => {
    try {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        let jsonData = [];
        const numPages = pdf.numPages;

        // Loop through all pages in the PDF
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');

          // Extract product information
          const products = extractProductInfo(pageText);

          // Add extracted products to JSON data
          jsonData = [...jsonData, ...products];
        }

        // Set the JSON output state
        setJsonOutput(JSON.stringify(jsonData, null, 2));
      };

      // Read the PDF as an ArrayBuffer
      fileReader.readAsArrayBuffer(file);
    } catch (err) {
      setError('Failed to convert PDF: ' + err.message);
    }
  };

  // Function to extract product details from page text
  const extractProductInfo = (pageText) => {
    // Use regex to match product pattern (adjust as necessary)
    const productRegex = /([A-Z0-9-]+)\s+([\w\s,.]+)\s+\$(\d{1,3}(?:[.,]\d{3})*(?:,\d{2})?)/g;
    const products = [];
    let match;

    while ((match = productRegex.exec(pageText)) !== null) {
      const [_, code, description, price] = match;

      // Remove commas or periods in price
      const formattedPrice = price.replace(/[.,]/g, '').replace(/(\d)(\d{2})$/, '$1.$2');

      products.push({
        code,
        description,
        price: formattedPrice,
      });
    }

    return products;
  };

  return (
    <div>
      <h1>PDF to JSON Product Converter</h1>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      {jsonOutput && (
        <div>
          <h3>Converted JSON Output:</h3>
          <pre>{jsonOutput}</pre>
        </div>
      )}
    </div>
  );
};

export default PdfToJsonConverter;
