import { atom } from 'jotai';

import { ICanvas, INote } from '@/interfaces';
import { TTools } from '@/types';

export const busy = atom<boolean>(false);
export const jumping = atom<boolean>(false);
export const cursor = atom<string>('auto');
export const canvas = atom<ICanvas>({
   x: 0,
   y: 0,
   scale: 1,
});
export const tools = atom<TTools>({
   create: true,
   select: false,
   move: false,
});

export const notes = atom<INote[]>([]);