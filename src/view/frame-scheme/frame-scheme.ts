import { component, h, template } from '@spred/dom';
import { FRAME_SIZE, PIXEL_SIZE } from '../../model/constants';
import { frameData } from '../../model/frame';
import { colors } from '../../model/colors';
import { Signal, signal } from '@spred/core';

const SCHEME_SIZE = PIXEL_SIZE * FRAME_SIZE;

const Pixel = component(({ hex }: { hex: Signal<string | null> }) => {
  const color = signal(() => {
    const id = hex.get();
    return id ? colors.get()!.map[id] : null;
  });

  return h(
    'div',
    {
      class: {
        border: signal(() => color.get()?.border),
        dark: signal(() => color.get()?.dark),
        absent: signal(() => !hex.get()),
      },
      attrs: {
        style: signal(
          () =>
            `background-color: ${hex.get() || 'magenta'};` +
            `width: ${PIXEL_SIZE}px; ` +
            `height: ${PIXEL_SIZE}px;`,
        ),
      },
    },
    () => {
      h('span', {
        text: signal(() => color.get()?.name || null),
      });
    },
  );
});

const pixel = template(Pixel);

const FrameScheme = component(() => {
  return h(
    'div',
    {
      class: 'frame-scheme',
      attrs: { style: `width: ${SCHEME_SIZE}px; height: ${SCHEME_SIZE}px` },
    },
    () => {
      for (let i = 0; i < FRAME_SIZE * FRAME_SIZE; i++) {
        pixel({ hex: signal(() => frameData.get()![i]) });
      }
    },
  );
});

export const frameScheme = template(FrameScheme);
