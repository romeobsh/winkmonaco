import { Handshake, Logout, Newspaper, Store, VolunteerActivism, Recommend, ContactPage, Loyalty } from "@mui/icons-material";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

const drawerWidth = 240;

const adminTabs = [
  { name: "Dons", icon: <VolunteerActivism />, path: "/admin/donations" },
  { name: "Abonnements", icon: <Loyalty />, path: "/admin/subscriptions" },
  { name: "Shop", icon: <Store />, path: "/admin/shop" },
  { name: "Articles", icon: <Newspaper />, path: "/admin/articles" },
  { name: "Partenaires", icon: <Handshake />, path: "/admin/partners" },
  { name: "Aider autrement", icon: <Recommend />, path: "/admin/help" },
  { name: "Infos contact", icon: <ContactPage />, path: "/admin/contact" },
];

export default function AdminSidebar(props) {
  const router = useRouter();

  return (
    <React.Fragment>
      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderBottom: 0,
            },
          }}
          variant='permanent'
          anchor='left'>
          <Toolbar sx={{ justifyContent: "center" }}>
            <Image alt='Logo' src='/icons/ecritures.png' width={85} height={51} />
          </Toolbar>
          <Divider />
          <List>
            {adminTabs.map((tab, index) => (
              <ListItem key={Math.random()} disablePadding>
                <Link key={Math.random()} href={tab.path} style={{ textDecoration: "none" }}>
                  <ListItemButton key={Math.random()} selected={router.pathname.includes(tab.path)}>
                    <ListItemIcon key={Math.random()}>{tab.icon}</ListItemIcon>
                    <ListItemText key={Math.random()} primary={tab.name} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Box>
            <Divider />
            <List>
              <ListItemButton onClick={() => signOut()}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary='Déconnexion' />
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
        <Box component='main' sx={{ p: 2 }}>
          {props.children}
        </Box>
      </Box>
    </React.Fragment>
  );
}
