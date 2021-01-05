import { HighlightData } from './highlightData';

import { expect } from 'chai';
import 'mocha';

const PREFIX = 'prefix ';
const POSTFIX = ' postfix';
const SEARCH_KEY = 'key';
const CLASS_NAME = 'highlighted';

const NAME = PREFIX + SEARCH_KEY + POSTFIX;
const EMPTY_SEARCH_KEY = '';

describe('Highlight function', () => {
  it('should return highlighted DOM elements', () => {
    const result = HighlightData(SEARCH_KEY, NAME);
    expect(Array.isArray(result)).to.equal(true);
    if (!Array.isArray(result)) {
      return;
    }

    expect(result[0].props.children).to.equal(PREFIX);
    expect(JSON.stringify(result[1].props.children[0].props)).to.equal(
      JSON.stringify({ className: CLASS_NAME, children: SEARCH_KEY })
    );
    expect(result[1].props.children[1]).to.equal(POSTFIX);
  });

  it('should return untouched name when empty string', () => {
    const result = HighlightData(EMPTY_SEARCH_KEY, NAME);
    expect(Array.isArray(result)).to.equal(false);
    if (Array.isArray(result)) {
      return;
    }

    expect(result.props.children).to.equal(NAME);
  });
});
