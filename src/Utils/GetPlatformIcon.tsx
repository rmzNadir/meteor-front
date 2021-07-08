import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faApple,
  faLinux,
  faWindows,
} from '@fortawesome/free-brands-svg-icons';

import { IPlatform } from '../Types/Products';

const GetPlatformIcon = ({ name }: IPlatform) => {
  switch (name) {
    case 'PC':
      return <FontAwesomeIcon icon={faWindows} />;
    case 'Mac':
      return <FontAwesomeIcon icon={faApple} />;
    case 'Linux':
      return <FontAwesomeIcon icon={faLinux} />;
    default:
      return null;
  }
};

export default GetPlatformIcon;
