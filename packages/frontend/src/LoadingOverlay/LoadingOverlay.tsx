import * as React from 'react';
import './LoadingOverlay.scss';

const LOADING_TEXT = 'Loading';

export default class LoadingOverlay extends React.Component {
  private baseClass = 'loading-overlay';

  public render() {
    return (
      <div className={`${this.baseClass}`}>
        <div className={`${this.baseClass}__overlay`}>
          <h1 className={`${this.baseClass}__name`}>{`${LOADING_TEXT}`}</h1>
        </div>
      </div>
    );
  }
}
