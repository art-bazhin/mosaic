import { component, h } from '@spred/dom';
import { fileInput } from '../file-input/file-input';
import { imageMap } from '../image-map/image-map';

export const App = component(() => {
  return h(() => {
    fileInput();
    imageMap();
  });
});
