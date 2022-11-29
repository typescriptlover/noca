import { INote } from '@/types/interfaces';

export default function getNoteCoords(note: INote): { x: number; y: number } {
   return {
      x: parseFloat(
         (-note.x + (window.innerWidth / 2 - note.width / 2)).toFixed(1)
      ),
      y: parseFloat(
         (-note.y + (window.innerHeight / 2 - note.height / 2)).toFixed(1)
      ),
   };
}
