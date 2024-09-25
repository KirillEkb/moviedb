import { Component } from 'react';
import './MovieList.css';
import { Flex } from 'antd';
import PropTypes from 'prop-types';

import MovieCard from '../MovieCard/MovieCard';

export default class MovieList extends Component {
  static defaultProps = {
    movies: [],
  };
  static propTypes = {
    movies: PropTypes.array,
    genres: PropTypes.object,
  };
  render() {
    if (!this.props.movies.length) {
      return <h3>Nothing found</h3>;
    } else {
      const elements = this.props.movies.map((film) => {
        const genresOfMovie = film.genre_ids.map((genre) => {
          return this.props.genres[genre];
        });
        return <MovieCard key={film.id} film={film} genres={genresOfMovie}></MovieCard>;
      });

      return (
        <Flex component="ul" className="movieList ratingPage__movieList">
          {elements}
        </Flex>
      );
    }
  }
}
