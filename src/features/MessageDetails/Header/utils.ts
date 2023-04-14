export const getAdditionalInfoValue = (email: string, curUserEmail: string): string => {
  return email === curUserEmail ? 'Me' : email;
};
