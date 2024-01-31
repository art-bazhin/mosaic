import { component, h } from '@spred/dom';

export const App = component(() => {
  return h(() => {
    h('h1', { text: 'Mosaic App' });
  });
});
