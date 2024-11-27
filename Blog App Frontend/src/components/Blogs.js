import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

function Blogs({search}) {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
   const reqBlogs=async()=>{
    const getBlogs=await axios.get('http://localhost:8000/api/blog')
    setBlogs(getBlogs.data.blogs)
    }
    reqBlogs()
  }, []);
  return (
    <>
    <div>
       {blogs && blogs.filter((blog)=>blog.title.toLowerCase().includes(search.toLowerCase())).map((blog, index) => (
        
          <Blog
          id={blog._id}
          isUser={localStorage.getItem("userId") === blog.user._id}
          title={blog.title}
          content={blog.content}
          image={blog.image}
          userName={blog.userIp}
          position={index}
        />
          
        
      ))}
        {localStorage.setItem("Blogs Details", (JSON.stringify(blogs)))}
  </div>
    </>

  );
}

export default Blogs;
