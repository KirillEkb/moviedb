import React from 'react';
import { Online, Offline } from 'react-detect-offline';
import PropTypes from 'prop-types';

import ApiContext from '../../context/context.jsx';
import Spin from '../Spin/Spin.jsx';
import { customAlert as Alert } from '../Alert/Alert.jsx';
import MovieList from '../MovieList/MovieList';

export default class LoadList extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    movies: PropTypes.array,
    className: PropTypes.string,
  };
  static contextType = ApiContext;
  state = {
    genres: {},
    loadError: '',
  };
  async componentDidMount() {
    const getGenres = this.context;
    try {
      const genres = await getGenres();
      this.setState({ genres: genres });
    } catch (error) {
      this.setState({ loadError: error.message });
    }
  }
  render() {
    const { loading, error, movies, classNames } = this.props;
    const { loadError } = this.state;
    if (loading) {
      return <Spin />;
    } else if (!error && !loadError) {
      return (
        <MovieList
          searching={this.props.searching}
          postRating={this.props.postRating}
          className={classNames}
          genres={this.state.genres}
          movies={movies}
        />
      );
    } else {
      return (
        <>
          <Offline> {<Alert message={`check your connection. ${error}`} />} </Offline>
          <Online> {<Alert message={`something has gone wrong. ${error}`} />} </Online>
        </>
      );
    }
  }
}
