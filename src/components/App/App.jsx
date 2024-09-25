import { Component } from 'react';
import './App.css';

import Api from '../../api/api.js';
import Header from '../Header/Header.jsx';
import { ApiProvider } from '../../context/context.jsx';
import SearchingPage from '../SearchingPage/SearchingPage.jsx';
import RatingPage from '../RatingPage/RatingPage.jsx';

export default class App extends Component {
  state = {
    genres: {},
    tab: '1',
    error: false,
  };

  componentDidMount() {
    this.api.getGenres().then((genresObj) => {
      this.setState({ genres: genresObj });
    });
  }
  componentDidCatch() {
    this.setState({ error: 'something has gone wrong' });
  }
  api = new Api();

  getTab = (key = '1') => {
    this.setState({ tab: key });
  };
  mountPage = () => {
    if (this.state.tab === '1') {
      return <SearchingPage genres={this.state.genres}></SearchingPage>;
    }
    if (this.state.tab === '2') {
      return <RatingPage genres={this.state.genres}></RatingPage>;
    }
  };

  render() {
    return (
      <ApiProvider value={this.api}>
        <div className="MovieDB__App, App">
          <Header className="header App__header" getTab={this.getTab} />
          <main className="main App__main">{this.mountPage()}</main>
        </div>
      </ApiProvider>
    );
  }
}
