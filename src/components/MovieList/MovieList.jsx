import { Component } from 'react';
import './MovieList.css';
import { Flex } from 'antd';

import Api from '../api/api';
import MovieCard from '../MovieCard/MovieCard';

export default class MovieList extends Component {
  state = {
    movieList: [],
  };
  Api = new Api();

  constructor() {
    super();
    this.getMovies();
  }
  getMovies() {
    this.Api.getMovies().then((movieArr) => this.setState({ movieList: movieArr }));
  }

  render() {
    const movieList = this.state.movieList;
    const elements = movieList.map((film, index) => {
      if (index > 5) {
        return null;
      }
      return <MovieCard key={film.id} film={film} flex-shrink="0"></MovieCard>;
    });
    return (
      <Flex component="ul" className="movieList">
        {elements}
      </Flex>
    );
  }
}
