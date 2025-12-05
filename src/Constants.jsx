export const n = 7;

export const vh = window.innerHeight / 100;
export const vw = window.innerWidth / 100;

export const visualsBoxHeight = 30 * vh;
export const visualsBoxWidth = 80 * vw;

export const horizRoom = 3 * vw;
export const vertRoom = 1 * vh;

export const gapVert = 1 * vh;
export const arrBoxHeight = (visualsBoxHeight - 2 * vertRoom - 2 * gapVert) / 3;

// extra vertGap for ball
export const gapHorz = (visualsBoxWidth -2*gapVert- 2 * horizRoom - n * arrBoxHeight) / n;


