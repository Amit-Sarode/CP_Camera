import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import * as XLSX from 'xlsx';
import { motion } from 'framer-motion';
import welcomeImg from './assets/cuate.svg';
import SearchBar from './component/Search';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const App: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [excelData, setExcelData] = useState<any[] | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [validationResult, setValidationResult] = useState<'Approved' | 'Rejected' | null>(null);
  const [loading, setLoading] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const mockServerValidation = async (content: string) => {
    return new Promise<'Approved' | 'Rejected'>((resolve) => {
      setTimeout(() => {
        resolve(content.toLowerCase().includes('name') ? 'Approved' : 'Rejected');
      }, 1000); 
    });
  };

  const checkForNameInExcel = async (data: any[]) => {
    const flatData = data.flatMap((row) => Object.values(row).map(val => String(val)));
    const combined = flatData.join(' ');
    return await mockServerValidation(combined);
  };

  const checkForNameInPdf = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(' ');
    }

    return await mockServerValidation(text);
  };

  const handleFile = async (file: File) => {
    setValidationResult(null);
    setLoading(true);

    const fileType = file.type;

    try {
      if (fileType.includes('pdf')) {
        setPdfFile(file);
        setExcelData(null);
        const result = await checkForNameInPdf(file);
        setValidationResult(result);
      } else if (
        fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        fileType === 'application/vnd.ms-excel'
      ) {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(data);
        setPdfFile(null);
        const result = await checkForNameInExcel(data);
        setValidationResult(result);
      } else {
        alert('Unsupported file type');
      }
    } catch (error) {
      alert('Failed to process the file.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (<>
    <SearchBar/>
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <motion.img
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        src={welcomeImg}
        alt="Welcome"
        className="w-40 mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">Upload a File</h1>
      <p className="text-sm text-gray-500 mb-6">* Drop a PDF or Excel file.</p>

   
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleFileDrop}
        className={`transition w-full max-w-xl h-40 flex flex-col items-center justify-center rounded-xl border-4 ${
          dragActive ? 'bg-blue-50 border-blue-400' : 'border-dashed border-gray-300'
        }`}
      >
        <input
          type="file"
          accept=".pdf,.xls,.xlsx"
          onChange={handleFileChange}
          className="absolute w-100 h-40 opacity-0 cursor-pointer"
        />
        <p className="text-gray-500">Click or drag & drop to upload</p>
      </div>

      {/* Validation Result */}
      {loading && <p className="mt-4 text-blue-500 animate-pulse">Validating file...</p>}
      {validationResult && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`mt-4 px-6 py-2 rounded-full text-white font-semibold ${
            validationResult === 'Approved' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {validationResult}
        </motion.div>
      )}

      {/* PDF Preview */}
      {pdfFile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 shadow-md"
        >
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from({ length: numPages || 0 }, (_, i) => (
              <Page key={i + 1} pageNumber={i + 1} width={500} />
            ))}
          </Document>
        </motion.div>
      )}

      {/* Excel Table */}
      {excelData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 overflow-x-auto w-full max-w-4xl"
        >
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(excelData[0]).map((key) => (
                  <th key={key} className="p-2 border">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="p-2 border">{val as string}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
    </>
  );
};

export default App;
