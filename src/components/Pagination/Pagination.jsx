import { Component } from 'react';
import { Pagination, ConfigProvider } from 'antd';
import PropTypes from 'prop-types';
import './Pagination.css';

export default class PaginationComponent extends Component {
  static propTypes = {
    getPage: PropTypes.func,
    searching: PropTypes.string,
    total: PropTypes.number,
    page: PropTypes.number,
  };
  render() {
    const { getPage, searching, total, page } = this.props;
    if (!searching) {
      return null;
    }
    return (
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              colorPrimary: 'white',
              itemActiveBg: '#1890FF',
            },
          },
        }}
      >
        <Pagination
          className="pagination"
          align="center"
          defaultPageSize={20}
          onChange={getPage}
          current={page}
          total={total}
          showSizeChanger={false}
        />
      </ConfigProvider>
    );
  }
}
