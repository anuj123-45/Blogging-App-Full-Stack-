import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  TextField,
  ImageListItem
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

function Header(props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();
  return (
    <div >

      <AppBar
        position="sticky"
        sx={{
          background:
            "linear-gradient(45deg, rgba(100,1,205,100) 0%, rgba(200,219,50,1) 100%)",
        }}
      >
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h4"
            style={{width:"150px",}}
          >
            <ImageListItem><img src="https://www.taipy.io/wp-content/uploads/2022/06/Medium.png" style={{borderRadius:"5px",height:"50px"}}/></ImageListItem>
            
          </Typography>
        
          {isLoggedIn && (
            <Box display="flex" marginLeft={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(event, val) => setValue(val)}
              >
                <Tab LinkComponent={Link} to="/" label="All Blogs" />
                <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs " />
                <Tab LinkComponent={Link} to="/blogs/add" label="Create Blogs " />
              </Tabs>
            </Box>
          )}
         
          <Link to="/search"> <input
            type="search"
            className="form-control rounded "
            placeholder="Search blogs ..."
            aria-label="Search"
            aria-describedby="search-addon"
            onKeyUp={(e)=>props.searchCat(e.target.value)}
            style={{backgroundColor:"white",borderRadius:"25px",marginLeft:"40px",width:"200px",height:"40px"}}
          /></Link>
          <Box display="flex" marginLeft="auto">
         
            {!isLoggedIn && (
              <>
                <Button
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{ margin: 1 }}
                >
                  Login
                </Button>
               
              </>
            )}
          


           {
            isLoggedIn && (
              <h2 style={{display:"flex",alignItems:"center"}}>Hi , {localStorage.getItem('userImp')}</h2>
            )
           } 

          

          
            {isLoggedIn && (
              <Button
                onClick={() => dispatch(authActions.logout())}
                LinkComponent={Link}
                to="/"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
              >
                Log Out
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

    </div>
  );
}

export default Header;
