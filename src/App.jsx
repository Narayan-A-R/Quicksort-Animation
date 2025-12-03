import { useState } from "react";
import "./App.css";
import { n,gapHorz,gapVert,arrBoxHeight,horizRoom,vertRoom } from "./Constants";
import { sleep } from "./Utils";
function App() {
  const [positions, setPositions] = useState(
    Array.from({ length: n }, (_, i) => ({
      id: i,
      x: horizRoom + i * arrBoxHeight + i * gapHorz,
      y: vertRoom + arrBoxHeight + gapVert,
    }))
  );

  const moveUp = (pos) => ({
    ...pos,
    y: pos.y - (gapVert + arrBoxHeight),
  });

  const moveDown = (pos) => ({
    ...pos,
    y: pos.y + (gapVert + arrBoxHeight),
  });

  const moveRight = (pos) => ({
    ...pos,
    x: pos.x + (gapHorz + arrBoxHeight),
  });

  const moveLeft = (pos) => ({
    ...pos,
    x: pos.x - (gapHorz + arrBoxHeight),
  });

  const swap = async (a, b) => {
    const distance = Math.abs(b - a);
    setPositions((prev) =>
      prev.map((pos, i) =>
        i === a ? moveUp(pos) : i === b ? moveDown(pos) : pos
      )
    );
    await sleep(250);

    for (let i = 0; i < distance; i++) {
      setPositions((prev) =>
        prev.map((pos, idx) =>
          idx === a ? moveRight(pos) : idx === b ? moveLeft(pos) : pos
        )
      );
      await sleep(250);
    }

    setPositions((prev) =>
      prev.map((pos, i) =>
        i === a ? moveDown(pos) : i === b ? moveUp(pos) : pos
      )
    );
    await sleep(250);

    setPositions((prev) => {
      const copy = [...prev];
      const temp = copy[a];
      copy[a] = copy[b];
      copy[b] = temp;
      return copy;
    });
  };

  const boxes = positions.map((pos) => (
    <div
      key={pos.id}
      className="arrayBox"
      style={{
        top: `${pos.y}px`,
        left: `${pos.x}px`,
      }}
      onClick={() =>
        setPositions((ps) => ps.map((p) => (p.id === pos.id ? moveUp(p) : p)))
      }
    >
      {pos.id + 1}
    </div>
  ));

  return (
    <div className="ViewWindow">
      <div className="visuals">{boxes}</div>
      <div className="infoContainer">
        <div className="informer pseudocode">
          <button onClick={() => swap(0, 1)}>Swap</button>
          <button onClick={() => swap(0, 6)}>Swap</button>
        </div>
        <div className="informer controls"></div>
        <div className="informer indices"></div>
      </div>
    </div>
  );
}

export default App;
