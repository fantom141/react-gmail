export interface MessageListActionsProps {
  totalEntries: number;
  currentPage: number;
  pageSize: number;
  sort: string[];
  refresh: () => void;
  paginate: (page: number, size: number) => void;
  changeSort: (sort: string[]) => void;
}

export enum SortDirs {
  ASC = 'asc',
  DESC = 'desc',
}
