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
  const arrBoxHeight = (visualsBoxHeight - 2 * vertRoom - 2 * gapVert) / 3;
  const gapHorz =
    (visualsBoxWidth - 2 * horizRoom - n * arrBoxHeight) / (n - 1);

  const [positions, setPositions] = useState(
    Array.from({ length: n }, (_, i) => ({
      x: horizRoom + i * arrBoxHeight + i * gapHorz,
      y: vertRoom + arrBoxHeight + gapVert,
    }))
  );

  const moveUp = (i) => {
    setPositions((positions) => positions.map((pos,ind)=>
      ind===i?{x:pos.x,y:pos.y-(gapVert+arrBoxHeight)}:pos
    ))
  };

  const boxes = positions.map((pos, i) => (
    <div
        key={i}
        className="arrayBox"
        style={{
          top: `${pos.y}px`,
          left: `${pos.x}px`,
        }}
        onClick={()=>moveUp(i)}
      >
        {i + 1}
      </div>
  ));
  return (
    <>
      <div className="ViewWindow">
        <div className="visuals">{boxes}</div>
        <div className="infoContainer">
          <div className="informer pseudocode"></div>
          <div className="informer controls"></div>
          <div className="informer indices"></div>
        </div>
      </div>
    </>
  );
}

export default App;
