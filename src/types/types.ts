export type TTab = 'notes' | 'bookmarks' | 'guide';
export type TTool = 'create' | 'select' | 'move';
export type TTools = {
   [key in TTool]: boolean;
};
