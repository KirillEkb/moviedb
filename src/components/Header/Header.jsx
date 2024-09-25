import { Tabs } from 'antd';
import PropTypes from 'prop-types';

export default function Header({ getTab }) {
  const items = [
    {
      label: 'Search',
      key: '1',
    },
    {
      label: 'Rated',
      key: '2',
    },
  ];
  return (
    <header className="header App__header">
      <Tabs className="tabs" centered={true} items={items} defaultActiveKey="1" onChange={getTab} />
    </header>
  );
}

Header.propTypes = {
  getTab: PropTypes.func,
};
