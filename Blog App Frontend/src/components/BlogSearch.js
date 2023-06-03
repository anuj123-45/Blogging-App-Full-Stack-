
import Blog from "./Blog";


const BlogSearch = ({ arr }) => {

  return (
    <div>




      {arr.length > 0 ? (<>

        {arr.map((blog, index) => (
          index % 2 === 0 ? (<>

            <Blog
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              content={blog.content}
              image={blog.image}
              userName={blog.userIp}
             position={index}

            />
          </>) : (<>

            <Blog
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              content={blog.content}
              image={blog.image}
              userName={blog.userIp}
              position={index}



            />








          </>)

        )



        )
        }



      </>) : (<>

        <h1>No results found</h1>

      </>)}







    </div>
  );
}

export default BlogSearch;