export const toastCongif = (
  status: 'error' | 'info' | 'warning' | 'success',
  title: string,
) => {
  return {
    title: title,
    status: status,
    isClosable: true,
    duration: 3000,
    variant: 'top-accent',
  };
};
