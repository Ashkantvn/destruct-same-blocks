import React, { useEffect, useState } from "react";

const Blocks = () => {
  const [BlocksData, setBlocksData] = useState([]);

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

  ///mapping blocks data
  const mappedBlocks = BlocksData.map((item) => (
    <div className="block" key={item.id}></div>
  ));

  return <div className="blocks-div">{mappedBlocks}</div>;
};

export default Blocks;
