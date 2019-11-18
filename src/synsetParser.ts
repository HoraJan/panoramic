const DIVIDER = ' > ';

export interface FinalObject {
  name: string;
  size: number;
  children?: FinalObject[];
}
export const parseSynsetToArray = (synsetArray: any[], parentsWords?: string): FinalObject[] => {
  const finalArray = synsetArray.map(synset => {
    const name = parentsWords ? parentsWords + DIVIDER + synset['$'].words : synset['$'].words;

    if (!synset.synset) {
      return [
        {
          name: name,
          size: 0
        }
      ];
    }

    const childrenArray = parseSynsetToArray(synset.synset, name);
    const currentObject = {
      name: name,
      size: childrenArray.length
    };

    return [currentObject, ...childrenArray];
  });

  let response: FinalObject[] = [];

  finalArray.forEach(object => {
    response = [...response, ...object];
  });

  return response;
};

export const parseSynsetToObject = (arrayData: FinalObject[]): FinalObject => {
  let response: FinalObject = {
    name: 'Top level temporary object', //created 0 level object, so actuall top level object could be hanled same way as any other level
    size: -1,
    children: []
  };

  arrayData.forEach(object => {
    let currentObject = response;
    const treeLevelNamesArray = object.name.split(DIVIDER);

    treeLevelNamesArray.forEach(levelName => {
      let targetObject = (currentObject.children || []).filter(child => child.name === levelName)[0];

      if (!!!targetObject) {
        targetObject = { name: levelName, size: 0 };
        currentObject.children = [...(currentObject.children || []), targetObject];
      }

      currentObject = targetObject;
    });

    currentObject.size = object.size;
  });

  //returns only first top level objects. Has to be refactored if more then one top level objects should exist
  return (response.children || [])[0];
};
