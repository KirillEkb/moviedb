import React from 'react';
import { Input } from 'antd';
import './searchInput.css';
import PropTypes from 'prop-types';

class SearchInput extends React.Component {
  static propTypes = {
    search: PropTypes.string,
    getSearch: PropTypes.func,
    inputRef: PropTypes.object,
  };
  render() {
    const { search, getSearch, inputRef } = this.props;
    return (
      <div className="searchInput__container">
        <Input ref={inputRef} placeholder="Type to search..." value={search} onChange={getSearch} />
      </div>
    );
  }
}
export default SearchInput;
