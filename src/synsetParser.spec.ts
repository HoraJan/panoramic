import synsetParser from './synsetParser';
import { expect } from 'chai';
import 'mocha';

const testArray = [
  {
    $: {
      words: 'First'
    },
    synset: [
      {
        $: {
          words: 'First.First'
        },
        synset: [
          {
            $: {
              words: 'First.First.First'
            }
          },
          {
            $: {
              words: 'First.First.Second'
            },
            synset: [
              {
                $: {
                  words: 'First.First.Second.First'
                }
              },
              {
                $: {
                  words: 'First.First.Second.Second'
                }
              }
            ]
          }
        ]
      },
      {
        $: {
          words: 'First.Second'
        }
      }
    ]
  }
];

const expectedArray = [
  {
    name: 'First',
    size: 6
  },
  {
    name: 'First > First.First',
    size: 4
  },
  {
    name: 'First > First.First > First.First.First',
    size: 0
  },
  {
    name: 'First > First.First > First.First.Second',
    size: 2
  },
  {
    name: 'First > First.First > First.First.Second > First.First.Second.First',
    size: 0
  },
  {
    name: 'First > First.First > First.First.Second > First.First.Second.Second',
    size: 0
  },
  {
    name: 'First > First.Second',
    size: 0
  }
];

describe('synset Parser', () => {
  it('should return expected array', () => {
    const result = synsetParser(testArray);
    expect(JSON.stringify(result)).to.equal(JSON.stringify(expectedArray));
  });
});
