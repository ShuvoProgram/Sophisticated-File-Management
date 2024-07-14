import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider, { Settings } from 'react-slick';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme, styled } from '@mui/material/styles';
import { IconButton, useMediaQuery } from '@mui/material';
import IconArrowBack from '@mui/icons-material/ArrowBack';
import IconArrowForward from '@mui/icons-material/ArrowForward';

interface SliderArrowProps {
  onClick?: () => void;
  type: 'next' | 'prev';
  className?: 'string';
}

const SliderArrow: FC<SliderArrowProps> = (props) => {
  const { onClick, type, className } = props;
  return (
    <IconButton
      sx={{
        backgroundColor: 'background.paper',
        color: 'primary.main',
        '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' },
        bottom: { xs: '-70px !important', md: '-28px !important' },
        left: 'unset !important',
        right: type === 'prev' ? '60px !important' : '0 !important',
        zIndex: 10,
        boxShadow: 1,
      }}
      disableRipple
      color="inherit"
      onClick={onClick}
      className={className}
    >
      {type === 'next' ? <IconArrowForward sx={{ fontSize: 22 }} /> : <IconArrowBack sx={{ fontSize: 22 }} />}
    </IconButton>
  );
};

const StyledDots = styled('ul')(({ theme }) => ({
  '&.slick-dots': {
    position: 'absolute',
    left: 0,
    bottom: -20,
    paddingLeft: theme.spacing(1),
    textAlign: 'left',
    '& li': {
      marginRight: theme.spacing(2),
      '&.slick-active>div': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));

const categories = [
  { id: 1, title: 'Docs', img: 'https://shorturl.at/IVkv3' },
  { id: 2, title: 'Whiteboards', img: 'https://shorturl.at/IVkv3' },
  { id: 3, title: 'Presentations', img: 'https://shorturl.at/IVkv3' },
  { id: 4, title: 'Social', img: 'https://shorturl.at/IVkv3' },
  { id: 5, title: 'Videos', img: 'https://shorturl.at/IVkv3' },
  { id: 6, title: 'Websites', img: 'https://shorturl.at/IVkv3' },
  { id: 7, title: 'Instagram posts', img: 'https://shorturl.at/IVkv3' },
];

const DesignSlide: FC = () => {
  const { breakpoints } = useTheme();
  const matchMobileView = useMediaQuery(breakpoints.down('md'));

  const sliderConfig: Settings = {
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: matchMobileView ? 1 : 6,
    slidesToScroll: 1,
    prevArrow: <SliderArrow type="prev" />,
    nextArrow: <SliderArrow type="next" />,
    dots: true,
    appendDots: (dots) => <StyledDots>{dots}</StyledDots>,
    customPaging: () => (
      <Box sx={{ height: 8, width: 30, backgroundColor: 'divider', display: 'inline-block', borderRadius: 4 }} />
    ),
  };

  return (
    <Box
      id="popular-categories"
      sx={{
        pt: {
        //   xs: 6,
          md: 8,
        },
        pb: 14,
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box >
            <Slider {...sliderConfig}>
              {categories.map((category) => (
                <Box key={category.id} sx={{ textAlign: 'center', p: 2 }}>
                  <Box component="img" src={category.img} alt={category.title} sx={{ width: '100%', height: '100%', borderRadius: 2 }} />
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {category.title}
                  </Typography>
                </Box>
              ))}
            </Slider>
          </Box>
      </Container>
    </Box>
  );
};

export default DesignSlide;
