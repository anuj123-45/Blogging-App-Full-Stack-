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
import axios from "axios";
import ErrorPage from "./components/ErrorPage";

function App() {


  

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.signin());
    }
  }, [dispatch]);




  function parseJson(){
    try {
      return JSON.parse(localStorage.getItem("Blogs Details"));
    } catch(ex){
      return "";
    }
}


  const [blogTitle, setBlogTitle] =  useState(parseJson());
  console.log("Blogs",blogTitle);
  //(JSON.parse(localStorage.getItem("Blogs Details")));
  var Result=blogTitle;
 
 function searchCat(val) {
  Result=JSON.parse(localStorage.getItem("Blogs Details")).filter((item)=>{
  return item.title.toLowerCase().includes(val.toLowerCase());
    })
    setBlogTitle(Result);
    
  console.log("Result",Result);

  }
  



  console.log("Blog",blogTitle);



 

  return (
    <React.Fragment >


        <Header searchCat={searchCat}/>
   
      <main>




    
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Blogs />} />
              <Route path="/search" element={<BlogSearch arr={blogTitle}/>} />

            </>
          ) : (
            <>
              <Route path="/" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs/>} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
            </>
          )}
        </Routes>

        



      


      </main>

    </React.Fragment>
  );
}

export default App;
