import { SortDirs } from './types';

export const expandSort = (sort: string[]): { key: string; dir: SortDirs } => {
  if (!sort?.length) {
    throw new Error('Sort is not provided');
  }

  const [key, dir] = sort[0].split(',') as [string, SortDirs];
  return { key, dir };
};

export const prepareToChangeSort = (curSort: string[]): string[] => {
  const { key, dir } = expandSort(curSort);
  return [`${key},${dir === SortDirs.ASC ? SortDirs.DESC : SortDirs.ASC}`];
};
