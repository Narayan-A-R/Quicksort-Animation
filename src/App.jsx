import { useState } from "react";
import "./App.css";
import {
  n,
  gapHorz,
  gapVert,
  arrBoxHeight,
  horizRoom,
  vertRoom,
} from "./Constants";
import { sleep } from "./Utils";
function App() {
  const [positions, setPositions] = useState(
    Array.from({ length: n }, (_, i) => ({
      id: i,
      val: i + 1,
      x: horizRoom + i * arrBoxHeight + i * gapHorz,
      y: vertRoom + arrBoxHeight + gapVert,
    }))
  );

  const arr = positions.map((p) => p.val);

  const animateMoveUp = (a) => {
    setPositions((prev) =>
      prev.map((pos, i) =>
        i === a ? { ...pos, y: pos.y - (gapVert + arrBoxHeight) } : pos
      )
    );
  };
  const animateMoveDown = (a) => {
    setPositions((prev) =>
      prev.map((pos, i) =>
        i === a ? { ...pos, y: pos.y + (gapVert + arrBoxHeight) } : pos
      )
    );
  };

  const animateMoveRight = (a) => {
    setPositions((prev) =>
      prev.map((pos, i) =>
        i === a ? { ...pos, x: pos.x + (gapHorz + arrBoxHeight) } : pos
      )
    );
  };
  const animateMoveLeft = (a) => {
    setPositions((prev) =>
      prev.map((pos, i) =>
        i === a ? { ...pos, x: pos.x - (gapHorz + arrBoxHeight) } : pos
      )
    );
  };
  const partition = async (start, end) => {
    let pivot = arr[start];
    let low = start;
    let high = end;
    while (low <= high) {
      while (arr[low] <= pivot) {
        low++;
      }
      while (arr[high] > pivot) {
        high--;
      }
      if (low <= high) {
        await swap(low, high);
      }
    }
    await swap(start, high);
    return high;
  };
  const quicksort = async (start, end) => {
    if (end <= start) {
      return;
    }
    let pivot = await partition(start, end);
    await quicksort(start, pivot - 1);
    await quicksort(pivot + 1, end);
  };
  const shuffle = async () => {
    for (let i = positions.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      await swap(i, j);
    }
  };

  const swap = async (a, b) => {
    if (a === b) return;
    if (a > b) [a, b] = [b, a];
    const distance = Math.abs(b - a);

    animateMoveUp(a);
    animateMoveDown(b);

    await sleep(250);

    for (let i = 0; i < distance; i++) {
      animateMoveRight(a);
      animateMoveLeft(b);
      await sleep(250);
    }

    animateMoveDown(a);
    animateMoveUp(b);

    await sleep(250);

    [arr[a], arr[b]] = [arr[b], arr[a]];
    setPositions((prev) => {
      const copy = [...prev];
      [copy[a], copy[b]] = [copy[b], copy[a]];
      return copy;
    });
    await sleep(50);
  };

  const boxes = positions.map((pos) => (
    <div
      key={pos.id}
      className="arrayBox"
      style={{
        top: `${pos.y}px`,
        left: `${pos.x}px`,
      }}
    >
      {pos.val}
    </div>
  ));

  return (
    <div className="ViewWindow">
      <div className="visuals">{boxes}</div>
      <div className="infoContainer">
        <div className="informer pseudocode">
          <button onClick={() => swap(0, 1)}>Swap</button>
          <button onClick={() => shuffle()}>shuffle</button>
          <button onClick={() => quicksort(0, n - 1)}>sort</button>
        </div>
        <div className="informer controls"></div>
        <div className="informer indices"></div>
      </div>
    </div>
  );
}

export default App;
