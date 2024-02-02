import { signal } from '@spred/core';
import { component, h, list, node, template } from '@spred/dom';
import { frameCoords, setFrameCoords } from '../../model/frame';
import { cols, height, image, rows, width } from '../../model/image';
import { SCALE_RATIO, SECTOR_SIZE } from '../../model/constants';

interface SectorProps {
  x: () => number;
  y: () => number;
}

const Sector = component(({ x, y }: SectorProps) => {
  return h('span', {
    onclick() {
      setFrameCoords(x(), y());
    },
    class: {
      selected: () => {
        const frame = frameCoords.get();
        return frame.x === x() && frame.y === y();
      },
    },
    attrs: {
      style: `width: ${SECTOR_SIZE}px; height: ${SECTOR_SIZE}px`,
    },
  });
});

interface RowProps {
  y: () => number;
}

const Row = component(({ y }: RowProps) => {
  const arr = signal(() => [...Array(cols.get()).keys()]);

  return h('div', () => {
    list(arr, (i) => Sector({ x: () => i, y }));
  });
});

const ImageMap = component(() => {
  const scaledImage = signal(() => {
    let img = image.get();

    if (img) {
      img = img.cloneNode() as any;
      img!.height = img!.height * SCALE_RATIO;
      img!.width = img!.width * SCALE_RATIO;
    }

    return img;
  });

  const scaledWidth = signal(() => {
    return width.get() * SCALE_RATIO;
  });

  const scaledHeight = signal(() => {
    return height.get() * SCALE_RATIO;
  });

  const arr = signal(() => [...Array(rows.get()).keys()]);

  return h(
    'div',
    {
      class: 'image-map',
      attrs: {
        style: () =>
          `width: ${scaledWidth.get()}px; height:${scaledHeight.get()}px`,
      },
    },
    () => {
      node(scaledImage);
      list(arr, (i) => Row({ y: () => i }));
    },
  );
});

export const imageMap = template(ImageMap);
