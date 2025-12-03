export const n = 7;

export const vh = window.innerHeight / 100;
export const vw = window.innerWidth / 100;

export const visualsBoxHeight = 30 * vh;
export const visualsBoxWidth = 80 * vw;

export const horizRoom = 3 * vw;
export const vertRoom = 1 * vh;

export const gapVert = 0.5 * vh;
export const arrBoxHeight = (visualsBoxHeight - 2 * vertRoom - 2 * gapVert) / 3;


export const gapHorz = (visualsBoxWidth - 2 * horizRoom - n * arrBoxHeight) / (n - 1);


