import { FinalObjectProps } from '../FinalObject/FinalObject';

const checkChild = (child: FinalObjectProps, key: string): boolean => {
  if (child.children && child.children.length > 0) {
    child.children = child.children.filter((child: FinalObjectProps) => checkChild(child, key));
  }

  return !!child.name.match(key) || (child.children && child.children.length > 0);
};

export const FilterData = (key: string, children: FinalObjectProps[]): FinalObjectProps[] => {
  if (!key.length) {
    return JSON.parse(JSON.stringify(children));
  }

  const filteredChildren = JSON.parse(JSON.stringify(children)).filter((child: FinalObjectProps) =>
    checkChild(child, key)
  );
  return filteredChildren;
};
