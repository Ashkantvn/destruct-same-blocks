import React, { useEffect, useRef, useState } from "react";

const Blocks = () => {
  const [BlocksData, setBlocksData] = useState([]);
  const colors = ["#002984", "#ba000d", "#006400", "#e1d9d1"];
  const [finishedGame, setfinishedGame] = useState(false);
  const [score, setscore] = useState(0);
  const targetColor = useRef("");
  const blocksRef = useRef([]);
  const count = useRef(1);
  const time = useRef(3);
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

  const gameOverChecker = () => {
    if (count.current > 81) {
      setfinishedGame(true);
      setscore(currentScore.current);
    }
    console.log(count.current);
  };
  ///click handler
  const sameBlocksDestructure = (clickEvent) => {
    if (clickEvent.target.style.backgroundColor === "black") return;
    if (!targetColor.current) {
      targetColor.current = clickEvent.target.style.backgroundColor;
      const interval = setInterval(() => {
        time.current -= 1;
        if (time.current === 0) {
          time.current = 3;
          alert("select new color");
          targetColor.current = "";
          currentScore.current -= 10;
          clearInterval(interval);
        }
      }, 1000);
    }
    if(targetColor.current === clickEvent.target.style.backgroundColor){
      clickEvent.target.style.backgroundColor = "black";
      currentScore.current +=1;
      count.current += 1;
    }
    gameOverChecker();
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
          <h2>Score : {score}</h2>
          <button onClick={nextRound}>Next Round</button>
        </div>
      ) : (
        <div className="blocks-div">{mappedBlocks}</div>
      )}
    </div>
  );
};

export default Blocks;
