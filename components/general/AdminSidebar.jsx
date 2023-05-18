import { Handshake, Newspaper, Store, VolunteerActivism } from "@mui/icons-material";
import { AppBar, Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import * as React from "react";

const drawerWidth = 220;

export default function AdminSidebar() {
  return (
    <React.Fragment>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant='permanent'
        anchor='left'>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Image alt='Logo' src='/icons/ecritures.png' width={100} height={50} style={{ objectFit: "contain" }} />
        </Toolbar>
        <Divider />
        <List>
          {adminTabs.map((tab, index) => (
            <ListItem key={tab.name} disablePadding>
              <ListItemButton>
                <ListItemIcon color='#09003c'>{tab.icon}</ListItemIcon>
                <ListItemText primary={tab.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
}

const adminTabs = [
  { name: "Dons", icon: <VolunteerActivism /> },
  { name: "Shop", icon: <Store /> },
  { name: "Articles", icon: <Newspaper /> },
  { name: "Partenaires", icon: <Handshake /> },
];
