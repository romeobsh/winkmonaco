import OneTimeForm from '@/components/donations/OneTimeForm';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translate } from '@/lib/translations/translate';
import Head from 'next/head';
import React, { useContext } from 'react';

const OneTime = ({ paymentInfos }) => {
  const { language } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <Head>
        <title>{translate({ tKey: 'nav.donate', lang: language }) + ' - Wink Monaco'}</title>
      </Head>
      <OneTimeForm paymentInfos={paymentInfos} />
    </React.Fragment>
  );
};

export default OneTime;

export async function getServerSideProps(ctx) {
  try {
    const hostname = ctx.req.headers.host;

    const { data } = await (await fetch('http://' + hostname + `/api/paymentInfos`)).json();
    return {
      props: {
        paymentInfos: data[0] || {}, // Assuming data is an array and you need the first item
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        paymentInfos: {}, // Fallback empty object
      },
    };
  }
}
