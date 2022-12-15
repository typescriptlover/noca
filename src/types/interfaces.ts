export interface ICanvas {
   x: number;
   y: number;
   scale: number;
}

export interface INote {
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

export interface IChangelog {
   title: string;
   type: 'feature' | 'update' | 'experimental';
   description: string;
   createdAt: string;
}
