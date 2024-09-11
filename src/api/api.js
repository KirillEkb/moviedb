//todo: обработать ошибки fetch при отсутствии интернета и связи  с сервером

export default class Api {
  getMovies = async (searching, page = 1) => {
    try {
      const sessionId = 'c409756510054d3a62232c1ef3553fd6';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      };
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searching}&language=en-US&page=${page}&api_key=${sessionId}`,
        options
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      const results = data.results;
      return results;
    } catch (error) {
      throw new Error(error);
    }
  };
}
