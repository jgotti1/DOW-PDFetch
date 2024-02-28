const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 5000;
const webAddress = "http://localhost:";

app.use(express.static("public"));

// Network paths configuration
const paths = [
  { path: "digital", location: "\\\\sbkntspsoft\\finance\\BIAR\\FLDFTP\\Inv_WSJ_Digital_XCRM\\" },
  { path: "print_adbase", location: "\\\\sbkntspsoft\\finance\\BIAR\\FCLFTP\\Inv_Print_Adbase\\" },
  { path: "print_e2", location: "\\\\10.220.8.73\\finance_dev\\BIAR\\FADFTP\\Inv_Print_Enterprise_Advertising\\" },
  { path: "print_insertion", location: `\\\\prodarchshare\\atex_adv\\ROP IOs\\` },
  { path: "digital_efn", location: "\\\\sbkntspsoft\\finance\\BIAR\\FLDFTP\\Inv_eFN_Digital_XCRM\\" },
  { path: "Misc_Billing_NC", location: "\\\\sbkntspsoft\\finance_dev\\BIAR\\fsbiqa\\FMBFTP\\Inv_MiscBilling_NC\\" },
];

// Function to serve a PDF file
function servePdfFile(res, pdfPath) {
  fs.access(pdfPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("Cannot access PDF file:", err);
       const filePath = path.join(__dirname, "public", "404.html");
      res.status(404).sendFile(filePath);
      console.log("__dirname:", __dirname); // Should print the directory where your script is running
      console.log("Path to 404.html:", path.join(__dirname, "public", "404.html"));
      return;
    }

    const fileStream = fs.createReadStream(pdfPath);
    res.setHeader("Content-Type", "application/pdf");
    fileStream.pipe(res);
  });
}

// Root Route
app.get("/", (req, res) => {
  res.send("You hit the root route for PDF Fetch!");
});

// Dynamic Route for various paths
app.get("/:pathType/:filename", (req, res) => {
  const { pathType, filename } = req.params;

  // Find the network location based on the pathType
  const networkPath = paths.find((p) => p.path === pathType)?.location;

if (!networkPath || !filename.endsWith(".pdf")) {
  const filePath = path.join(__dirname, "public", "404.html");
  res.status(404).sendFile(filePath);
  return;
}

  const pdfPath = path.join(networkPath, filename);
  // Call Function
  servePdfFile(res, pdfPath);
});

// Catch for unmatched routes
app.all("*", (req, res) => {
  const filePath = path.join(__dirname, 'public', '404.html');
  res.status(404).sendFile(filePath);
});


app.listen(port, () => {
  console.log(`Server running at ${webAddress}${port}`);
});
