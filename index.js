import * as cheerio from 'cheerio';
import axios from 'axios';

const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate() - 1;

    return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date < 10 ? `0${date}` : `${date}`}`;
}
const SMUOfficialBaseURL = `https://www.smu.ac.kr/lounge/notice/notice.do`;
const SMUOfficialQuery = `?srcCampus=smu&srStartDt=${getFormattedDate()}&srEndDt=${getFormattedDate()}&mode=list&srCategoryId1=&srSearchKey=&srSearchVal=`;

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
            todaysNoticeList[idx] = {
                category: $(notice).find(categorySelector).text(),
                title: removeEscapeChar($(notice).find(titleSelector).text()),
                views: removeEscapeChar($(notice).find(viewsSelector).text()),
                url: `${SMUOfficialBaseURL}${removeEscapeChar($(notice).find(titleSelector).attr('href'))}`
            }
        })
        console.log(todaysNoticeList);
    }
})
.catch((err) => { console.log(err) })

// 데이터 가공
const removeEscapeChar = (str) => {
    let arr = str.split('\n');

    // 탭 문자 제거하고 공백 요소 제거하기
    let cleanedStr = arr.map((item) => {
        return item.trim();
    }).filter((item) => {
        return item !== '';
    })

    return cleanedStr;
}