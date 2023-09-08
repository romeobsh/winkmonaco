import Donate from "@/components/donations/Donate";
import React from "react";

const DonatePage = ({ paymentInfos }) => {
  return (
    <React.Fragment>
      <Donate paymentInfos={paymentInfos} />
    </React.Fragment>
  );
};

export default DonatePage;

export async function getServerSideProps(ctx) {
  try {
    const hostname = ctx.req.headers.host;

    const { data } = await (await fetch("http://" + hostname + `/api/paymentInfos`)).json();
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
