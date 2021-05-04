<<<<<<< HEAD
import React from 'react';
import LandingPage from '../components/styles/LandingPage';

const HomePage = () => {
  return <LandingPage>test</LandingPage>;
=======
import { Link } from 'react-router-dom';
import FeaturedButton from '../components/styles/FeaturedButton';
import React from 'react';
import LandingPage from '../components/styles/LandingPage';

const HomePage = (props) => {
  return (
    <LandingPage>
      <header id="showcase">
        <h4>
          Welcome to a wide range of furniture solutions that have been made to
          last multiple generations
        </h4>
        <Link to="/products">
          <FeaturedButton> Shop All Furniture </FeaturedButton>
        </Link>
      </header>
    </LandingPage>
  );
>>>>>>> main
};

export default HomePage;
