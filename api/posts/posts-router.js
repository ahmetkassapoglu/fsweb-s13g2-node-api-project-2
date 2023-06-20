// posts için gerekli routerları buraya yazı

const router = require('express').Router();
const postsModel = require("./posts-model")
router.get("/", async (req,res)=>{
try {
    const allPosts = await postsModel.find()
    res.json(allPosts)
} catch (error) {
    res.status(500).json({message:"Gönderiler alınamadı"})
}
})
router.get("/id", async (req,res)=>{
    try {
        const post = await postsModel.findById(req.params.id);
    if (!post){
        res.status(404).json({message:"Belirtilen ID'li gönderi bulunamadı"})
    }
    else {
        res.json(post)
    }
    } catch (error) {
        res.status(500).json({message:"Gönderi bilgisi alınamadı"})
    }
})
router.post("/", async (req,res)=>{
    try {
    let {title, content} = req.body
    if (!title || !content){
        res.status(400).json({message:"Lütfen gönderi için bir title ve contents sağlayın"})
    }
    else {
        
        let inserted = await postsModel.insert({title,content})
        let insertedId = await postsModel.findById(inserted.id)
        res.status(201).json(insertedId)
    }
      } catch (error) {
    res.status(500).json({ message: "Veritabanına kaydedilirken bir hata oluştu" })    
    }
})
router.put ("/:id", async (req,res)=>{
    try {
        let post = await postsModel.findById(req.params.id);
        if (!post){
            res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" })
        }
        else {
            let {title,contents} =req.body
            await postsModel.update(req.params.id,{title,contents})
           res.status(200).json(post)
        }
    } catch (error) {
        res.status(500).json({ message: "Gönderi bilgileri güncellenemedi" })
    }
})
router.delete("/:id", async (req,res)=>{
    try {
        let post = postsModel.findById(req.params.id)
        if (!post){
            res.status(404).json({ message: "Belirtilen ID li gönderi bulunamadı" })
        }
        else {
            await postsModel.remove(req.params.id)
            let deletedPost = postsModel.findById(req.params.id)
            res.json(deletedPost)
        }
    } catch (error) {
        res.status(500).json({ message: "Gönderi silinemedi" })
    }
})
router.get("/:id/comments", async(req,res)=>{
    try {
        let post = postsModel.findById(req.params).id
        if (!post){
            res.status(404).json({ message: "Girilen ID'li gönderi bulunamadı." })
        }
        else {
        let comments = await postsModel.findPostComments(req.params.id)
            res.status(201).json(comments)
        }
    } catch (error) {
        res.status(500).json({ message: "Yorumlar bilgisi getirilemedi" })
    }
    
})

module.exports = router