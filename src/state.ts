import { atom } from 'jotai';

import { ICanvas, INote } from '@/interfaces';

export const writing = atom<boolean>(false);

export const canvas = atom<ICanvas>({
   x: 0,
   y: 0,
   scale: 1,
});

export const notes = atom<INote[]>([]);
