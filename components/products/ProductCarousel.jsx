import React, { useState } from 'react';
import { Box, Card, CardActionArea, Grid } from '@mui/material';
import ReactImageMagnify from 'react-image-magnify';

function ProductImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: 'Main image',
                isFluidWidth: true,
                src: selectedImage
              },
              largeImage: {
                src: selectedImage,
                width: 1200,
                height: 1800
              },
              lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
            }}
          />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" overflow="auto">
          {images.map((image, index) => (
            <Box key={index} margin={1}>
              <CardActionArea onClick={() => setSelectedImage(image)}>
                <Box
                  component="img"
                  sx={{
                    width: 100,
                    height: 100,
                    opacity: image === selectedImage ? 1 : 0.5
                  }}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                />
              </CardActionArea>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}

export default ProductImageGallery;
