
import Blog from "./Blog";


const BlogSearch=({arr})=>{
    
    return (
     <div>






       {arr.length==0 ? (
         <>
             {
        JSON.parse(localStorage.getItem("Blogs Details")).map((blog, index) => (
           <Blog
             id={blog._id}
             isUser={localStorage.getItem("userId") === blog.user._id}
             title={blog.title}
             content={blog.content}
             image={blog.image}
             userName={blog.userIp}
           />
         ))}
          
 
 
 
 
 
         </>
       ) : (
         <>
 
           {arr.map((blog, index) => (
             <Blog
               id={blog._id}
               isUser={localStorage.getItem("userId") === blog.user._id}
               title={blog.title}
               content={blog.content}
               image={blog.image}
   userName={blog.userIp}
           
              
             />
 
           )
 
 
 
           )
           }
 
 
 
 
 
         </>
       )}
 
 
 
 
     </div>
    );
}

export default BlogSearch;