import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

// Permet l’utilisation des icones fontawesome solid et regular
library.add(fas, far)

export { FontAwesomeIcon }