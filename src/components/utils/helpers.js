export const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const truncateString = (str, maxLength = 50) => {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};