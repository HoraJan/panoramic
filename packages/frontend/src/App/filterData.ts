import { FinalObjectProps } from '../FinalObject/FinalObject';
import { HighlightData } from '../FinalObject/highlightData';

const checkChild = (child: FinalObjectProps, key: string): FinalObjectProps => {
  if (child.children && child.children.length > 0) {
    child.children = child.children.map((child: FinalObjectProps) => checkChild(child, key));
  }

  if (key.length === 0) {
    child.hidden = false;
    return child;
  }

  child.hidden =
    !child.name.match(key) && (!child.children || child.children.filter(child => !child.hidden).length === 0);
  return child;
};

export const FilterData = (key: string, children: FinalObjectProps[]): FinalObjectProps[] => {
  const filteredChildren = children.map((child: FinalObjectProps) => checkChild(child, key));
  return filteredChildren;
};
