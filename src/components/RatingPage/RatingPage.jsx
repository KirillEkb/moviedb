import React from 'react';
import PropTypes from 'prop-types';

import Pagination from '../Pagination/Pagination.jsx';
import LoadList from '../LoadList/LoadList.jsx';
class RatingPage extends React.Component {
  static propTypes = {
    getRatedMovies: PropTypes.func,
  };
  state = {
    loading: false,
    error: '',
    ratedMovies: [],
    page: 1,
    totalResults: 0,
  };
  componentDidMount() {
    this.getMovieList();
  }
  static getDerivedStateFromError() {
    return { error: 'something has gone wrong' };
  }
  getPage = (newPage) => {
    this.getMovieList(newPage);
  };
  getMovieList = (page = this.state.page) => {
    this.setState({ loading: true });
    this.props
      .getRatedMovies(page)
      .then((data) => {
        this.setState({
          ratedMovies: data.results,
          loading: false,
          totalResults: data.total_results,
          page: page,
          error: '',
        });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  render() {
    const { loading, error, ratedMovies, page, totalResults } = this.state;
    console.log(error, 'in rating page');
    return (
      <>
        <LoadList
          postRating={this.props.postRating}
          classNames="movieList, ratingPage__movieList"
          loading={loading}
          error={error}
          movies={ratedMovies}
        />
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
