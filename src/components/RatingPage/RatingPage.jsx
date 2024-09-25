import React from 'react';
import { Online, Offline } from 'react-detect-offline';
import PropTypes from 'prop-types';

import Spin from '../Spin/Spin.jsx';
import { customAlert as Alert } from '../Alert/Alert.jsx';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination.jsx';
import ApiContext from '../../context/context.jsx';
class RatingPage extends React.Component {
  static contextType = ApiContext;
  static propTypes = {
    genres: PropTypes.object,
  };
  state = {
    loading: false,
    error: false,
    ratedMovies: [],
    page: 1,
    totalResults: 0,
  };
  componentDidMount() {
    this.getMovieList();
  }
  componentDidCatch() {
    this.setState({ error: 'something has gone wrong' });
  }
  getPage = (newPage) => {
    this.getMovieList(newPage);
  };
  getMovieList = (page = this.state.page) => {
    const { getRatedMovies } = this.context;
    this.setState({ loading: true });
    getRatedMovies(page).then((data) => {
      this.setState({ ratedMovies: data.results, loading: false, totalResults: data.total_results, page: page });
    });
  };
  isLoading = () => {
    const { loading, error, ratedMovies } = this.state;
    const { genres } = this.props;
    if (loading) {
      return <Spin></Spin>;
    } else if (!error) {
      return (
        <MovieList
          className="movieList, ratingPage__movieList"
          key="ratedMovies"
          genres={genres}
          movies={ratedMovies}
        />
      );
    } else {
      return (
        <>
          <Offline> {Alert(`Проверьте соединение ${this.state.error}`)} </Offline>
          <Online> {Alert(`Не удалось получить данные ${this.state.error}`)} </Online>
        </>
      );
    }
  };

  render() {
    const { loading, page, totalResults } = this.state;
    return (
      <>
        {this.isLoading()}
        <Pagination
          total={totalResults}
          page={page}
          getPage={this.getPage}
          searching={loading ? '' : 'searching'}
        ></Pagination>
      </>
    );
  }
}

export default RatingPage;
