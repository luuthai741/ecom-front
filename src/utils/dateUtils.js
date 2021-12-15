import moment from 'moment';
import 'moment/locale/vi';

export const dateFomatter = date => {
    const mo = moment(date).format('llll');
    moment.locale('vi');
    return mo
}