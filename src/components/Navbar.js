import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/actions";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearchIconClick = () => {
    dispatch(setSearchQuery(search));
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearch(query);
  };

  const handleClearSearch = () => {
    setSearch("");
    dispatch(setSearchQuery(""));
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" className="app-bar">
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDrawerOpen}
              className="menu-icon"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            className="flex-grow"
          >
            VPlayer
          </Typography>

          {!isMobile && (
            <div className="flex items-center">
              <ListItem
                component={Link}
                to="/"
                className="nav-link"
                sx={location.pathname === "/" ? { color: "#000000" } : {}}
              >
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem
                component={Link}
                to="/playlist"
                className="nav-link"
                sx={
                  location.pathname === "/playlist" ? { color: "#000000" } : {}
                }
              >
                <ListItemText primary="Playlist" />
              </ListItem>
            </div>
          )}

          <div className="flex items-center justify-end">
            <input
              type="text"
              placeholder="Search"
              className="py-2 rounded search-input"
              value={search}
              onChange={handleSearchChange}
            />
            <SearchIcon
              className="search-icon"
              onClick={handleSearchIconClick}
            />
            {search ? (
              <CloseIcon className="close-icon" onClick={handleClearSearch} />
            ) : null}
          </div>
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerClose}
          PaperProps={{
            sx: { width: "40%" },
          }}
        >
          <List>
            <ListItem
              component={Link}
              to="/"
              onClick={handleDrawerClose}
              className="drawer-link"
              sx={location.pathname === "/" ? { backgroundColor: "gray" } : {}}
            >
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              component={Link}
              to="/playlist"
              onClick={handleDrawerClose}
              className="drawer-link"
              sx={
                location.pathname === "/playlist"
                  ? { backgroundColor: "gray" }
                  : {}
              }
            >
              <ListItemText primary="Playlist" />
            </ListItem>
          </List>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
