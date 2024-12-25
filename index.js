import * as cheerio from 'cheerio';
import axios from 'axios';
import { makeHTML, date, formattedDate, month, sendMail, removeEscapeChar } from './utility';
import { SMU_OFFICIAL_SELECTORS, SMUOfficialBaseURL, SMUOfficialQuery } from './constants';

const fetchNotices = async () => {
  const res = await axios.get(`${SMUOfficialBaseURL}${SMUOfficialQuery}`);
  return res.data;
};

const parseNotices = (html) => {
  const $ = cheerio.load(html);
  const $noticeList = $(SMU_OFFICIAL_SELECTORS.list).children('li');

  return $noticeList
    .map((_, notice) => {
      const category = $(notice).find(SMU_OFFICIAL_SELECTORS.category).text();
      const title = $(notice).find(SMU_OFFICIAL_SELECTORS.title).text();
      const views = $(notice).find(SMU_OFFICIAL_SELECTORS.views).text();
      const url = $(notice).find(SMU_OFFICIAL_SELECTORS.title).attr('href');

      return {
        category: category,
        title: removeEscapeChar(title),
        views: removeEscapeChar(views),
        url: `${SMUOfficialBaseURL}${url}`,
      };
    })
    .get();
};

const processNotices = async () => {
  try {
    const htmlData = await fetchNotices();
    const todaysNoticeList = parseNotices(htmlData);
    const html = makeHTML(todaysNoticeList, month, date);
    const info = await sendMail(html, formattedDate);
    console.log(info);
  } catch (err) {
    console.error('Error processing notices:', err.message || err);
  }
};

processNotices();
