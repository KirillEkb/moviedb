export default class Api {
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDA5NzU2NTEwMDU0ZDNhNjIyMzJjMWVmMzU1M2ZkNiIsIm5iZiI6MTcyNjQ4NTY2Ni4zOTI4MDgsInN1YiI6IjY2ZDJkOGUxYWY5NTliZWFhYjBjM2Q1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4LW-02Vv4HxC-S-AkjP5o-fKT_sZidA0BAAcSxRTaI8',
    },
  };
  sessionID = async () => {
    const checkSessionID = localStorage.getItem('sessionID');
    if (checkSessionID) {
      return checkSessionID;
    }
    try {
      const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', this.options);
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('sessionID', data.guest_session_id);
        return data.guest_session_id;
      } else {
        throw new Error('Failed to create guest session');
      }
    } catch (error) {
      return Error(`Error creating guest session: ${error.message}`);
    }
  };

  getMovies = async (searching, page = 1) => {
    try {
      const apiKey = 'c409756510054d3a62232c1ef3553fd6';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      };
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searching}&language=en-US&page=${page}&api_key=${apiKey}`,
        options
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  postRating = async (movieId, rating) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDA5NzU2NTEwMDU0ZDNhNjIyMzJjMWVmMzU1M2ZkNiIsIm5iZiI6MTcyNjQ5MTc1My41Nzc4MzYsInN1YiI6IjY2ZDJkOGUxYWY5NTliZWFhYjBjM2Q1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XQHuQIUdA1fR-P46430yYhZpVaWfJ5M7DKONcvh33n0',
        },
        body: JSON.stringify({
          value: rating,
        }),
      };
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${await this.sessionID()}`,
        options
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
    } catch (error) {
      return Error(error.message);
    }
  };

  getRatedMovies = async (page = 1) => {
    try {
      const apiKey = 'c409756510054d3a62232c1ef3553fd6';
      const response = await fetch(
        `https://api.themoviedb.org/3/guest_session/${await this.sessionID()}/rated/movies?api_key=${apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`,
        this.options
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return Error(error.message);
    }
  };
  getGenres = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', this.options);
      const data = await response.json();
      let genresObj = {};
      data.genres.forEach((genre) => {
        Object.assign(genresObj, { [genre.id]: genre.name });
      });
      return genresObj;
    } catch (error) {
      return Error(error.message);
    }
  };
}
