import { FilterData } from './filterData';
import { FinalObjectProps } from '../FinalObject/FinalObject';

import { expect } from 'chai';
import 'mocha';

const SEARCH_KEY = 'test string';

const testChidrenArray: FinalObjectProps[] = [
  {
    name: 'should be filtered',
    size: 1,
    searchKey: SEARCH_KEY
  },
  {
    name: 'should be kept',
    size: 1,
    searchKey: SEARCH_KEY,
    children: [
      {
        name: 'prefix-' + SEARCH_KEY + '-postfix',
        size: 1,
        searchKey: SEARCH_KEY
      }
    ]
  }
];
const expectedArray: FinalObjectProps[] = [
  {
    name: 'should be kept',
    size: 1,
    searchKey: 'test string',
    children: [{ name: 'prefix-test string-postfix', size: 1, searchKey: 'test string' }]
  }
];

describe('Filter Data function', () => {
  it('should return filtered children', () => {
    const result = FilterData(SEARCH_KEY, testChidrenArray);
    expect(JSON.stringify(result)).to.equal(JSON.stringify(expectedArray));
  });
});
