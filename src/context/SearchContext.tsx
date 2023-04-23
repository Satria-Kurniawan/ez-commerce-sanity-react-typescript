import * as React from "react";
import { SearchContextType } from "../types/Search";
import { PropsType } from "../types";

const SearchContext = React.createContext<SearchContextType>({
  searchQuery: "",
  onChange: () => {},
});

export const SearchProvider = ({ children }: PropsType) => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  const value: SearchContextType = {
    searchQuery,
    onChange,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext = () => React.useContext(SearchContext);
