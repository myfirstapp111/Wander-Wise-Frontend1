import React from "react";
import Navbar from "../components/landingComponents/Navbar";
import Hero from "../components/landingComponents/Hero";
import Features from "../components/landingComponents/Features";
import About from "../components/landingComponents/About";
import FeaturedTrips from "../components/landingComponents/FeaturedTrips";
import Contact from "../components/landingComponents/Contact";
import FamousTrips from "../components/landingComponents/FamousTrips";
import Footer1 from "../components/landingComponents/Footer1";
import ScrollReveal from "../components/common/ScrollReveal";

import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LandingPage = () => {


    const { login, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate]);




  return (
    <div>
      <Navbar />

      {/* Hero (usually no scroll animation) */}
      <Hero />

      <ScrollReveal>
        <Features />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <About />
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <FeaturedTrips />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <FamousTrips />
      </ScrollReveal>

      <ScrollReveal delay={0.25}>
        <Contact />
      </ScrollReveal>

      <Footer1 />
    </div>
  );
};

export default LandingPage;
