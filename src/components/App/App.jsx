import { Component } from 'react';
import { Online, Offline } from 'react-detect-offline';
import { debounce } from 'lodash';

import Api from '../../api/api.js';
import MovieList from '../MovieList/MovieList.jsx';
import Spin from '../Spin/Spin.jsx';
import { customAlert as Alert } from '../Alert/Alert.jsx';
import Header from '../Header/Header.jsx';
import Pagination from '../Pagination/Pagination.jsx';

export default class App extends Component {
  state = {
    movies: [],
    loading: true,
    error: false,
    searching: '',
    page: 1,
  };

  componentDidMount() {
    this.get(this.state.searching, this.state.page);
  }
  api = new Api();
  get = debounce((searching, page) => {
    if (searching === '') {
      this.setState({ loading: false });
      return;
    }
    this.setState({ loading: true });
    this.api.getMovies(searching, page).then(
      (results) => {
        this.setState({ movies: results });
        this.setState({ loading: false });
        this.setState({ error: false });
      },
      (error) => {
        this.setState({ loading: false });
        this.setState({ error: error.message });
      }
    );
  }, 1000);

  isLoad = () => {
    if (this.state.loading) {
      return <Spin></Spin>;
    } else if (!this.state.error) {
      if (this.state.searching === '') {
        return;
      }
      return <MovieList movies={this.state.movies} className="movieList" />;
    } else {
      return (
        <>
          <Offline> {Alert(`Проверьте соединение ${this.state.error}`)} </Offline>
          <Online> {Alert(`Не удалось получить данные ${this.state.error}`)} </Online>
        </>
      );
    }
  };
  getSearch = (event) => {
    const newSearching = event.target.value;
    this.setState({ searching: newSearching });
    this.setState({ page: 1 });
    this.get(newSearching, 1);
  };

  getPage = (newPage) => {
    this.setState({ page: newPage });
    this.get(this.state.searching, newPage);
  };
  render() {
    return (
      <div className="App">
        <Header search={this.state.searching} getSearch={this.getSearch} />
        <main className="main App__main">{this.isLoad()}</main>
        <Pagination searching={this.state.searching} page={this.state.page} getPage={this.getPage}></Pagination>
      </div>
    );
  }
}
