function dateObj(d){

  let dateString;

  if(typeof d === 'number'){
    dateString = new Date(d).toISOString();
  } else {
    dateString = d.toString();
  }

  let date = dateString.split('T')[0].split('-');
  let time = dateString.split('T')[1].split(':');
  return {
    year: parseInt(date[0]),
    month: parseInt(date[1]),
    day: parseInt(date[2]),
    hour: parseInt(time[0]),
    minute: parseInt(time[1]),
    second: parseInt(time[2].slice(0, 2))
  };
}

function byDate(a, b){

  let A = dateObj(a.date);
  let B = dateObj(b.date);

  // Short-circuited comparison structure
  let year = B.year - A.year;
  if(year !== 0){
    return year;
  }

  let month = B.month - A.month;
  if(month !== 0){
    return month;
  }

  let day = B.day - A.day;
  if(day !== 0){
    return day;
  }

  let hour = B.hour - A.hour;
  if(hour !== 0){
    return hour;
  }

  let min = B.minute - A.minute;
  if(min !== 0){
    return min;
  }

  let sec = B.second - A.second;
  if(sec !== 0){
    return sec;
  }

  return 0; // Dates match down to the second
}

export default {
  byDate: byDate
};
