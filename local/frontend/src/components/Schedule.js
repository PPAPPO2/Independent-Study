import React, { useState } from 'react';
import '../styles/Schedule.css'; 
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import axios from 'axios';

const Schedule = () => {
  const [currentTitle, setCurrentTitle] = useState(''); // 儲存標題

  let calendarApi;

  return (
    <>
      <div className="top-bar">
        <span className="arrow" onClick={() => calendarApi?.prev()}>〈</span> {/* 上一個月按鈕 */}
        <span>{currentTitle}</span> {/* 顯示動態標題 */}
        <span className="arrow" onClick={() => calendarApi?.next()}>〉</span> {/* 下一個月按鈕 */}
      </div>

      <div className='calendar-container'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          // showNonCurrentDates={false}
          aspectRatio={1.5}
          headerToolbar={{
            left: '',
            center: '',
            right: ''
          }}
          dayHeaderContent={(args) => {
            const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            return weekdays[args.date.getUTCDay()];
          }}
          titleFormat={(args) => {
            const year = args.date.year;
            const month = String(args.date.month + 1).padStart(2, '0');
            const formattedTitle = `${year}.${month}`;
            setCurrentTitle(formattedTitle); // 更新橫條的標題
            return ''; // 不顯示內建的日曆標題
          }}
          ref={(calendar) => { 
            calendarApi = calendar?.getApi(); // 取得 FullCalendar API，方便控制上下月份切換
          }}
        />
      </div>
    </>
  );
};

export default Schedule;
