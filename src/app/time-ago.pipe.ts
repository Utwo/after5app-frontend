import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
    transform(date: any): string {
        var result:string;
        // current time
        let d = new Date();
        let now = d.getTime() + (d.getTimezoneOffset() * 60000);
        // time since message was sent in seconds
        let delta = (now - date.getTime()) / 1000;
        // format string
        if (delta < 10)
        {
            result = 'Now';
        }
        else if (delta < 60)
        { // sent in last minute
            result = Math.floor(delta) + ' seconds ago';
        }
        else if (delta < 3600)
        { // sent in last hour
            result = Math.floor(delta / 60) + ' minutes ago';
        }
        else if (delta < 86400)
        { // sent on last day
            result = Math.floor(delta / 3600) + ' hours ago';
        }
        else if(delta < 2592000)
        { // sent more than one day ago
            result = Math.floor(delta / 86400) + ' days ago';
        }
        else
        { // sent more than one day ago
            result = Math.floor(delta / 2592000) + ' months ago';
        }
        return result;
    }
}
