import dayjs from 'dayjs';
// affiche les date en français
require('dayjs/locale/fr')

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default {
    methods: {
        // Affiche la date au format jour mois année (ex : lundi 1er novembre 2021)
        formatDate(dateString) {
            dayjs.locale('fr');
            const date = dayjs(dateString);
            return date.format('dddd D MMMM YYYY');
        },
        // Affiche le délai entre la date renseignée et le moment présent (ex : il y a 10 heures)
        timeFromNow(dateString) {
            dayjs.locale('fr');
            const date = dayjs(dateString);
            return date.fromNow();
        }
    }
}
