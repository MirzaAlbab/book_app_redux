export const sortBook = (books, n) => {
  const sorted = books
    .sort((a, b) => {
      return b.average_rating - a.average_rating;
    })
    .slice(0, n);
  return sorted;
};
