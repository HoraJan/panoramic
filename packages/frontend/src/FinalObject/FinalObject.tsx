import * as React from 'react';
import './FinalObject.scss';
import { HighlightData } from './highlightData';

export interface FinalObjectProps {
  name: string;
  size: number;
  children?: FinalObjectProps[];
  searchKey: string;
}

export default class FinalObject extends React.Component<FinalObjectProps> {
  public state = { opened: false };
  private baseClass = 'final-object';

  private toggle = () => {
    this.setState({ opened: !this.state.opened });
  };

  public render() {
    return (
      <div className={`${this.baseClass}`}>
        <div className={`${this.baseClass}__header`}>
          {
            <button
              className={`${this.baseClass}__toggle-button${this.state.opened ? ' opened' : ''}`}
              onClick={() => this.toggle()}
            >
              {this.props.children && this.props.children.length > 0 && (
                <span className={`${this.baseClass}__open-marker`}>></span>
              )}
              {HighlightData(this.props.searchKey, this.props.name)}
              {` (${this.props.size})`}
            </button>
          }
        </div>
        <div className={`${this.baseClass}__children`}>
          {this.state.opened &&
            this.props.children &&
            this.props.children.map((child, index) => (
              <FinalObject key={index} {...child} searchKey={this.props.searchKey} />
            ))}
        </div>
      </div>
    );
  }
}
