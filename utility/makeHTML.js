import * as cheerio from 'cheerio';
import fs from 'fs';

export const makeHTML = (todaysNoticeList, month, date) => {
  const html = fs.readFileSync('template.html', 'utf-8');
  const $ = cheerio.load(html);

  $('#mail-title').text(`${month}월 ${date}일자 공지가 도착했어요!`);
  $('.site-name > tbody > tr > td').prop('innerHTML', '상명대학교');

  if (todaysNoticeList.length > 0) {
    todaysNoticeList.forEach((noticeInfo) => {
      $('#contents > .notice > .notice-list').append(
        `<tr>
            <td>
              <div>
                <div class="category" style="display: inline-block; font-size: 10px; margin: 0; background-color: aliceblue; color: #183882; padding: 4px 8px; border-radius: 10px;">${noticeInfo.category}</div>
              </div>
              <a href="${noticeInfo.url}" style="font-size: 16px; color: #2f2f2f; text-decoration: none; display: block; margin-top: 12px; margin-left: 8px; margin-bottom: 6px;">${noticeInfo.title}</a>
              <div style="font-size: 12px; margin: 0 8px; color: #656565;">👀 ${noticeInfo.views[1]}</div>
              <div style="height: 1px; background-color: #d5d5d5; margin: 12px 0 16px 0;"></div>
            </td>
          </tr>`
      );
    });
  } else {
    $('#contents > .notice > .notice-list').append(
      `<tr>
        <td>
          오늘은 공지가 없어요 🙂
        </td>
      </tr>`
    );
  }
  return $.html();
};
