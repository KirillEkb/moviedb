import React from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

import SearchInput from '../SearchInput/SearchInput';
import Pagination from '../Pagination/Pagination.jsx';
import LoadList from '../LoadList/LoadList.jsx';
class SearchingPage extends React.Component {
  static propTypes = {
    getRatedMovies: PropTypes.func,
    getMovies: PropTypes.func,
    postRating: PropTypes.func,
  };
  state = {
    loading: false,
    error: '',
    searching: '',
    ratedMovies: [],
    movies: [],
    page: 1,
    totalResults: 0,
  };
  inputRef = React.createRef();
  componentDidMount() {
    this.ratedMovies();
    this.inputRef.current.focus();
  }
  static getDerivedStateFromError() {
    return { error: 'something has gone wrong' };
  }
  ratedMovies = () => {
    const { page } = this.state;
    this.setState({ loading: true });
    this.props
      .getRatedMovies(page)
      .then((data) => {
        this.setState({ ratedMovies: data.results, loading: false, error: '' });
      })
      .catch((error) => {
        this.setState({ loading: false, error: error.message });
      });
  };
  get = debounce((searching, page) => {
    if (searching === '') {
      this.setState({ loading: false });
      return;
    }
    this.setState({ loading: true });
    this.props
      .getMovies(searching, page)
      .then((data) => {
        const results = data.results.map((movie) => {
          if (this.state.ratedMovies === undefined) {
            return movie;
          }
          const rated = this.state.ratedMovies.find((ratedMovie) => ratedMovie.id === movie.id);
          if (rated) {
            return rated;
          }
          return movie;
        });
        this.setState({ movies: results, loading: false, error: '', totalResults: data.total_results });
      })
      .catch((error) => {
        this.setState({ loading: false, error: error.message });
      });
  }, 1000);
  getPage = (newPage) => {
    this.setState({ page: newPage });
    this.get(this.state.searching, newPage);
  };
  getSearch = (event) => {
    const newSearching = event.target.value;
    this.setState({ searching: newSearching, page: 1 });
    this.get(newSearching, 1);
  };

  render() {
    const { loading, error, movies, searching, page, totalResults } = this.state;
    return (
      <>
        <SearchInput inputRef={this.inputRef} className="searchInput" search={searching} getSearch={this.getSearch} />
        <LoadList
          searching={searching}
          postRating={this.props.postRating}
          loading={loading}
          error={error}
          movies={movies}
          classNames="movieList, SearchingPage__movieList"
        />
        <Pagination total={totalResults} searching={searching} page={page} getPage={this.getPage}></Pagination>
      </>
    );
  }
}
export default SearchingPage;
