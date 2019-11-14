const DIVIDER = ' > ';

interface FinalObject {
  name: string;
  size: number;
}
const parseSynset = (synsetArray: any[], parentsWords?: string): FinalObject[] => {
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

    const childrenArray = parseSynset(synset.synset, name);
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

export default parseSynset;
