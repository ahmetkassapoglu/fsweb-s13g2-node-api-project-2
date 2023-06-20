// server için gerekli olanları burada ayarlayın
const express = require('express');
const server = express();
server.use(express.json)

const postRouter= require("./posts/posts-router")

server.use("/api/posts",postRouter)
module.exports=server;
// posts router'ını buraya require edin ve bağlayın
