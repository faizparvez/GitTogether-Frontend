import React from "react";

// Import the three main section components that make up the homepage.
// These will be created in separate files as we proceed.
import Hero from "./Hero";
import Workflow from "./Workflow";
import Testimonials from "./Testimonials";
import ProductShowcase from "./ProductShowcase";

/**
 * The Home component serves as the main container for the landing page.
 * It structures the page by assembling the Hero, Workflow, and Testimonials sections in order.
 */
const Home = () => {
  return (
    // Using a React Fragment to group the components without adding extra nodes to the DOM.
    <>
      <Hero />
      <ProductShowcase />
      <Workflow />
      <Testimonials />
    </>
  );
};

export default Home;
