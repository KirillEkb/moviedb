import { Component } from 'react';
import './MovieList.css';
import { Flex } from 'antd';

import MovieCard from '../MovieCard/MovieCard';

export default class MovieList extends Component {
  render() {
    if (this.props.movies.length === 0) {
      return <h1>Nothing found</h1>;
    }
    const elements = this.props.movies.map((film) => {
      return <MovieCard key={film.id} film={film}></MovieCard>;
    });
    return (
      <Flex component="ul" className="movieList">
        {elements}
      </Flex>
    );
  }
}
