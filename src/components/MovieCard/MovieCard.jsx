import { Component } from 'react';
import './MovieCard.css';
import { format } from 'date-fns';
import { Typography, Rate } from 'antd';
import PropTypes from 'prop-types';

import { ApiConsumer } from '../../context/context';

export default class MovieCard extends Component {
  static propTypes = {
    film: PropTypes.object,
    genres: PropTypes.array,
  };
  render() {
    const { id, title, overview, poster_path, release_date, rating, vote_average } = this.props.film;
    const { Text, Title, Paragraph } = Typography;
    const formattedDate =
      release_date && !isNaN(new Date(release_date).getTime())
        ? format(new Date(release_date), 'yyyy-MM-dd')
        : 'Date unavailable';
    const path = 'https://image.tmdb.org/t/p/w500';
    const averageRate = () => {
      let averageClass = 'movieCard__averageRate';
      if (vote_average <= 3) {
        averageClass += ' movieCard__averageRate--low';
      }
      if (vote_average > 3 && vote_average <= 5) {
        averageClass += ' movieCard__averageRate--medium';
      }
      if (vote_average > 5 && vote_average <= 7) {
        averageClass += ' movieCard__averageRate--high';
      }
      if (vote_average > 7) {
        averageClass += ' movieCard__averageRate--excellent';
      }
      return <div className={averageClass}>{vote_average.toFixed(1)}</div>;
    };
    const MovieGenres = ({ genres }) => {
      return (
        <div className="movieCard__genres">
          {genres.map((genre) => (
            <span key={genre} className="movieCard__genre">
              {genre}
            </span>
          ))}
        </div>
      );
    };

    return (
      <ApiConsumer>
        {({ postRating }) => {
          const post = (rating) => {
            postRating(this.props.film.id, rating);
          };
          return (
            <li className="movieCard" key={id}>
              <img className="movieCard__image image" src={`${path}${poster_path}`} alt={title}></img>
              <Title level={3} style={{ margin: 0, marginTop: '10px' }} className="movieCard__title title">
                {title}
              </Title>
              {averageRate()}
              {MovieGenres({ genres: this.props.genres })}
              <Text type="secondary" className="movieCard__date">
                {formattedDate}
              </Text>
              <Paragraph className="overview movieCard__overview">{overview}</Paragraph>
              <Rate className="movieCard__rate" onChange={post} allowHalf defaultValue={rating} count={10} />
            </li>
          );
        }}
      </ApiConsumer>
    );
  }
}
