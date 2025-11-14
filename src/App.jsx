import { useState } from "react";
import "./App.css";

function App() {
  const n = 7;
  const vh = window.innerHeight / 100;
  const vw = window.innerWidth / 100;

  const visualsBoxHeight = 30 * vh;
  const visualsBoxWidth = 80 * vw;

  const horizRoom = 3 * vw;
  const vertRoom = 1 * vh;

  const gapVert = 0.5 * vh;
  const arrBoxHeight =
    (visualsBoxHeight - 2 * vertRoom - 2 * gapVert) / 3;
  const gapHorz =
    (visualsBoxWidth - 2 * horizRoom - n * arrBoxHeight) / (n - 1);

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

  const swap = (a, b) => {
    const steps = [
      // Step 1: A goes up, B goes down
      (p) =>
        p.map((pos, i) =>
          i === a
            ? { ...pos, y: pos.y - (gapVert + arrBoxHeight) }
            : i === b
            ? { ...pos, y: pos.y + (gapVert + arrBoxHeight) }
            : pos
        ),
      // Step 2: They move horizontally
      (p) =>
        p.map((pos, i) =>
          i === a
            ? { ...pos, x: pos.x + (gapHorz + arrBoxHeight) }
            : i === b
            ? { ...pos, x: pos.x - (gapHorz + arrBoxHeight) }
            : pos
        ),
      // Step 3: A goes down, B goes up
      (p) =>
        p.map((pos, i) =>
          i === a
            ? { ...pos, y: pos.y + (gapVert + arrBoxHeight) }
            : i === b
            ? { ...pos, y: pos.y - (gapVert + arrBoxHeight) }
            : pos
        ),
    ];

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    (async () => {
      for (const step of steps) {
        setPositions((prev) => step(prev));
        await sleep(250);
      }
    })().then(() => {
      setPositions((prev) => {
        const copy = [...prev];
        const temp = copy[a];
        copy[a] = copy[b];
        copy[b] = temp;
        return copy;
      });
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
        setPositions((ps) =>
          ps.map((p) => (p.id === pos.id ? moveUp(p) : p))
        )
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
          <button onClick={() => swap(1, 2)}>Swap</button>
        </div>
        <div className="informer controls"></div>
        <div className="informer indices"></div>
      </div>
    </div>
  );
}

export default App;
