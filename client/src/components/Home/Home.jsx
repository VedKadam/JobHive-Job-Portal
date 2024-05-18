import React, { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HerSection from "./HeroSection";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
import Working from "./Working";
import HeroSection from "./HeroSection";

const Home = () =>{
  const {isAuthorized} = useContext(Context);
  if(!isAuthorized){
    return <Navigate to={"/login"}/>
  }
  return(
    <>
      <section>
        <HeroSection />
        <Working/>
        <PopularCategories />
        <PopularCompanies />
      </section>

      
    </>
  )
}

export default Home;