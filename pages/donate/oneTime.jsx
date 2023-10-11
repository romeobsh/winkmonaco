import OneTimeForm from '@/components/donations/OneTimeForm';

const OneTime = ({ paymentInfos }) => {
  return <OneTimeForm paymentInfos={paymentInfos} />;
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
