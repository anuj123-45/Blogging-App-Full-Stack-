import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

function Header({ search, setsearch }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();

  return (
    <div>
      <AppBar
        position="sticky"
        sx={{
          background:
            "linear-gradient(45deg, rgba(100,1,205,100) 0%, rgba(90, 34, 139, 1) 100%)",
        }}
      >
        <Toolbar>
          {/* Logo */}
          <Typography
            component={Link}
            to="/"
            variant="h4"
            style={{ width: "150px" }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/10026/10026257.png"
              style={{
                borderRadius: "5px",
                height: "50px",
                background: "white",
              }}
              alt="logo"
            />
          </Typography>

          {/* Tabs for navigation */}
          {isLoggedIn && (
            <Box display="flex" marginLeft={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(event, val) => setValue(val)}
              >
                <Tab LinkComponent={Link} to="/blogs/add" label="Create Blog " />
                <Tab LinkComponent={Link} to="/" label="All Blogs" />
                <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs " />
              </Tabs>
            </Box>
          )}

          {/* Centered Search Bar */}
          <Box
            flexGrow={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search blogs ..."
              aria-label="Search"
              aria-describedby="search-addon"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              style={{
                backgroundColor: "white",
                borderRadius: "25px",
                width: "200px",
                height: "40px",
              }}
            />
          </Box>

          {/* Buttons and User Info */}
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

            {isLoggedIn && (
              <h2 style={{ display: "flex", alignItems: "center" }}>
                Hi, {localStorage.getItem("userImp")}
              </h2>
            )}

            {isLoggedIn && (
              <Button
                onClick={() => dispatch(authActions.logout())}
                LinkComponent={Link}
                to="/"
                variant="contained"
                sx={{ margin: 1 }}
                style={{ backgroundColor: "#f9b42d" }}
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
