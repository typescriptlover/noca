export interface ICanvas {
   x: number;
   y: number;
   scale: number;
}

export interface INote {
   id: number;
   note: string;
   x: number;
   y: number;
   width: number;
   height: number;
}
export interface IMouseCoords {
   x: number;
   y: number;
}