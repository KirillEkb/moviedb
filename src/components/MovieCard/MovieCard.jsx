import { Component } from 'react';
import './MovieCard.css';
import { format } from 'date-fns';
import { Typography, Rate } from 'antd';
import PropTypes from 'prop-types';

import { customAlert as Alert } from '../Alert/Alert';

export default class MovieCard extends Component {
  static propTypes = {
    film: PropTypes.object,
    genres: PropTypes.array,
  };

  state = {
    error: '',
  };
  post = (rating) => {
    try {
      this.props
        .postRating(this.props.film.id, rating)
        .then(() => {
          this.setState({ error: '' });
        })
        .catch((error) => {
          this.setState({ error: `your rating was not sent. ${error.message}` });
        });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };
  averageRate = (vote_average) => {
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
    return averageClass;
  };
  render() {
    const { id, title, overview, poster_path, release_date, rating, vote_average } = this.props.film;
    const { Text, Title, Paragraph } = Typography;
    const formattedDate =
      release_date && !isNaN(new Date(release_date).getTime())
        ? format(new Date(release_date), 'yyyy-MM-dd')
        : 'Date unavailable';
    const path = 'https://image.tmdb.org/t/p/w500';
    return (
      <li className="movieCard" key={id}>
        <img className="movieCard__image image" src={path + poster_path}></img>
        <Title level={3} style={{ margin: 0, marginTop: '10px' }} className="movieCard__title title">
          {title}
        </Title>
        <div className={this.averageRate(vote_average)}>{vote_average.toFixed(1)}</div>
        <div className="movieCard__genres">
          {this.props.genres.map((genre) => (
            <span key={genre} className="movieCard__genre">
              {genre}
            </span>
          ))}
        </div>
        <Text type="secondary" className="movieCard__date">
          {formattedDate}
        </Text>
        <Paragraph className="overview movieCard__overview">{overview}</Paragraph>
        <Rate className="movieCard__rate" onChange={this.post} allowHalf defaultValue={rating} count={10} />
        <div className="movieCard__error">{this.state.error && <Alert message={this.state.error}></Alert>}</div>
      </li>
    );
  }
}
