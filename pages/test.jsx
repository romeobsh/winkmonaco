// pages/apiCall.js

import React, { useState, useEffect } from "react";

const ApiCallPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testCall = async () => {
      try {
        const res = await fetch("https://api.payzen.eu/api-payment/V4/Charge/SDKTest", {
          method: "POST",
          headers: {
            Authorization: "Basic Njk4NzYzNTc6dGVzdHBhc3N3b3JkX0RFTU9QUklWQVRFS0VZMjNHNDQ3NXpYWlEyVUE1eDdN",
            "Content-Type": "application/json",
          },
          body: { value: 10 },
        });

        setData(res);
      } catch (err) {
        setError(err);
      }
    };

    testCall();
  }, []);

  return (
    <div>
      <h1>API Call Example</h1>
      {data && (
        <div>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div>
          <h2>Error:</h2>
          <pre>{JSON.stringify(error.message, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiCallPage;
