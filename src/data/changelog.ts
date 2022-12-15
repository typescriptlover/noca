import { IChangelog } from '@/types/interfaces';

// TODO: separate these into its own md file, and use react-markdown with remark-gfm
const changelog: IChangelog[] = [
   {
      title: 'Changelog system',
      type: 'feature',
      description:
         'On every new feature release, a changelog update is pushed highlighting what was added or changed.',
      createdAt: '12/15/2022',
   },
   {
      title: 'Canvas mode',
      type: 'experimental',
      description:
         'A small and straight-forward way of indicating what mode you are currently in, currently only supports tools but will support global modes.',
      createdAt: '12/15/2022',
   },
   {
      title: 'Markdown support',
      type: 'feature',
      description:
         'Added WYSIWYG editor inside note using tiptap, basic markdown for now but custom plugins soon.',
      createdAt: '12/15/2022',
   },
   {
      title: 'Introduction',
      type: 'feature',
      description:
         'A one-time overlay to introduce the user to no-ca for the first time before beginning their noting journey.',
      createdAt: '12/15/2022',
   },
];

export default changelog;
