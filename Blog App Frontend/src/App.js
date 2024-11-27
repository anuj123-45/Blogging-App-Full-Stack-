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

function App() {

   const [search, setsearch] = useState('');
  

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.signin());
    }
  }, [dispatch]);


  return (
    <React.Fragment >
     <Header search={search} setsearch={setsearch}/>
      <main>   
      
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Blogs  search={search}/>} />

            </>
          ) : (
            <>
              <Route path="/" element={<Blogs search={search}/>} />
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
