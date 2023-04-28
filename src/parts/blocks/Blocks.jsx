import React, { useEffect, useState } from "react";

const Blocks = () => {
  const [BlocksData, setBlocksData] = useState([]);
  const colors = ["#002984","#ba000d","#006400","#e1d9d1"];

  ///set row and column
  useEffect(() => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        setBlocksData((BlocksData) => [
          ...BlocksData,
          { BlocksData: i, column: j, id: `${i}${j}` },
        ]);
      }
    }
    return () => {
      setBlocksData(() => []);
    };
  }, []);

  const randomNumber = ()=>{
    return Math.floor(Math.random()*4);
  }
  ///mapping blocks data
  const mappedBlocks = BlocksData.map((item) => (
    <div className="block" style={{backgroundColor:colors[randomNumber()]}} key={item.id}></div>
  ));

  return <div className="blocks-div">{mappedBlocks}</div>;
};

export default Blocks;
