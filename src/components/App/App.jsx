import { Component } from 'react';
import './App.css';

import Api from '../../api/api.js';
import Header from '../Header/Header.jsx';
import { ApiProvider } from '../../context/context.jsx';
import SearchingPage from '../SearchingPage/SearchingPage.jsx';
import RatingPage from '../RatingPage/RatingPage.jsx';

export default class App extends Component {
  state = {
    tab: '1',
    error: '',
  };
  api = new Api();
  static getDerivedStateFromError() {
    return { error: 'something has gone wrong' };
  }
  getTab = (key = '1') => {
    this.setState({ tab: key });
  };

  render() {
    const { getMovies, getRatedMovies, postRating } = this.api;
    return (
      <ApiProvider value={this.api.getGenres}>
        <div className="MovieDB__App, App">
          <Header className="header App__header" getTab={this.getTab} />
          <main className="main App__main">
            {this.state.tab === '1' ? (
              <SearchingPage
                postRating={postRating}
                getRatedMovies={getRatedMovies}
                getMovies={getMovies}
              ></SearchingPage>
            ) : (
              <RatingPage postRating={postRating} getRatedMovies={getRatedMovies}></RatingPage>
            )}
          </main>
        </div>
      </ApiProvider>
    );
  }
}
