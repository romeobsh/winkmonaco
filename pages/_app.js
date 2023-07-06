import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "/lib/theme";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SnackbarProvider } from "notistack";
import Head from "next/head";
import Navbar from "@/components/general/Navbar";
import AdminSidebar from "@/components/general/AdminSidebar";
import Loading from "@/components/general/Loading";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith("/admin");

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          autoHideDuration={5000}
          style={{ fontSize: "1.2rem" }}>
          <LanguageProvider>
            <Head>
              <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
              <title>Wink Monaco</title>
            </Head>
            <CssBaseline />
            {isAdminPage ? (
              <Auth>
                <AdminSidebar>
                  <Component {...pageProps} />
                </AdminSidebar>
              </Auth>
            ) : (
              <Navbar>
                <Component {...pageProps} />
              </Navbar>
            )}
          </LanguageProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <Loading />;
  }

  return children;
}
