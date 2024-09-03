export default class Api {
  sessionId = 'https://www.themoviedb.org/authenticate/{c409756510054d3a62232c1ef3553fd6}';

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${this.sessionId}`,
    },
  };

  getMovies = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1',
      this.options
    );
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    const data = await response.json();
    const results = data.results;
    return results;
  };
}
