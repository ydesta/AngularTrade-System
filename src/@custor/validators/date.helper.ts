const DATE_REGEX = new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
const TIME_REGEX = new RegExp(/^((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))+$/);

function stringToDate(dateStr: string) {
  if (!DATE_REGEX.test(dateStr)) {
    console.error('Cannot convert date to Date object.');
    return;
  }
  const date = new Date(dateStr);
  return date;
}
function strToDate(dateStr: string) {
  // if (!DATE_REGEX.test(dateStr)) {
  //   console.error('Cannot convert date to Date object.');
  //   return;
  // }
  const dateArr = dateStr.split('/');
  // alert (dateArr);
  const v = new Date(Number(dateArr[2]), Number(dateArr[1]), Number(dateArr[0]));
  // alert(v.getFullYear() + '-' + ((v.getMonth())) + '-' + v.getDate());

  // this.dateToday = (this.todayDate.getFullYear() + '-' + ((this.todayDate.getMonth() + 1)) + '-' + this.todayDate.getDate() + ' ' +this.todayDate.getHours() + ':' + this.todayDate.getMinutes()+ ':' + this.todayDate.getSeconds());

  // alert(dateArr[2] + '-' +  dateArr[1]  + '-' + dateArr[0]);
  return dateArr[2] + '-' +  dateArr[1]  + '-' + dateArr[0];
  // return new Date(Number(dateArr[2]), Number(dateArr[1]), Number(dateArr[0]));
}
function stringsToDate(dateStr: string, timeStr: string) {
  if (!DATE_REGEX.test(dateStr) || !TIME_REGEX.test(timeStr)) {
    console.error('Cannot convert date/time to Date object.');
    return;
  }
  const date = new Date(dateStr);
  const timeArr = timeStr.split(/[\s:]+/);
  let hour = parseInt(timeArr[0], 10);
  const min = parseInt(timeArr[1], 10);
  const pm = timeArr[2].toLowerCase() === 'pm';

  if (!pm && hour === 12) {
    hour = 0;
  }
  if (pm && hour < 12) {
    hour += 12;
  }
  date.setHours(hour);
  date.setMinutes(min);
  return date;
}
export {
  DATE_REGEX, TIME_REGEX, stringToDate, stringsToDate, strToDate
};
