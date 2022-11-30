import { useEffect, useState } from 'react';

import useBearStore from '@/lib/state';
import * as db from '@/lib/db';

export default function useNotesStorage() {
   const [loaded, setLoaded] = useState<boolean>(false);
   const [notes, updateNotes] = useBearStore((state) => [
      state.notes,
      state.updateNotes,
   ]);

   useEffect(() => {
      async function init() {
         const all = await db.getAllNotes();

         if (all.rows.length) {
            const docs = all.rows.map((r) => {
               const { _rev, _attachments, _conflicts, ...note } = r.doc!;
               return note;
            });
            console.log(docs);
            updateNotes(docs);
         }

         setLoaded(true);
      }

      if (!loaded && !notes.length) init();
   }, [updateNotes, loaded, notes]);
}
