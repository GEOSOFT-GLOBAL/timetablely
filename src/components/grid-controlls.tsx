import * as React from "react";

interface GridControllsProps {
  propName: type;
}

const GridControlls: React.FC<GridControllsProps> = ({ propName }) => {
  return (
    <div>
      <div>
        <button onClick={() => {}}>Add Row</button>
        <button onClick={() => {}}>Add Column</button>
      </div>
    </div>
  );
};

export default GridControlls;
