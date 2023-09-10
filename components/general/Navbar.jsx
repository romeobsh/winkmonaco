import React, { useContext, useEffect, useState } from "react";
import { Close, Favorite, HorizontalRule, Menu } from "@mui/icons-material";
import { AppBar, Box, Button, List, ListItem, ListItemButton, ListItemText, SwipeableDrawer, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Translation from "./Translation";
import SelectLanguage from "./SelectLanguage";
import { LanguageContext } from "@/contexts/LanguageContext";
import { translate } from "@/lib/translations/translate";

// Largeur de la sidebar mobile
const drawerWidth = 300;

function Navbar(props) {
  const router = useRouter();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language } = useContext(LanguageContext);

  // Onglets
  const tabs = [
    { name: <Translation tKey='nav.home' />, path: "/" },
    { name: <Translation tKey='nav.donate' />, path: "/donate" },
    { name: <Translation tKey='nav.help' />, path: "/volunteers" },
    { name: <Translation tKey='nav.articles' />, path: "/articles" },
    { name: <Translation tKey='nav.shop' />, path: "/shop" },
    { name: <Translation tKey='nav.partners' />, path: "/partners" },
    { name: <Translation tKey='nav.contact' />, path: "/contact" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ margin: "auto 0", zIndex: "999" }}>
      <Toolbar sx={{ borderBottom: 0 }} />
      <List>
        {tabs.map((tab) => (
          <ListItem key={Math.random()} sx={{ justifyContent: "right" }}>
            <Link key={Math.random()} href={tab.path} style={{ textDecoration: "none" }}>
              <ListItemButton key={Math.random()} selected={router.pathname === tab.path}>
                <ListItemText key={Math.random()} primary={tab.name} />
                <HorizontalRule key={Math.random()} color='primary' fontSize='large' sx={{ transform: "rotate(90deg)" }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", height: "64px", maxWidth: "100vw", backgroundFilter: "blur(50px)" }}>
        <AppBar
          position='fixed'
          component='nav'
          elevation={mobileOpen ? 0 : 2}
          sx={{
            background: mobileOpen ? "white" : "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            boxShadow: mobileOpen ? "unset" : "0px 0px 50px 0px #0000001A",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            borderBottom: 0,
            maxWidth: "100vw",
          }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Link href={"/"}>
              <Image src='/icons/ecritures.png' priority alt='Logo' width={70} height={42} style={{ marginRight: "10px" }} />
            </Link>
            <Box sx={{ display: { xs: "none", lg: "block" } }}>
              {tabs.map((tab) => (
                <Link key={Math.random()} href={tab.path}>
                  <Button
                    key={Math.random()}
                    size='medium'
                    sx={{ color: () => (router.pathname === tab.path ? "primary" : "#1C4057"), mr: 1, fontWeight: 600 }}>
                    {tab.name}
                  </Button>
                </Link>
              ))}
            </Box>
            <Box display='flex' sx={{ alignItems: "center" }}>
              <SelectLanguage />
              <Link href='/donate' style={{ textDecoration: "none" }}>
                <Button variant='contained' color='secondary' size='small' sx={{ whiteSpace: "nowrap", textDecoration: "none" }} endIcon={<Favorite />}>
                  {translate({ tKey: "nav.donate", lang: language })}
                </Button>
              </Link>
              <Button
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
                sx={{ ml: 1.5, display: { xs: "flex", lg: "none" }, flexDirection: "column", width: "50px" }}>
                {mobileOpen ? (
                  <React.Fragment>
                    <Close color='primary' />
                    <Typography color='primary' variant='body2' sx={{ lineHeight: 1, fontSize: "0.8rem" }}>
                      <Translation tKey='general.close' lang={language} />
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
            display: { xs: "block", lg: "none" },
            zIndex: (theme) => theme.zIndex.appBar - 1,
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}>
          {drawer}
        </SwipeableDrawer>
      </Box>
      <Box component='main' sx={{ flexGrow: 1, p: 3, maxWidth: "100vw", overflow: "hidden" }}>
        {props.children}
      </Box>
    </React.Fragment>
  );
}

export default Navbar;
