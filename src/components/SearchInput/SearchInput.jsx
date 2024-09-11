import { Input } from 'antd';

const SearchInput = ({ search, getSearch }) => {
  return <Input placeholder="Type to search..." value={search} onChange={getSearch} />;
};
export default SearchInput;
