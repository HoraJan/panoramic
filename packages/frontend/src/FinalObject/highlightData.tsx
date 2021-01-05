import * as React from 'react';

export const HighlightData = (searchKey: string, name: string) => {
  if (searchKey.length === 0) {
    return <span>{name}</span>;
  }

  const splittedString = name.split(searchKey);

  return splittedString.map((curr, index) => {
    if (index === 0) {
      return <span key={index}>{curr}</span>;
    }

    return (
      <span key={index}>
        <span className={'highlighted'}>{searchKey}</span>
        {curr}
      </span>
    );
  });
};
