import * as React from "react";

export interface SearchContextType {
  searchQuery: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
