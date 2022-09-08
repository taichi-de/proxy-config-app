import formidable from "formidable";
import fs from "fs";
import { FileWithPath } from "react-dropzone";

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    await saveFile(files.file);
    return res.status(201).send("");
  });
};

const saveFile = async (file: FileWithPath) => {
  const data = fs.readFileSync(file.path);
  fs.writeFileSync(`./public/${file.name}`, data);
  await fs.unlinkSync(file.path);
  return;
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};

// const http = require("http");
// const util = require("util");
// const formidable = require("formidable");

// http
//   .createServer((req, res) => {
//     if (req.url === "/upload" && req.method.toLowerCase() === "post") {
//       // parse a file upload
//       const form = formidable();

//       form.parse(req, (err, fields, files) => {
//         res.writeHead(200, { "content-type": "text/plain" });
//         res.write("received upload:\n\n");
//         res.end(util.inspect({ fields: fields, files: files }));
//       });

//       return;
//     }

//     // show a file upload form
//     res.writeHead(200, { "content-type": "text/html" });
//     res.end(`
//       <form action="/upload" enctype="multipart/form-data" method="post">
//         <input type="file" name="upload" /><br/>
//         <input type="submit" value="Upload" />
//       </form>
//     `);
//   })
//   .listen(3000, () => {
//     console.log("Server listening on http://localhost:8080/ ...");
//   });
