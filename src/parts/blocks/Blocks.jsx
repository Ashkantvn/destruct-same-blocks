import React, { useEffect, useRef, useState } from "react";

const Blocks = () => {
  const [BlocksData, setBlocksData] = useState([]);
  const colors = ["#002984", "#ba000d", "#006400", "#e1d9d1"];
  const blocksRef = useRef([]);
  const targetColor = useRef("");
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


 

  ///click handler
  const sameBlocksDestructure = (clickEvent) => {
    if(!targetColor.current) {
      targetColor.current = clickEvent.target.style.backgroundColor;
      clickEvent.target.style.backgroundColor="black";
    };
    if(targetColor.current===clickEvent.target.style.backgroundColor){
      clickEvent.target.style.backgroundColor="black";
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

  return <div className="blocks-div">{mappedBlocks}</div>;
};

export default Blocks;
