import express from "express";
import bodyParser from "body-parser";
import { blogPost } from "./blogdata.js";

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

    res.render("blog", {posts:posts,home:homeContentString})
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
    const postBody = req.body.postBody
    const blog = {
        title: postTitle,
        body: postBody
    }

    posts.push(blog);
    res.redirect("/")
})

app.get("/posts/:postName",(req,res)=>{
    const topic = req.params.postName;
    const singlePost = posts.find((single)=>{
        return single.title === topic
    })
    if(singlePost){
        console.log("match found")
    }else{
        console.log("match not found")
    }
    const postTitle = singlePost.title
    const postBody = singlePost.body
    console.log(postTitle)
     res.render("post",{ postTitle:postTitle,postBody:postBody})
})
app.listen(3000,()=>{
    console.log("Server started running on port 3000")
})