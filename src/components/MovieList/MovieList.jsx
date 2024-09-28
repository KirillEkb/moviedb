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
    genres: PropTypes.object.isRequired,
  };
  render() {
    if (!this.props.movies.length && this.props.searching) {
      return <h3>Nothing found</h3>;
    } else {
      return (
        <Flex component="ul" className="movieList ratingPage__movieList">
          {this.props.movies.map((film) => {
            const genresOfMovie = film.genre_ids.map((genre) => {
              return this.props.genres[genre];
            });
            return (
              <MovieCard
                postRating={this.props.postRating}
                key={film.id}
                film={film}
                genres={genresOfMovie}
              ></MovieCard>
            );
          })}
        </Flex>
      );
    }
  }
}
