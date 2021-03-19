const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const rateLimiter=require('./config/rateLimiter')

const Post = require("./models/Post");
//rateLimiter(),
routes.get("/posts", async (req, res) => {
  console.log(req._remoteAddress)
  const posts = await Post.find();

  return res.json(posts);
});

routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file;

  const post = await Post.create({
    name,
    size,
    key,
    url
  });

  return res.json(post);
});

routes.delete("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  await post.remove();

  return res.send();
});

routes.get('/',(req,res)=>{
  res.json({data:"Servidor ok"})
})
module.exports = routes;
