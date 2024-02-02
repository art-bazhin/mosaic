import { component, h } from '@spred/dom';
import { fileInput } from '../file-input/file-input';
import { imageMap } from '../image-map/image-map';
import { colors } from '../../model/colors';

export const App = component(() => {
  return h(() => {
    fileInput();
    imageMap();
  });
});

colors.subscribe((v) => console.log(v));
