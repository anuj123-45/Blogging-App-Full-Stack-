import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Avatar,
  CardContent,
  CardHeader,
  Typography,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import {
  DeleteForeverOutlined,
  ModeEditOutlineOutlined,
} from "@mui/icons-material";
import axios from "axios";

const Blog = ({ title, content, image, userName, isUser, id,position }) => {
  localStorage.setItem('UserName',userName)
  const navigate = useNavigate();
  const handleEdit = (event) => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:8000/api/blog/${id}`)
      .catch((err) => console.log(err));
 
    const data = res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest().then(() => navigate("/"));
  };

  return (
    <div>
     {position%2===0 ? (<>
     
      <Card
        sx={{
          width: "50%",
          margin: "auto",
          marginTop: 2,
          backgroundColor:"#D7BDE2 ",
          borderRadius:"50px"         ,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": { boxShadow: "10px 10px 20px #abc" },
          float:"left",
        
        }}
        
      >
        {isUser && (
          <Box display={"flex"} gap={3}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" ,backgroundColor:"aqua"}}>
              <ModeEditOutlineOutlined color="black" />
            </IconButton>
            <IconButton onClick={handleDelete} sx={{background:"lightgreen"}}>
              <DeleteForeverOutlined color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "brown" }} aria-label="recipe">
              {userName && userName.charAt(0).toUpperCase()}
           
            </Avatar>
          }
          title={<b style={{fontSize:"25px"}}>{title}</b>}
          subheader=""
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
        <CardContent style={{height:"100px",overflow:"scroll",overflowX:"hidden"}}>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary" style={{textAlign:"justify"}}>
            <h3>Post By:</h3>
            <h3 style={{fontWeight:"1000px"}}>{userName}</h3> {"-> "}
           
            {content}
          </Typography>
        </CardContent>
      </Card>
     
     
     
     
     
     
     </>):(<>
     
     
      <Card
        sx={{
          width: "50%",
          margin: "auto",
          marginTop: 2,
          borderRadius:"50px"         ,
          backgroundColor:"#2980B9",
          padding: 2,
          boxShadow: "5px 5px 10px #ccc", 
          ":hover": { boxShadow: "10px 10px 20px #abc" },
          float:"right",
        }}
      >
        {isUser && (
          <Box display={"flex"} gap={3}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" ,backgroundColor:"yellow"}}>
              <ModeEditOutlineOutlined color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete} sx={{backgroundColor:"#D7BDE2 "}}>
              <DeleteForeverOutlined color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#2ECC71 " }} aria-label="recipe">
              {userName && userName.charAt(0).toUpperCase()}
           
            </Avatar>
          }
          title={<b style={{fontSize:"25px"}}>{title}</b>}
          subheader=""
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
          aria-required={true}
        />
        <CardContent style={{height:"100px",overflow:"scroll",overflowX:"hidden"}}>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary" style={{textAlign:"justify",color:"white"}}>
            <h3>Post By:</h3>
            <h3 style={{fontWeight:"1000px"}}>{userName}</h3> {"-> "}
           
            {content}
          </Typography>
        </CardContent>
      </Card>
     
     
     
     
     
     
     
     
     
     
     </>)}
    </div>
  );
};

export default Blog;
