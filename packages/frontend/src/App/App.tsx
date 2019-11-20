import * as React from 'react';
import { Subject } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';
import './App.scss';

import FinalObject from '../FinalObject/FinalObject';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import { FetchData } from './fetchData';
import { FilterData } from './filterData';

interface AppProps {
  headline: string;
}

export default class App extends React.Component<AppProps> {
  private baseClass = 'app';
  private searchEvent$ = new Subject<string>();
  public state = {
    name: '',
    size: -1,
    children: new Array(),
    originChildren: new Array(),
    searchKey: '',
    loading: true
  };

  constructor(props: AppProps) {
    super(props);
    this.searchEvent$
      .pipe(
        debounceTime(300),
        tap(() => this.setState({ loading: true })),
        tap(key => {
          const filteredData = FilterData(key, this.state.originChildren);
          this.setState({ children: filteredData });
        }),
        tap(() => this.setState({ loading: false }))
      )
      .subscribe();
  }

  private clear = () => {
    this.setState({ searchKey: '' });
    this.searchEvent$.next('');
  };

  private handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchKey: event.target.value });
    this.searchEvent$.next(event.target.value);
  };

  public componentDidMount() {
    FetchData()
      .pipe(
        tap(response => this.setState({ ...response })),
        tap(() => this.setState({ originChildren: JSON.parse(JSON.stringify(this.state.children)) })),
        tap(() => this.setState({ loading: false }))
      )
      .subscribe();
  }

  public render() {
    return (
      <div className={`${this.baseClass}`}>
        <menu className={`${this.baseClass}__menu`}>
          <h1 className={`${this.baseClass}__headline`}>{this.props.headline}!</h1>
          <input type="text" value={this.state.searchKey} onChange={this.handleSearch} />
          {this.state.searchKey && <button onClick={() => this.clear()}>X</button>}
        </menu>
        <main className={`${this.baseClass}__content`}>
          {this.state.size > 0 && (
            <FinalObject
              name={this.state.name}
              size={this.state.size}
              children={this.state.children}
              searchKey={this.state.searchKey}
            />
          )}
          {this.state.loading && <LoadingOverlay />}
        </main>
      </div>
    );
  }
}
