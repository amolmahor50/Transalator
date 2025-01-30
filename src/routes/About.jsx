import { Box, Grid2, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const GridSectionData1 = [
  {
    title: "Translate with your camera",
    description: "Just point your camera and instantly translate what you see.",
    image: "https://www.gstatic.com/marketing-cms/dd/a8/19d9ef5547b791575f9f987d457f/mobile-1.webp"
  },
  {
    title: "No internet? No problem.",
    description: "Download a language to translate without an internet connection.",
    image: "https://www.gstatic.com/marketing-cms/90/e7/439e1f6d4a9a95b2c20960c564d8/mobile-2.webp"
  },
  {
    title: "Have a conversation",
    description: "Talk with someone who speaks a different language.",
    image: "https://www.gstatic.com/marketing-cms/65/0b/7ccef91e482ba5160130e4d0eab3/mobile-3.webp"
  },
]

const GridSectionData2 = [
  {
    title: "Translate speech simultaneously",
    description: "Turn on Transcribe to understand what’s being said.",
    image: "https://www.gstatic.com/marketing-cms/9f/59/b28d3a3e414b9e48f348ccd8e1e6/mobile-4.webp"
  },
  {
    title: "Translate from any app",
    description: "No matter what app you’re in, just copy text and tap to translate.",
    image: "https://www.gstatic.com/marketing-cms/34/9f/f91bf73a47e9a3d644bb1a574575/mobile-5.webp"
  },
  {
    title: "Type, say, or handwrite",
    description: "Use voice input or handwrite characters and words not supported by your keyboard.",
    image: "https://www.gstatic.com/marketing-cms/e9/f4/057630644e30b7cb6cd5ee84f895/mobile-6.webp"
  },
]

const GridSectionData3 = {
  content: [
    {
      title: "Save your translations",
      description: "Quickly access words and phrases from any device by saving them",
      image: "https://www.gstatic.com/marketing-cms/35/dd/60b2c99d4604a2e8620a8c8c9e2e/desktop-1.webp"
    },
    {
      title: "What’s in that document?",
      description: "Upload your files to magically translate them in place without losing their formatting",
      image: "https://www.gstatic.com/marketing-cms/51/7c/8a8cd8cd400488fb6449c68324ac/desktop-3.webp"
    },
    {
      title: "Translate websites",
      description: "Need to translate a whole webpage? Just enter a URL to translate a whole webpage.",
      image: "https://www.gstatic.com/marketing-cms/52/68/7bd578e74693aba00875dcc149d0/desktop-4.webp"
    },
  ],
  links: [
    "Saved", "Document Translation", "Web Translation"
  ]
};

const AppQRScanData = [
  {
    name: "Android",
    src: "https://www.gstatic.com/marketing-cms/18/be/3a52bc3843debd8eddbcdd411116/android-qr.webp",
    whichQR: 'https://www.gstatic.com/marketing-cms/f6/4b/a475a4764ec2bf4b4b74b8b4e6af/google-play-badge.webp'
  },
  {
    name: "iOS",
    src: "https://www.gstatic.com/marketing-cms/1e/c5/666a8cd74827ba04c21d2343781a/ios-qr.webp",
    whichQR: 'https://www.gstatic.com/marketing-cms/4e/41/973fad354818a678ce7a719bcb6c/app-store-badge.webp'
  }
]

function About() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % GridSectionData1.length);
    }, 7000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      <Navbar />
      <div className="py-12 px-6 mt-20 relative">
        {/* Header Section */}
        <Box className="flex justify-center flex-col gap-8 items-center">
          <h1 className="scroll-m-20 text-4xl sm:text-6xl font-medium tracking-tight text-start sm:text-center mx-auto w-full sm:max-w-4xl">
            Understand your world and communicate across languages
          </h1>
          <Grid2 container spacing={2} justifyContent="center">
            <Grid2 item>
              <img
                src="https://www.gstatic.com/marketing-cms/f6/4b/a475a4764ec2bf4b4b74b8b4e6af/google-play-badge.webp"
                width={150}
                height={80}
                className="cursor-pointer"
                alt="Play Store"
              />
            </Grid2>
            <Grid2 item>
              <img
                src="https://www.gstatic.com/marketing-cms/4e/41/973fad354818a678ce7a719bcb6c/app-store-badge.webp"
                width={150}
                height={80}
                className="cursor-pointer"
                alt="App Store"
              />
            </Grid2>
          </Grid2>

          <Stack className="my-12">
            <img
              src="https://www.gstatic.com/marketing-cms/c8/7d/6c232851452cb68120f7c83ba445/banner.webp"
              className="cursor-pointer sm:max-w-3xl w-full"
              alt="App Store"
            />
          </Stack>

        </Box>

        {/* Main Content Section */}
        <Box className="my-14 max-w-7xl mx-auto px-4 sm:px-8">
          <h1 className="scroll-m-20 text-3xl sm:text-5xl font-medium tracking-tight text-start sm:text-center mx-auto w-full sm:max-w-4xl">
            Connect with people, places, and cultures without language barriers
          </h1>

          {/* Grid Section 1 */}
          <Grid2
            container
            spacing={4}
            alignItems="center"
            justifyContent="space-around"
            className="mt-12 sm:mt-20"
          >
            <Grid2 item xs={12} sm={6} order={{ xs: 1, sm: 1 }}>
              <Stack spacing={4}>
                {
                  GridSectionData1?.map((item, index) => (
                    <Stack spacing={1} key={index}
                      className={`border-l-2 pl-4 ${activeIndex === index ? "border-light-blue-600" : "border-gray-300"
                        }`}
                      style={{
                        transition: activeIndex === index ? "border-color 2s ease, filter 2s ease" : "border-color 2s ease",
                        filter: activeIndex === index ? "blur(0px)" : "blur(2px)",
                      }}
                    >
                      <Typography variant="h6">
                        {item?.title}
                      </Typography>
                      <Typography color="textSecondary">
                        {item?.description}
                      </Typography>
                    </Stack>
                  ))
                }
              </Stack>
            </Grid2>

            <Grid2 item xs={12} sm={6} order={{ xs: 2, sm: 2 }}>
              <img
                width={450}
                height={600}
                src={GridSectionData1[activeIndex]?.image}
                alt={`Slide ${activeIndex}`}
                className="max-w-full rounded-md"
              />
            </Grid2>
          </Grid2>

          {/* Grid Section 2 */}
          <Grid2
            container
            spacing={4}
            alignItems="center"
            justifyContent="space-between"
            className="mt-12 sm:mt-32"
          >
            <Grid2 item xs={12} sm={6} order={{ xs: 2, sm: 1 }}>
              <img
                width={450}
                height={600}
                src={GridSectionData2[activeIndex]?.image}
                alt={`Slide ${activeIndex}`}
                className="max-w-full rounded-md"
              />
            </Grid2>

            <Grid2 item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
              <Stack spacing={4}>
                {
                  GridSectionData2.map((item, index) => (
                    <Stack spacing={1} key={index}
                      className={`border-l-2 pl-4 ${activeIndex === index ? "border-light-blue-600" : "border-gray-300"
                        }`}
                      style={{
                        transition: activeIndex === index ? "border-color 2s ease, filter 2s ease" : "border-color 2s ease",
                        filter: activeIndex === index ? "blur(0px)" : "blur(2px)",
                      }}>
                      <Typography variant="h6">
                        {item?.title}
                      </Typography>
                      <Typography color="textSecondary">
                        {item?.description}
                      </Typography>
                    </Stack>
                  ))
                }
              </Stack>
            </Grid2>
          </Grid2>
        </Box>

        {/* Grid Section 3 */}
        <Box className='sm:py-16 sm:mt-32'>
          <Stack direction="row" className="flex justify-between items-center max-w-xl mx-auto text-center">
            {
              GridSectionData3?.links?.map((link, index) => (
                <span key={index}
                  className={`border-b-2 pb-2 text-sm sm:text-xl ${activeIndex === index ? "border-light-blue-600 text-blue-800" : "text-gray-800"
                    }`}
                >
                  {link}
                </span>
              ))
            }
          </Stack>

          <Box className="flex justify-center my-16">
            {
              GridSectionData3?.content?.map((item, index) => (
                // Conditional rendering to check if the index matches the activeIndex
                index === activeIndex && (
                  <Grid2 key={index} container spacing={6} alignItems="center">
                    <Grid2 item xs={12} sm={2} width={300}>
                      <Stack spacing={1}>
                        <Typography variant="h5" align="start">
                          {item?.title}
                        </Typography>
                        <Typography color="textSecondary" align="start">
                          {item?.description}
                        </Typography>
                      </Stack>
                    </Grid2>

                    <Grid2 item xs={12} sm={10}>
                      <Stack alignItems="center" justifyContent="center" textAlign="center">
                        <img
                          width={600}
                          height={600}
                          src={item.image}
                          alt={`Slide ${index}`}
                          className="max-w-full rounded-md"
                        />
                      </Stack>
                    </Grid2>
                  </Grid2>
                )
              ))
            }
          </Box>
        </Box>

        {/* Grid Section 4 */}
        <Box className="flex justify-center items-center sm:py-6 flex-col gap-6 text-center">
          <Stack>
            <img
              src="./Logo.png"
              className="h-12 w-12"
              alt="logo" />
          </Stack>

          <Stack spacing={2}>
            <h1 className="scroll-m-20 sm:text-5xl text-3xl font-medium tracking-tight">
              Try This Translate
            </h1>

            <Typography className="sm:max-w-xl mx-auto" color="textSecondary">
              Start using Google Translate in your <span className="text-indigo-500 cursor-pointer">browser</span>. Or scan the QR code below to download the app to use it on your mobile device.
            </Typography>

          </Stack>

          <Box className="flex sm:flex-row flex-col gap-16">

            {
              AppQRScanData.map((item, index) => (
                <Box key={index} className='flex flex-col gap-2 justify-center items-center mt-6'>
                  <h2 className="scroll-m-20 text-xl font-medium tracking-tight transition-colors first:mt-0">
                    {item?.name}
                  </h2>
                  <img
                    className="w-[130px] h-[130px]"
                    src={item?.src}
                    alt={item?.name}
                  />

                  <img
                    className="w-[160px] h-[50px]"
                    src={item?.whichQR}
                    alt={item?.name}
                  />

                </Box>
              ))
            }

          </Box>

          <Box className="absolute bottom-0 right-3/4">

            <img
              width={130}
              height={130}
              src="https://www.gstatic.com/marketing-cms/dd/cd/8735ef1d4a24ad4829311bad4bcd/bg-image2.webp"
              alt="animated"
            />
          </Box>
        </Box>
      </div>
    </>
  );
}

export default About;
