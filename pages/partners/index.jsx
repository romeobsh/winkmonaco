import Loading from "@/components/general/Loading";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Partners = () => {
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState({});

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        // Make the API call to fetch the article data based on the ID
        const response = await fetch(`/api/partners/view`);
        let data = await response.json();

        if (data.data.length > 0) {
          data = data.data[0] ?? "";
          // Set the initial values based on the fetched data
          setPartners({
            firstText: data.firstText ?? "",
            imageUrl: data.imageUrl ?? "",
            secondText: data.secondText ?? "",
          });
        } else {
          setPartners(undefined);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchPartners function
    fetchPartners();
  }, []);

  return (
    <React.Fragment>
      {loading && <Loading />}
      <Box sx={{ maxWidth: "800px", margin: "1.8rem auto", justifyContent: "center", textAlign: "center" }}>
        <Typography variant='h2'>Partenaires</Typography>
        {!loading && partners === undefined && (
          <React.Fragment>
            <Typography
              variant='body1'
              sx={{
                marginTop: 4,
              }}>
              {`Nous n'avons aucun partenaire pour le moment.`}
              <br />
              {`Les partenaires nous aident à donner de la visibilité à l'association.`}
            </Typography>
            <Image
              src='/images/partnersDefault.webp'
              style={{ objectFit: "cover", marginTop: "50px", borderRadius: "10px" }}
              alt='Image partenaires'
              width={600}
              height={300}
            />
          </React.Fragment>
        )}
        {!loading && partners !== undefined && <Typography>{partners.firstText}</Typography>}
      </Box>
    </React.Fragment>
  );
};

export default Partners;
