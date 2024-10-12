import React from "react";
import Hero from "../component/Hero/Hero";
import Facilities from "../facilities/Facilities";
import Category from "../component/category/Category";
import FeaturedProducts from "../component/FeturedProducts/FeaturedProducts";
import OurCollection from "../component/ourCollection/OurCollection";
const Home = () => {
  return (
    <>
      <Hero></Hero>
      <Facilities></Facilities>
      <Category></Category>
      <FeaturedProducts></FeaturedProducts>
      <OurCollection></OurCollection>
    </>
  );
};

export default Home;
