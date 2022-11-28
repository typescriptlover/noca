import PouchDB from 'pouchdb';

import { INote } from '@/types/interfaces';

export const db = new PouchDB('noca');

export async function getAllNotes() {
   return db.allDocs<INote>({
      include_docs: true,
      descending: true,
   });
}

export async function createNote(note: INote & PouchDB.Core.IdMeta) {
   return db.put<INote>({
      ...note,
   });
}

export async function getNote(_id: string) {
   return db.get<INote>(_id);
}

export async function updateNote(_id: string, newNote: INote) {
   const note = await getNote(_id);

   return db
      .put<INote>({
         _id,
         _rev: note._rev,
         ...newNote,
      })
      .then((n) => n)
      .catch(() => false);
}

export async function deleteNote(_id: string) {
   const note = await getNote(_id);

   return db.remove(note);
}
