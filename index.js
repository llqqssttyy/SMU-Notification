import * as cheerio from 'cheerio';
import axios from 'axios';
import { makeHTML } from './utility/makeHTML.js';
import { date, formattedDate, month } from './utility/date.js';
import { sendMail } from './utility/sendMail.js';

// 공지사항 페이지로 이동할 url을 생성하기 위해 base url과 query를 분리.
const SMUOfficialBaseURL = `https://www.smu.ac.kr/lounge/notice/notice.do`;
const SMUOfficialQuery = `?srcCampus=smu&srStartDt=${formattedDate}&srEndDt=${formattedDate}&mode=list&srCategoryId1=&srSearchKey=&srSearchVal=`;

// selectors
const listSelector = "#ko > div.board-name-thumb.board-wrap > ul";
const categorySelector = "dl > dt > table > tbody > tr > td:nth-child(2) > a > span.cate";
const titleSelector = "dl > dt > table > tbody > tr > td:nth-child(3) > a";
const viewsSelector = "dl > dd > ul > li.board-thumb-content-views";

axios.get(`${SMUOfficialBaseURL}${SMUOfficialQuery}`)
.then((res) => {
    if(res.status === 200) {
        const $ = cheerio.load(res.data);   // full html doc
        const $noticeList = $(listSelector).children('li');
        
        let todaysNoticeList = [];

        $noticeList.each(function (idx, notice) {
            const category = $(notice).find(categorySelector).text();
            const title = $(notice).find(titleSelector).text();
            const views = $(notice).find(viewsSelector).text();
            const url = $(notice).find(titleSelector).attr('href');
            
            todaysNoticeList[idx] = {
                category: category,
                title: removeEscapeChar(title),
                views: removeEscapeChar(views),
                url: `${SMUOfficialBaseURL}${url}`
            }
        })
        return todaysNoticeList;
    }
})
.then((todaysNoticeList) => {
    makeHTML(todaysNoticeList, month, date)
    .then((html) => {
        // console.log(html);
        sendMail(html, formattedDate);
    })
    .catch((err) => {
        return err;
    })
})
.catch((err) => { console.log(err) })

// white space 제거하고 공백 요소 제거하기
const removeEscapeChar = (str) => {
    let arr = str.split('\n');

    let cleanedStr = arr.map((item) => {
        return item.trim();
    }).filter((item) => {
        return item !== '';
    })

    return cleanedStr;
}
