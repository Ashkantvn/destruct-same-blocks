import React, { useEffect, useRef, useState } from "react";

const Blocks = () => {
  const [BlocksData, setBlocksData] = useState([]);
  const colors = ["#002984", "#ba000d", "#006400", "#e1d9d1"];
  const [finishedGame, setfinishedGame] = useState(false);
  const blocksRef = useRef([]);
  const count = useRef(1);
  const randomNumber = () => {
    return Math.floor(Math.random() * 4);
  };

  ///set row and column
  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
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
    if(count.current>80)  setfinishedGame(true);
    count.current +=1;
    console.log(count.current);
  };
  ///click handler
  const sameBlocksDestructure = (clickEvent) => {
    if(clickEvent.target.style.backgroundColor === "black") return;
    clickEvent.target.style.backgroundColor = "black";
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
        <div className="game-over">Game over</div>
      ) : (
        <div className="blocks-div">{mappedBlocks}</div>
      )}
    </div>
  );
};

export default Blocks;
