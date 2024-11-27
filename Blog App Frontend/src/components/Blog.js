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
  Grid,
} from "@mui/material";
import { DeleteForeverOutlined, ModeEditOutlineOutlined } from "@mui/icons-material";
import axios from "axios";

const Blog = ({ title, content, image, userName, isUser, id, position }) => {
  localStorage.setItem("UserName", userName);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:8000/api/blog/${id}`)
      .catch((err) => console.log(err));
    return res.data;
  };

  const handleDelete = () => {
    deleteRequest().then(() => navigate("/"));
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ marginY: 2 }}>
      <Grid
        item
        xs={12}
        sm={10}
        md={8}
        lg={8}
        sx={{
          display: "flex",
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: 600, lg: "900px" }, // Wider for large screens
            backgroundColor: position % 2 === 0 ? "#D7BDE2" : "#2980B9",
            borderRadius: "20px",
            padding: 2,
            boxShadow: "5px 5px 10px #ccc",
            ":hover": { boxShadow: "10px 10px 20px #abc" },
          }}
        >
          {isUser && (
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <IconButton
                onClick={handleEdit}
                sx={{ backgroundColor: position % 2 === 0 ? "aqua" : "yellow" }}
              >
                <ModeEditOutlineOutlined />
              </IconButton>
              <IconButton
                onClick={handleDelete}
                sx={{
                  backgroundColor: position % 2 === 0 ? "lightgreen" : "#D7BDE2",
                }}
              >
                <DeleteForeverOutlined color="error" />
              </IconButton>
            </Box>
          )}
          <CardHeader
            avatar={
              <Avatar
                sx={{
                  bgcolor: position % 2 === 0 ? "brown" : "#2ECC71",
                  color: "#fff",
                }}
              >
                {userName && userName.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={<Typography variant="h6">{title}</Typography>}
          />
          <CardMedia
            component="img"
            height="300" // Adjusted height for a wider look
            image={image}
            alt={title}
            sx={{
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
          <CardContent
            sx={{
              height: { xs: 120, sm: 150 }, // Adjusted height for content
              overflowY: "auto",
            }}
          >
            <Typography variant="subtitle2" color="text.primary">
              <strong>Post By:</strong> {userName}
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="justify">
              {content}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Blog;
