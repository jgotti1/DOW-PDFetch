# PDF_FILE_FETCH

The `PDF_FILE_FETCH` application is designed to open PDF files from specified network paths based on user requests. Built with Node.js and Express, it provides a  way to access PDF documents stored in various network locations, with a custom 404 page for handling invalid requests.


## Prerequisites

Requires Express and Node to be installed.

## Valid Paths


- **digital**
  - Location: `\\sbkntspsoft\finance\BIAR\FLDFTP\Inv_WSJ_Digital_XCRM\`
- **print_adbase**
  - Location: `\\sbkntspsoft\finance\BIAR\FCLFTP\Inv_Print_Adbase\`
- **print_e2**
  - Location: `\\10.220.8.73\finance_dev\BIAR\FADFTP\Inv_Print_Enterprise_Advertising\`
- **print_insertion**
  - Location: `\\prodarchshare\atex_adv\ROP IOs\`
- **digital_efn**
  - Location: `\\sbkntspsoft\finance\BIAR\FLDFTP\Inv_eFN_Digital_XCRM\`
- **Misc_Billing_NC**
  - Location: `\\sbkntspsoft\finance_dev\BIAR\fsbiqa\FMBFTP\Inv_MiscBilling_NC\`


To fetch a PDF file, construct a URL using one of the above paths followed by the name of the PDF file you wish to retrieve, as shown below:

## http://[url]/[pathType]/[filename].pdf ##


## Handling 404 Errors


### Custom 404 Error Page

When the server cannot find the requested PDF file or the path does not match any of the valid paths in the application, it responds with a custom 404 error page.
The custom 404 error page is stored as `404.html` within the `public` directory. 


