import * as React from "react";

interface GridControllsProps {
  propName?: string;
}

const GridControlls: React.FC<GridControllsProps> = () => {
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
