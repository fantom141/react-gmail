export const getUserFullName = <T extends { firstName?: string; lastName?: string }>({ firstName, lastName }: T) => {
  return `${firstName || ''}\x20${lastName || ''}`;
};
