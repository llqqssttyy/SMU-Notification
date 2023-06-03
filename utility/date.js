const today = new Date();
const yesterday = new Date(today.setDate(today.getDate()-3));

export const year = yesterday.getFullYear();
export const month = yesterday.getMonth() + 1;
export const date = yesterday.getDate();

export const formattedDate = `${year}-${month < 10 ? `0${month}` : `${month}`}-${date < 10 ? `0${date}` : `${date}`}`;