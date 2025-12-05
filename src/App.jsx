import { useState } from "react";
import "./App.css";
import { gapHorz, gapVert, arrBoxHeight } from "./Constants";
import { horizRoom, vertRoom, n } from "./Constants";
import { vh, vw } from "./Constants";
import { animateMoveUp, animateMoveDown } from "./Animations";
import { animateMoveLeft, animateMoveRight } from "./Animations";
import { initialisePivot, initialiseHigh, initialiseLow } from "./Animations";
import { sleep } from "./Utils";
function App() {
  const [positions, setPositions] = useState(
    Array.from({ length: n }, (_, i) => ({
      id: i,
      val: i + 1,
      x: horizRoom + i * arrBoxHeight + i * gapHorz + gapVert,
      y: vertRoom + arrBoxHeight + gapVert,
    }))
  );
  const [isSorting, setIsSorting] = useState(false);
  const arr = positions.map((p) => p.val);
  const [pivotPosition, setPivotPosition] = useState({
    id: -1,
    x: horizRoom,
    y: vertRoom + arrBoxHeight,
  });
  const [lowPosition, setLowPosition] = useState({
    id: -1,
    x: horizRoom + arrBoxHeight + gapHorz,
    y: vertRoom + arrBoxHeight,
  });
  const [highPosition, setHighPosition] = useState({
    id: -1,
    x: horizRoom + (n - 1) * arrBoxHeight + (n - 1) * gapHorz,
    y: vertRoom + arrBoxHeight,
  });


  const partition = async (start, end) => {
    initialisePivot(start, setPivotPosition);
    initialiseLow(start, setLowPosition);
    initialiseHigh(end, setHighPosition);

    let pivot = arr[start];
    let low = start + 1;
    let high = end;
    while (low <= high) {
      while (arr[low] <= pivot) {
        setLowPosition((prev) => ({
          ...prev,
          x: prev.x + (gapHorz + arrBoxHeight),
          y: prev.y,
        }));
        await sleep(250);
        low++;
      }
      while (arr[high] > pivot) {
        setHighPosition((prev) => ({
          ...prev,
          x: prev.x - (gapHorz + arrBoxHeight),
          y: prev.y,
        }));
        await sleep(250);
        high--;
      }
      if (low <= high) {
        await swapAnimated(low, high);
      }
    }
    await swapAnimated(start, high);
    return high;
  };
  const quicksort = async (start, end) => {
    setIsSorting(true);
    if (end <= start) {
      return;
    }
    let pivot = await partition(start, end);
    await quicksort(start, pivot - 1);
    await quicksort(pivot + 1, end);
    setIsSorting(false);
  };
  const shuffle = async () => {
    for (let i = positions.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      await swapAnimated(i, j);
    }
  };

  const swapAnimated = async (a, b) => {
    if (a === b) return;
    if (a > b) [a, b] = [b, a];
    const distance = b-a;
    animateMoveUp(a, setPositions);
    animateMoveDown(b, setPositions);
    await sleep(250);

    for (let i = 0; i < distance; i++) {
      animateMoveRight(a, setPositions);
      animateMoveLeft(b, setPositions);
      await sleep(250);
    }

    animateMoveDown(a, setPositions);
    animateMoveUp(b, setPositions);

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
        top: `${pos.y/vh}vh`,
        left: `${pos.x / vw}vw`,
      }}
    >
      {pos.val}
    </div>
  ));

  const pivot = (
    <div
      key={-1}
      className="pivot"
      style={{
        top: `${pivotPosition.y/vh}vh`,
        left: `${pivotPosition.x/vw}vw`,
      }}
    ></div>
  );

  const low = (
    <div
      key={-2}
      className="low"
      style={{
        top: `${lowPosition.y/vh}vh`,
        left: `${lowPosition.x/vw}vw`,
      }}
    ></div>
  );
  const high = (
    <div
      key={-3}
      className="high"
      style={{
        top: `${highPosition.y/vh}vh`,
        left: `${highPosition.x/vw}vw`,
      }}
    ></div>
  );
  return (
    <div className="ViewWindow">
      <div className="visuals">
        {isSorting && pivot}
        {isSorting && low}
        {isSorting && high}
        {boxes}
      </div>
      <div className="infoContainer">
        <div className="informer pseudocode">
          <button onClick={() => swapAnimated(0, 1)}>Swap</button>
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
