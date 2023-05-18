import React, { useState } from "react";
import { Close, Favorite, HorizontalRule, Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";

const drawerWidth = 300;

const tabs = [
  { name: "Donner", path: "/donate" },
  { name: "Aider", path: "/help" },
  { name: "Actualités", path: "/articles" },
  { name: "Boutique", path: "/shop" },
  { name: "Partenaires", path: "/partners" },
  { name: "Contact", path: "/contact" },
];

function Navbar(props) {
  const router = useRouter();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState("FR");

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ margin: "auto 0" }}>
      <Toolbar sx={{ borderBottom: 0 }} />
      <List>
        {tabs.map((tab) => (
          <ListItem key={tab.name + "drawer"} sx={{ justifyContent: "right" }}>
            <Link href={tab.path}>
              <ListItemButton selected={router.pathname === tab.path}>
                <ListItemText primary={tab.name} />
                <HorizontalRule color='primary' fontSize='large' sx={{ transform: "rotate(90deg)" }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position='fixed' elevation={mobileOpen ? 0 : 3} sx={{ background: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1, borderBottom: 0 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link href={"/"}>
            <img src='/icons/ecritures.png' alt='Logo' style={{ objectFit: "contain", width: "70px" }} />
          </Link>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {tabs.map((tab) => (
              <Link key={tab.name + "bar"} href={tab.path}>
                <Button size='medium' sx={{ color: () => (router.pathname === tab.path ? "primary" : "#1C4057"), mr: 1, fontWeight: 600 }}>
                  {tab.name}
                </Button>
              </Link>
            ))}
          </Box>
          <Box display='flex' sx={{ alignItems: "center" }}>
            <Select
              size='small'
              variant='standard'
              disableUnderline
              color='primary'
              sx={{
                mr: 1,
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                ".MuiSvgIcon-root ": {
                  fill: "#60C7FA !important",
                },
              }}
              onChange={handleChangeLanguage}
              value={language}
              displayEmpty
              renderValue={(value) => {
                return (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {language === "FR" ? (
                      <Image src={"/images/france.png"} width={30} height={30} alt='drapeau français' style={{ padding: "3px 0 0 5px" }} />
                    ) : (
                      <Image src={"/images/united-kingdom.png"} width={30} height={30} alt='drapeau uk' style={{ padding: "3px 0 0 5px" }} />
                    )}
                  </Box>
                );
              }}>
              {" "}
              <MenuItem value={"FR"}>Français</MenuItem>
              <MenuItem value={"EN"}>English</MenuItem>
            </Select>
            <Button variant='contained' color='secondary' size='small' endIcon={<Favorite />}>
              Faire un don
            </Button>
            <Button
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ ml: 1.5, display: { xs: "flex", md: "none" }, flexDirection: "column" }}>
              {mobileOpen ? (
                <React.Fragment>
                  <Close color='primary' />
                  <Typography color='primary' variant='body2' sx={{ lineHeight: 1, fontSize: "0.8rem" }}>
                    Fermer
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Menu color='primary' />
                  <Typography color='primary' variant='body2' sx={{ lineHeight: 1, fontSize: "0.8rem" }}>
                    Menu
                  </Typography>
                </React.Fragment>
              )}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor={"right"}
        container={container}
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        onOpen={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          zIndex: (theme) => theme.zIndex.appBar - 1,
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}>
        {drawer}
      </SwipeableDrawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3, mt: 3 }}>
        {props.children}
      </Box>
    </Box>
  );
}

export default Navbar;
