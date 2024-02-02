import { component, h, node } from '@spred/dom';
import { fileInput } from '../file-input/file-input';
import { imageMap } from '../image-map/image-map';
import { frameScheme } from '../frame-scheme/frame-scheme';
import { image } from '../../model/image';

const Content = component(() =>
  h(() => {
    h('div', { class: 'layout-row' }, () => {
      frameScheme();
      imageMap();
    });
  }),
);

export const App = component(() => {
  return h(() => {
    fileInput();
    node(() => image.get() && Content());
  });
});
