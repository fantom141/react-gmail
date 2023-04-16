export interface MessageListActionsProps {
  totalEntries: number;
  currentPage: number;
  pageSize: number;
  sort: string[];
  onRefresh: () => void;
  onPaginate: (page: number, size: number) => void;
  onChangeSort: (sort: string[]) => void;
}

export enum SortDirs {
  ASC = 'asc',
  DESC = 'desc',
}
