import { Component } from 'react';
import './MovieCard.css';
import { format } from 'date-fns';
import { Typography } from 'antd';

export default class MovieCard extends Component {
  render() {
    const { id, title, overview, poster_path, release_date } = this.props.film;
    const { Text, Title, Paragraph } = Typography;
    const formattedDate =
      release_date && !isNaN(new Date(release_date).getTime())
        ? format(new Date(release_date), 'yyyy-MM-dd')
        : 'Date unavailable';
    const path = 'https://image.tmdb.org/t/p/w500';
    return (
      <li className="movieCard" key={id}>
        <>
          <img className="movieCard__image image" src={`${path}${poster_path}`} alt={title}></img>
          <div className="movieCard__info info">
            <Title level={3} className="movieCard__title title">
              {title}
            </Title>
            <Text type="secondary" className="movieCard__date">
              {formattedDate}
            </Text>
            <Paragraph className="overview movieCard__overview">{overview}</Paragraph>
          </div>
        </>
      </li>
    );
  }
}
