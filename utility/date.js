const today = new Date();
const yesterday = new Date(today.setDate(today.getDate()-1));

export const year = today.getFullYear();
export const month = today.getMonth() + 1;
export const date = today.getDate();

export const formattedDate = `${year}-${month < 10 ? `0${month}` : `${month}`}-${date < 10 ? `0${date}` : `${date}`}`;