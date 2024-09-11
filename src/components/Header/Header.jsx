import SearchInput from '../SearchInput/SearchInput';

export default function Header({ search, getSearch }) {
  return (
    <header className="header App__header">
      <SearchInput search={search} getSearch={getSearch} />
    </header>
  );
}
