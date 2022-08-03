import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser: true});

const blogSchema ={
    title: String,
    body: String
};

const Post = mongoose.model("Post",blogSchema);

export default Post;