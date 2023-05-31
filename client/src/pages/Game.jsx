import React from 'react';
import "../styles/game.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Game = () => {
  return (
    <>
      <Navbar />
      <div className="game-container">
        <h1 className="game-title">Relax, Here Play This Game</h1>
        <div className="game-wrapper">
          <iframe
            src="https://funhtml5games.com?embed=2048bit"
            style={{ width: '530px', height: '690px', border: 'none', margin: '0 auto' }}
            frameBorder="0"
            scrolling="no"
            title="game-iframe"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Game;
