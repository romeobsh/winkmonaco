import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { Box } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

const ImageCarousel = ({ pictures }) => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    dots: true,
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    pauseOnHover: true,
  };

  return (
    <Slider {...settings}>
      {pictures.map((picture, index) => (
        <Box key={index}>
          <Image
            unoptimized
            width={0}
            height={0}
            sizes='100vw'
            priority
            style={{
              objectFit: 'cover',
              width: 'fit-content',
              maxWidth: '100%',
              height: '20rem',
              borderRadius: '10px',
              border: '1px solid lightgray',
            }}
            src={picture.imgPath}
            alt={`Slide ${index}`}
          />
        </Box>
      ))}
    </Slider>
  );
};

export default ImageCarousel;
