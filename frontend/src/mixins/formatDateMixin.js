import dayjs from 'dayjs';
require('dayjs/locale/fr')

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default {
    methods: {
        formatDate(dateString) {
            dayjs.locale('fr');
            const date = dayjs(dateString);
            // Then specify how you want your dates to be formatted
            return date.format('dddd D MMMM YYYY');
        },
        timeFromNow(dateString) {
            dayjs.locale('fr');
            const date = dayjs(dateString);
            return date.fromNow();
        }
    }
}
