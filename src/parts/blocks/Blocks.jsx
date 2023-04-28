import React, { useEffect, useRef, useState } from "react";

const Blocks = () => {
  const [BlocksData, setBlocksData] = useState([]);
  const colors = ["#002984", "#ba000d", "#006400", "#e1d9d1"];
  const blocksRef = useRef([]);

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

  const randomNumber = () => {
    return Math.floor(Math.random() * 4);
  };

  //get Element row and column
  const getBlockData = (block) => {
    const selectedRow = Number(block.id.slice(0, 1));
    const selectedColumn = Number(block.id.slice(2, 3));
    const selectedColor = block.style.backgroundColor;
    return { selectedRow, selectedColumn, selectedColor };
  };

  ///click handler
  const sameBlocksDestructure = (event) => {
    const clickedBlockData = getBlockData(event.target);
    const conditions = [
      `${clickedBlockData.selectedRow}-${clickedBlockData.selectedColumn + 1}`,
      `${clickedBlockData.selectedRow}-${clickedBlockData.selectedColumn - 1}`,
      `${clickedBlockData.selectedRow - 1}-${clickedBlockData.selectedColumn}`,
      `${clickedBlockData.selectedRow + 1}-${clickedBlockData.selectedColumn}`,
    ];
    const filteredBlocks = blocksRef.current.filter((item) => {
      return (
        item.id.includes(conditions[0]) ||
        item.id.includes(conditions[1]) ||
        item.id.includes(conditions[2]) ||
        item.id.includes(conditions[3])
      );
    });
     filteredBlocks.forEach((item) => {
      if(!(item.style.backgroundColor == clickedBlockData.selectedColor)) return ;
      event.target.style.display= "none";
      item.style.display = "none";
      console.log(item);
    })
  };

  ///mapping blocks data
  const mappedBlocks = BlocksData.map((item, i) => (
    <div
      onClick={sameBlocksDestructure}
      ref={(element) => (blocksRef.current[i] = element)}
      className="block"
      style={{ backgroundColor: colors[randomNumber()] }}
      key={item.id}
      id={`${item.row}-${item.column}`}
    ></div>
  ));

  return <div className="blocks-div">{mappedBlocks}</div>;
};

export default Blocks;
