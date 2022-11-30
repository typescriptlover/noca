import create from 'zustand';

import { ICanvas, INote } from '@/types/interfaces';
import { TTools } from '@/types/types';

export interface State {
   canvas: ICanvas;
   notes: (INote & PouchDB.Core.IdMeta)[];
   tools: TTools;
   cursor: string;
   jumping: boolean;
   busy: boolean;
   updateCanvas: (newCanvas: Partial<ICanvas>) => void;
   updateNotes: (newNotes: (INote & PouchDB.Core.IdMeta)[]) => void;
   updateNote: (
      _id: string,
      newNote: Partial<INote & PouchDB.Core.IdMeta>
   ) => void;
   createNote: (note: INote & PouchDB.Core.IdMeta) => void;
   deleteNote: (_id: string) => void;
   updateTools: (tools: TTools) => void;
   updateCursor: (cursor: string) => void;
   updateJumping: (jumping: boolean) => void;
   updateBusy: (busy: boolean) => void;
}

const useBearStore = create<State>((set) => ({
   canvas: {
      x: 0,
      y: 0,
      scale: 1,
   },
   notes: [],

   tools: {
      create: true,
      select: false,
      move: false,
   },
   cursor: 'auto',
   jumping: false,
   busy: false,
   updateCanvas: (newCanvas: Partial<ICanvas>) => {
      set((state) => ({
         canvas: {
            ...state.canvas,
            ...newCanvas,
         },
      }));
   },
   updateNotes: (newNotes: (INote & PouchDB.Core.IdMeta)[]) => {
      set(() => ({
         notes: newNotes,
      }));
   },
   updateNote: (_id: string, newNote: Partial<INote>) => {
      set((state) => ({
         notes: state.notes.map((note) => {
            if (note._id === _id) {
               return {
                  ...note,
                  ...newNote,
               };
            }
            return note;
         }),
      }));
   },
   createNote: (note: INote & PouchDB.Core.IdMeta) => {
      set((state) => ({
         notes: [note, ...state.notes],
      }));
   },
   deleteNote: (_id: string) => {
      set((state) => ({
         notes: state.notes.filter((note) => note._id !== _id),
      }));
   },
   updateTools: (tools: TTools) => {
      set((state) => ({
         tools: {
            ...state.tools,
            ...tools,
         },
      }));
   },
   updateCursor: (cursor: string) => {
      set(() => ({
         cursor,
      }));
   },
   updateJumping: (jumping: boolean) => {
      set(() => ({
         jumping,
      }));
   },
   updateBusy: (busy: boolean) => {
      set(() => ({
         busy,
      }));
   },
}));

export default useBearStore;
