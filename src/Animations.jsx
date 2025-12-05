import { gapHorz, gapVert, arrBoxHeight } from "./Constants";
import { horizRoom, vertRoom } from "./Constants";
export const animateMoveUp = (a, setPositions) => {
  setPositions((prev) =>
    prev.map((pos, i) =>
      i === a ? { ...pos, y: pos.y - (gapVert + arrBoxHeight) } : pos
    )
  );
};
export const animateMoveDown = (a, setPositions) => {
  setPositions((prev) =>
    prev.map((pos, i) =>
      i === a ? { ...pos, y: pos.y + (gapVert + arrBoxHeight) } : pos
    )
  );
};

export const animateMoveRight = (a, setPositions) => {
  setPositions((prev) =>
    prev.map((pos, i) =>
      i === a ? { ...pos, x: pos.x + (gapHorz + arrBoxHeight) } : pos
    )
  );
};
export const animateMoveLeft = (a, setPositions) => {
  setPositions((prev) =>
    prev.map((pos, i) =>
      i === a ? { ...pos, x: pos.x - (gapHorz + arrBoxHeight) } : pos
    )
  );
};

export const initialisePivot = (start, setPivotPosition) => {
  setPivotPosition((prev) => ({
    ...prev,
    x: horizRoom + start * arrBoxHeight + start * gapHorz,
    y: prev.y,
  }));
};
export const initialiseLow = (start, setLowPosition) => {
  setLowPosition((prev) => ({
    ...prev,
    x: horizRoom + (start + 1) * arrBoxHeight + (start + 1) * gapHorz,
    y: prev.y,
  }));
};
export const initialiseHigh = (end, setHighPosition) => {
  setHighPosition((prev) => ({
    ...prev,
    x: horizRoom + end * arrBoxHeight + end * gapHorz,
    y: prev.y,
  }));
};

