import * as React from 'react';
import './FinalObject.scss';
import { HighlightData } from './highlightData';
import AnimateHeight from 'react-animate-height';

export interface FinalObjectProps {
  name: string;
  size: number;
  children?: FinalObjectProps[];
  searchKey: string;
  hidden?: boolean;
  level: number;
  index: number;
}

export default class FinalObject extends React.Component<FinalObjectProps> {
  public state = { opened: false, openedClass: false, shown: false };
  private baseClass = 'final-object';

  private toggle = () => {
    this.setState({ openedClass: !this.state.openedClass });

    if (this.state.opened) {
      setTimeout(() => {
        this.setState({ opened: !this.state.opened });
      }, 500);
      return;
    }
    this.setState({ opened: !this.state.opened });
  };

  public componentDidMount() {
    this.setState({ shown: true });
  }

  public render() {
    return (
      <div className={`${this.baseClass}`}>
        <div className={`${this.baseClass}__header`}>
          <AnimateHeight
            duration={500}
            height={this.state.shown && !this.props.hidden ? 'auto' : 0}
            style={{ width: '100%' }}
          >
            <button
              title={`${this.props.name} (${this.props.size})`}
              className={`${this.baseClass}__toggle-button${this.state.openedClass ? ' opened' : ''}${
                !this.props.children || this.props.children.length === 0 ? ' leave' : ''
              }`}
              onClick={() => this.toggle()}
            >
              {Array.from(new Array(this.props.level).keys()).map(index => (
                <span key={index} className={`${this.baseClass}__placeholder`}>
                  &nbsp;
                </span>
              ))}
              {this.props.children && this.props.children.length > 0 && (
                <span className={`${this.baseClass}__open-marker`}>◀</span>
              )}
              {(!this.props.children || this.props.children.length === 0) && (
                <span className={`${this.baseClass}__leave-placeholder`}>&nbsp;</span>
              )}
              {HighlightData(this.props.searchKey, this.props.name)}
              {` (${this.props.size})`}
            </button>
          </AnimateHeight>
        </div>
        <div className={`${this.baseClass}__children`}>
          {this.state.opened &&
            this.props.children &&
            this.props.children
              // .filter(child => !child.hidden)
              .map(child => (
                <FinalObject
                  key={child.index}
                  {...child}
                  searchKey={this.props.searchKey}
                  hidden={!this.state.openedClass || child.hidden || this.props.hidden}
                  level={this.props.level + 1}
                />
              ))}
        </div>
      </div>
    );
  }
}
