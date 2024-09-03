export default class Api {
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDA5NzU2NTEwMDU0ZDNhNjIyMzJjMWVmMzU1M2ZkNiIsIm5iZiI6MTcyNTM2ODU5OC45NzQ3NDEsInN1YiI6IjY2ZDJkOGUxYWY5NTliZWFhYjBjM2Q1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iWTrE_xJ0DDHiiGYg_1p3igyuLmBI8p1j3qB3E7it8g',
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
