const offset = 1000 * 60 * 60 * 9;  // 밀리초 * 분 * 시간 * 9(UTC +9)
const today = new Date();

export const year = today.getFullYear();
export const month = today.getMonth() + 1;
export const date = today.getDate();

export const formattedDate = `${year}-${month < 10 ? `0${month}` : `${month}`}-${date < 10 ? `0${date}` : `${date}`}`;