import { useState, useContext } from "react";
import { UserContext } from "../../context/user-context";
import { Link } from "react-router-dom";
import ColorModeToggler from "../ColorModeToggler";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import GroupsIcon from "@mui/icons-material/Groups";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

const drawerWidth = 240;

function NavDrawer(props) {
  const { user, logoutUser } = useContext(UserContext);
  const userInitials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  const handleLogout = (e) => {
    logoutUser();
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem key="avatar" sx={{ justifyContent: "center" }}>
          <Avatar
            sx={{
              bgcolor: "#ff7e82",
              width: "4rem",
              height: "4rem",
              fontSize: "30px",
            }}
          >
            {userInitials}
          </Avatar>
        </ListItem>
        <ListItem key="welcome-text" sx={{ justifyContent: "center" }}>
          <Typography>{`Hello, ${user.firstName}!`}</Typography>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="link1" disablePadding>
          <ListItemButton component={Link} to="/stats">
            <ListItemIcon>
              <StackedLineChartIcon />
            </ListItemIcon>
            <ListItemText primary="Stats" />
          </ListItemButton>
        </ListItem>
        <ListItem key="link2" disablePadding>
          <ListItemButton component={Link} to="/workouts">
            <ListItemIcon>
              <FitnessCenterIcon />
            </ListItemIcon>
            <ListItemText primary="My Workouts" />
          </ListItemButton>
        </ListItem>
        <ListItem key="link3" disablePadding>
          <ListItemButton component={Link} to="/crews">
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="My Crews" />
          </ListItemButton>
        </ListItem>
        <ListItem key="link4" disablePadding>
          <ListItemButton component={Link} to="/leaderboard">
            <ListItemIcon>
              <EmojiEventsIcon />
            </ListItemIcon>
            <ListItemText primary="Leaderboard" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="sign-out-button" sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleLogout}
            variant="outlined"
            sx={{ display: { xs: "inline-block", sm: "none" } }}
          >
            Sign out
          </Button>
        </ListItem>
        <ListItem key="color-mode-toggler" sx={{ justifyContent: "center" }}>
          <ColorModeToggler isInNav={true} />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: { xs: "normal", sm: "space-between" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Fit Crew Connect
          </Typography>
          <Button
            onClick={handleLogout}
            variant="outlined"
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
          >
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

export default NavDrawer;
