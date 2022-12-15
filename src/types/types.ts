export type TTab = 'notes' | 'guide' | 'changelog';
export type TTool = 'create' | 'select' | 'move';
export type TTools = {
   [key in TTool]: boolean;
};
