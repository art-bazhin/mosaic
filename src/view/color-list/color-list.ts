import { signal } from '@spred/core';
import { component, h, list, template } from '@spred/dom';
import { ColorInfo, colors } from '../../model/colors';

const Color = component((color: ColorInfo) => {
  return h('div', { class: 'color' }, () => {
    h(
      'div',
      {
        class: { dark: () => color.dark },
        attrs: { style: () => `background-color: ${color.hex}` },
      },
      () => {
        h('span', { text: () => color.name });
      },
    );
    h('span', { text: () => color.count + '' });
  });
});

const ColorList = component(() => {
  const arr = signal(() => colors.get()?.list || []);

  return h('div', { class: 'color-list' }, () => {
    list(arr, Color);
  });
});

export const colorList = template(ColorList);
