const express = require("express");
const multer = require("multer");
const cors=require('cors')
const upload = multer({ dest: "uploads/" });
const { uploadFile, getFileStream } = require("./s3");
const app = express();
app.use(express.json())
app.use(cors())


app.get("/images/:key", (req, res) => {
  const key = req.params.key;
 const readStream = getFileStream(key);
 readStream.pipe(res);
});



app.post("/images", upload.single("image"), async (req, res) => {
  const file = req.file;
  //const description=req.body.description
  const result = await uploadFile(file);
  res.send({ imagePath: `/images/${result.key}` });
  console.log(result)
  
});
app.listen(4000, (_) => {
  console.log("Server on...");
});
