const { jsPDF } = require("jspdf");
const { PDFDocument } = require("pdf-lib");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const convertPDFToJSPDF = async (pdfPath) => {
  try {
    // Read the PDF file into a buffer
    const existingPdfBytes = fs.readFileSync(pdfPath);

    // Parse the PDF to extract text (using pdf-parse for better results)
    const parsedPdf = await pdfParse(existingPdfBytes);
    const textContent = parsedPdf.text; // Extracted text

    // Log extracted text for debugging
    console.log("Extracted Text:", textContent);

    // Load the existing PDF into pdf-lib (optional, if you want to extract metadata or manipulate pages)
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Create a new PDF using jsPDF
    const jsDoc = new jsPDF();

    // Split text content into lines for adding to jsPDF
    const lines = textContent.split("\n");
    let yOffset = 10;

    lines.forEach((line) => {
      jsDoc.text(line, 10, yOffset);
      yOffset += 10; // Adjust vertical spacing
      if (yOffset > 280) {
        jsDoc.addPage(); // Add a new page if content overflows
        yOffset = 10; // Reset yOffset for the new page
      }
    });

    // Save the new PDF
    jsDoc.save("Converted_PDF.pdf");
    console.log("PDF successfully created!");
  } catch (error) {
    console.error("Error during PDF conversion:", error);
  }
};

// Usage
convertPDFToJSPDF("approval.pdf");
