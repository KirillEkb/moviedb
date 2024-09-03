import { Component } from 'react';

import Api from '../api/api';
import MovieList from '../MovieList/MovieList.jsx';

export default class App extends Component {
  state = {
    movies: [],
  };
  Api = new Api();
  constructor() {
    super();
    this.get();
  }
  get = () => {
    this.Api.getMovies().then((results) => {
      this.setState({ movies: results });
    });
  };
  render() {
    return (
      <div className="App">
        <header className=" header App__header">
          <h1 className="title App__title ">MovieDB</h1>
        </header>
        <main className="main App__main">
          <MovieList className="movieList" />
        </main>
      </div>
    );
  }
}
