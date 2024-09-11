import { Component } from 'react';
import { Pagination, ConfigProvider } from 'antd';
import './Pagination.css';

export default class PaginationComponent extends Component {
  render() {
    const { getPage, page, searching } = this.props;
    if (!searching) {
      return null;
    }
    return (
      <>
        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                itemActiveBg: '#1890FF',
                colorText: 'black',
                colorTextPlaceholder: 'white',
              },
            },
          }}
        >
          <Pagination onChange={getPage} defaultCurrent={page} total={50} />
        </ConfigProvider>
      </>
    );
  }
}
