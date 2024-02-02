import { component, h, node } from '@spred/dom';
import { fileInput } from '../file-input/file-input';
import { image, file } from '../../model/image';

export const App = component(() => {
  return h(() => {
    fileInput({ file });
    node(image);
  });
});
