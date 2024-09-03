import { Component } from 'react';
import './MovieCard.css';
import { format } from 'date-fns';

export default class MovieCard extends Component {
  render() {
    const { id, title, overview, poster_path, release_date } = this.props.film;
    const path = 'https://image.tmdb.org/t/p/w500';
    return (
      <li className="movieCard" key={id}>
        <img className="movieCard__image image" src={`${path}${poster_path}`} alt={title}></img>
        <div className="movieCard__info info">
          <p className="movieCard__title title">{title}</p>
          <p className="movieCard__date">{format(release_date, 'MMMM d, yyyy')}</p>
          <article className="overview movieCard__overview">{overview}</article>
        </div>
      </li>
    );
  }
}
