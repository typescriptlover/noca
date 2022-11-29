import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import * as state from '@/lib/state';
import * as db from '@/lib/db';

export default function useNotesStorage() {
   const [loaded, setLoaded] = useState<boolean>(false);
   const [notes, setNotes] = useAtom(state.notes);

   useEffect(() => {
      async function init() {
         const all = await db.getAllNotes();

         if (all.rows.length) {
            const docs = all.rows.map((r) => {
               const { _rev, _attachments, _conflicts, ...note } = r.doc!;
               return note;
            });
            setNotes(docs);
         }

         setLoaded(true);
      }

      if (!loaded && !notes.length) init();
   }, [loaded, notes]);
}
