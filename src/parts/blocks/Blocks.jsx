import React, { useEffect, useRef, useState } from "react";

const Blocks = () => {
  const [BlocksData, setBlocksData] = useState([]);
  const colors = ["#002984", "#ba000d", "#006400", "#e1d9d1"];
  const [finishedGame, setfinishedGame] = useState(false);
  const [finaleScore, setfinaleScore] = useState(0);
  const targetColor = useRef("");
  const blocksRef = useRef([]);
  const count = useRef(1);
  const currentScore = useRef(0);
  const randomNumber = () => {
    return Math.floor(Math.random() * 4);
  };

  ///set row and column
  useEffect(() => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        setBlocksData((BlocksData) => [
          ...BlocksData,
          { row: i, column: j, id: `${i}${j}` },
        ]);
      }
    }
    return () => {
      setBlocksData(() => []);
    };
  }, []);

  ///check the game is over or not
  const gameOverChecker = () => {
    if (count.current > 81) {
      setfinishedGame(true);
      setfinaleScore(currentScore.current);
    }
  };

  ///click handler (destruct same blocks and update score)
  const sameBlocksDestructure = (clickEvent) => {
    const clickedElementBackground = clickEvent.target.style.backgroundColor;
    if (clickedElementBackground === "black") return;
    if (!targetColor.current) {
      targetColor.current = clickedElementBackground;
      setTimeout(() => {
        alert("select new color");
        targetColor.current = "";
        currentScore.current -= 9;
        gameOverChecker();
      }, 3000);
    }
    if (targetColor.current === clickedElementBackground) {
      clickEvent.target.style.backgroundColor = "black";
      currentScore.current += 1;
      count.current += 1;
    }
  };

  ///mapping blocks data
  const mappedBlocks = BlocksData.map((item, i) => (
    <div
      onClick={sameBlocksDestructure}
      ref={(element) => (blocksRef.current[i] = element)}
      className="block"
      style={{ backgroundColor: colors[randomNumber()] }}
      key={item.id}
    ></div>
  ));

  return (
    <div>
      {finishedGame ? (
        <div className="game-over">
          Game over
          <h2>Score : {finaleScore}</h2>
        </div>
      ) : (
        <div className="blocks-div">{mappedBlocks}</div>
      )}
    </div>
  );
};

export default Blocks;
