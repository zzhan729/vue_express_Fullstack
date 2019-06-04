const express = require ("express");
const mongdb =require ("mongodb");

const router =express.Router();
//get
router.get("/", async(req,res)=>{
    const posts= await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

//add
router.post("/",async(req,res)=>{
    const posts =await loadPostsCollection();
    await posts.insertOne ({
        text:req.body.text,
        createdAt: new Date()

    });
    res.status(201).send();
});

//delete

router.delete("/:id", async (req,res)=>{
    const posts=await loadPostsCollection();
    await posts.deleteOne({_id:new mongdb.ObjectID( req.params.id)});
    res.status(200).send();
});






async function loadPostsCollection(){
    const client=await mongdb.MongoClient.connect
    ('mongodb://allen:allen123@ds231377.mlab.com:31377/vue_express',{
        useNewUrlParser:true
    })

    return client.db('vue_express').collection('posts');
}


module.exports=router;