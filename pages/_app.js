import { SessionProvider, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import AdminLayout from "@/components/general/AdminLayout";
import { Box, CircularProgress, ThemeProvider } from "@mui/material";
import { theme } from "/lib/theme";
import Navbar from "@/components/general/Navbar";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith("/admin");

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        </Head>
        {isAdminPage ? (
          <Auth>
            <AdminLayout>
              <Component {...pageProps} />
            </AdminLayout>
          </Auth>
        ) : (
          <Navbar>
            <Component {...pageProps} />
          </Navbar>
        )}
      </ThemeProvider>
    </SessionProvider>
  );
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return (
      <Box sx={{ display: "flex", alignItems: "center", height: "100%", width: "100%" }}>
        <CircularProgress size={100} />
      </Box>
    );
  }

  return children;
}
