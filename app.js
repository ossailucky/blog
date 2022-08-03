import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";
import Post from "./models/model.js";



const app = express();

const posts = [{
    title:  "Childhood",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
},
{
    title:  "Our Story",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}];

const homeContentString = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum consectetur neque fugit excepturi! Officiis distinctio est, numquam amet repellendus, veritatis obcaecati, error corporis ipsa voluptas odio. Enim aut illum sapiente aspernatur? Vero facilis nam impedit, exercitationem eius, consectetur, molestias error tempora maxime harum atque! Omnis accusantium dolores deserunt excepturi ipsam?";

const aboutContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum consectetur neque fugit excepturi! Officiis distinctio est, numquam amet repellendus, veritatis obcaecati, error corporis ipsa voluptas odio. Enim aut illum sapiente aspernatur? Vero facilis nam impedit, exercitationem eius, consectetur, molestias error tempora maxime harum atque! Omnis accusantium dolores deserunt excepturi ipsam?";

const contactContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum consectetur neque fugit excepturi! Officiis distinctio est, numquam amet repellendus, veritatis obcaecati, error corporis ipsa voluptas odio. Enim aut illum sapiente aspernatur? Vero facilis nam impedit, exercitationem eius, consectetur, molestias error tempora maxime harum atque! Omnis accusantium dolores deserunt excepturi ipsam?";

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))

app.get("/",(req,res)=>{

    Post.find({},(err, result)=>{
        if(result.length === 0){
            Post.insertMany(posts,(err)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log("Documents inserted successfully");
                }
            });
            res.redirect("/");
        }else{
            res.render("blog", {posts:result,home:homeContentString})
        }
    })

    
})

app.get("/about",(req,res)=>{
    res.render("about",{about:aboutContent})
})

app.get("/contact",(req,res)=>{
    res.render("contact",{contact:contactContent})
})

app.get("/compose",(req,res)=>{
    res.render("compose")
})

app.post("/compose",(req,res)=>{
    const postTitle = req.body.title;
    const postBody = req.body.postBody;
    const Newpost = new Post({
        title: postTitle,
        body: postBody
    });
    Newpost.save();
    res.redirect("/")
})

app.get("/posts/:postId",(req,res)=>{
    const id = req.params.postId;

    Post.findOne({_id: id}, (err, foundBlog)=>{
        if(err){
            console.log(err)
        }else{
            res.render("post",{ postTitle:foundBlog.title,postBody:foundBlog.body})
        }
    })

    // const singlePost = posts.find((single)=>{
    //     return _.lowerCase(single.title) === _.lowerCase(topic)
    // })
    // if(singlePost){
    //     console.log("match found")
    // }else{
    //     console.log("match not found")
    // }

    

    // const postTitle = singlePost.title
    // const postBody = singlePost.body
    // console.log(postTitle)
     
})
app.listen(3000,()=>{
    console.log("Server started running on port 3000")
})