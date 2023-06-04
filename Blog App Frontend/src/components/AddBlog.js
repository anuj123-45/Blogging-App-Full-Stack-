import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";



const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const sendRequest = async (type = "signin") => {
    const res = await axios
      .post("http://localhost:8000/api/blog/add", {
        title: inputs.title,
        content: inputs.content,
        image: inputs.image,
        user: localStorage.getItem("userId"),
        userIp:localStorage.getItem("userImp"),
       
      })
      .catch((err) => alert(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/"));
  };

  return (
    <div >
      <form onSubmit={handleSubmit} >
        <Box
          border={2}
          borderColor="secondary.main"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={5}
          display="flex"
          flexDirection={"column"}
          width={"70%"}
          style={{background:"purple"}}
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color="gray"
            variant="h3"
            textAlign={"center"}
          
          >
            Create  Blog
          </Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="normal"
            variant="outlined"
            style={{background:"white"}}
            required={true}
          />
          <InputLabel sx={labelStyle}>Content</InputLabel>
          <textarea
            name="content"
            onChange={handleChange}
            value={inputs.content}
            margin="normal"
            variant="outlined"
            style={{background:"white",fontSize:"20px"}}
            rows={10}
            required={true}
          />
          <InputLabel sx={labelStyle}>URL</InputLabel>
          <TextField
            name="image"
            onChange={handleChange}
            value={inputs.image}
            margin="normal"
            variant="outlined"
            style={{background:"white"}}
            required={true}
            
          />
          <Button
            sx={{ mt: 2, borderRadius: 4,width:"200px",margin:"auto" }}
            variant="contained"
        
            type="submit"
          >
            Submit Blog
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
