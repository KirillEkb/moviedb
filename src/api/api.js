export default class Api {
  baseUrl = 'https://api.themoviedb.org/3';
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
      const response = await fetch(`${this.baseUrl}/authentication/guest_session/new`, this.options);
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
        `${this.baseUrl}/search/movie?query=${searching}&language=en-US&page=${page}&api_key=${apiKey}`,
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
        `${this.baseUrl}/movie/${movieId}/rating?guest_session_id=${await this.sessionID()}`,
        options
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
    } catch (error) {
      console.log(error.message, 'in catch block');
      throw new Error(error.message);
    }
  };

  getRatedMovies = async (page = 1) => {
    try {
      const apiKey = 'c409756510054d3a62232c1ef3553fd6';
      const response = await fetch(
        `${this.baseUrl}/guest_session/${await this.sessionID()}/rated/movies?api_key=${apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`,
        this.options
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
  getGenres = async () => {
    try {
      const response = await fetch(`${this.baseUrl}/genre/movie/list?language=en`, this.options);
      const data = await response.json();
      let genresObj = {};
      data.genres.forEach((genre) => {
        Object.assign(genresObj, { [genre.id]: genre.name });
      });
      return genresObj;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
