import { SessionProvider, useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "/lib/theme";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SnackbarProvider } from "notistack";
import Head from "next/head";
import Navbar from "@/components/general/Navbar";
import AdminSidebar from "@/components/general/AdminSidebar";
import Loading from "@/components/general/Loading";
import Footer from "@/components/general/Footer";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith("/admin");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

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
              <>
                <Navbar>
                  {loading ? (
                    <Loading />
                  ) : (
                    <>
                      <Component {...pageProps} />
                      <Footer />
                    </>
                  )}
                </Navbar>
              </>
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
