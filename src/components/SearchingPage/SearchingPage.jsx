import React from 'react';
import { debounce } from 'lodash';
import { Online, Offline } from 'react-detect-offline';
import PropTypes from 'prop-types';

import Spin from '../Spin/Spin.jsx';
import { customAlert as Alert } from '../Alert/Alert.jsx';
import MovieList from '../MovieList/MovieList';
import SearchInput from '../SearchInput/SearchInput';
import Pagination from '../Pagination/Pagination.jsx';
import ApiContext from '../../context/context';
class SearchingPage extends React.Component {
  static contextType = ApiContext;
  static propTypes = {
    genres: PropTypes.object,
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
  componentDidCatch() {
    this.setState({ error: 'something has gone wrong' });
  }
  ratedMovies = () => {
    const { page } = this.state;
    const { getRatedMovies } = this.context;
    this.setState({ loading: true });
    getRatedMovies(page).then((data) => {
      this.setState({ ratedMovies: data.results, loading: false });
    });
  };
  get = debounce((searching, page) => {
    const { getMovies } = this.context;
    if (searching === '') {
      this.setState({ loading: false });
      return;
    }
    this.setState({ loading: true });
    getMovies(searching, page)
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
        this.setState({ movies: results, loading: false, error: false, totalResults: data.total_results });
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

  isLoading = () => {
    const { getMovies } = this.context;
    const { loading, error, movies, searching, page } = this.state;
    const { genres } = this.props;
    if (searching === '') {
      return;
    }
    if (loading) {
      return <Spin></Spin>;
    }
    if (!error) {
      if (movies.length > 0) {
        return <MovieList key="MovieList" genres={genres} movies={movies} className="movieList" />;
      } else if (movies.length === 0) {
        return <h3>Nothing found</h3>;
      }
      getMovies(searching, page).then((data) => {
        this.setState({ movies: data.results, totalResults: data.total_results });
      });
    } else {
      return (
        <>
          <Offline>
            <Alert err={`check your connection. ${error}`}></Alert>
          </Offline>
          <Online>
            <Alert err={`something has gone wrong. ${error}`}></Alert>
          </Online>
        </>
      );
    }
  };
  render() {
    const { searching, page, totalResults } = this.state;
    return (
      <>
        <SearchInput inputRef={this.inputRef} className="searchInput" search={searching} getSearch={this.getSearch} />
        {this.isLoading()}
        <Pagination total={totalResults} searching={searching} page={page} getPage={this.getPage}></Pagination>
      </>
    );
  }
}
export default SearchingPage;
