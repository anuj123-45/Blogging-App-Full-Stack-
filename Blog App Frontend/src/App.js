import "./App.css";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
import BlogSearch from './components/BlogSearch';

function App() {


 


  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.signin());
    }
  }, [dispatch]);


  const [blogTitle, setBlogTitle] = useState([]);
  //(JSON.parse(localStorage.getItem("Blogs Details")))
  var Result=blogTitle;
 
 function searchCat(val) {
 Result=JSON.parse(localStorage.getItem("Blogs Details")).filter((item)=>{
  return item.title.toLowerCase().includes(val.toLowerCase());
    })
    setBlogTitle(Result);
  }
  
  console.log("Result",Result);
  console.log("Blog",blogTitle);

 

  return (
    <React.Fragment >


        <Header searchCat={searchCat}/>
   
      <main>



        <Routes>


    
          {!isLoggedIn ? (
            <>
              <Route path="/auth" element={<Auth />} />
            
              
              
             
              {Result.length>0 ? (
                 <>
                  <Route path="/search" element={<BlogSearch arr={Result}/>} />
                 </>
              ):

              (

                <>
                
                <Route path="/" element={<Blogs />} />
                </>
              )
              
            }
      
                
 


            </>
          ) : (
            <>
              <Route path="/" element={<Blogs arr={Result}/>} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs arr={Result} />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
            </>
          )}
         
        



        </Routes>


      </main>

    </React.Fragment>
  );
}

export default App;
