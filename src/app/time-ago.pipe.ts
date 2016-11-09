import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(date: any): string {
    let result: string;
    // current time
    let mydate = new Date(date);
    let d = new Date();
    let now = d.getTime();
    // time since message was sent in seconds
    let delta = (now - mydate.getTime()) / 1000;
    // format string
    if (delta < 10) {
      result = 'Now';
    } else if (delta < 60) { // sent in last minute
      let seconds = Math.floor(delta);
      result = seconds > 1 ? seconds + ' seconds ago' : seconds + ' second ago';
    } else if (delta < 3600) { // sent in last hour
      let minutes = Math.floor(delta / 60);
      result = minutes > 1 ? minutes + ' minutes ago' : minutes + ' minute ago';

    } else if (delta < 86400) { // sent on last day
      let hours = Math.floor(delta / 3600);
      result = hours > 1 ? hours + ' hours ago' : hours + ' hour ago';
    } else if (delta < 2592000) { // sent more than one day ago
      let days = Math.floor(delta / 86400);
      result = days > 1 ? days + ' days ago' : days + ' day ago';

    } else { // sent more than one month ago
      let months = Math.floor(delta / 2592000);
      result = months > 1 ? months + ' months ago' : months + ' month ago';
    }
    return result;
  }
}
