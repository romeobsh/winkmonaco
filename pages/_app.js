import "@/styles/globals.css";
import Layout from "@/components/general/Layout";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import withConditionalRedirect from "@/lib/withConditionalRedirect";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith("/admin");
  console.log(isAdminRoute);

  const WrappedComponent = withConditionalRedirect(Component);

  return (
    <SessionProvider session={session}>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
      </Head>
      {isAdminRoute ? (
        <WrappedComponent {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  );
}
