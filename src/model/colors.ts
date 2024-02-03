import { signal } from '@spred/core';
import { imageData } from './image';
import { getHexString } from '../lib/color-functions';

export interface ColorInfo {
  name: string;
  hex: string;
  border: boolean;
  dark: boolean;
  count: number;
}

interface Colors {
  map: Record<string, ColorInfo>;
  list: ColorInfo[];
}

export const colors = signal<Colors | undefined>(() => {
  const data = imageData.get()?.data;
  if (!data) return;

  const map: Record<string, ColorInfo> = {};

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    const hex = getHexString(r, g, b, a);

    if (!hex) continue;

    if (!map[hex]) {
      map[hex] = {
        name: '',
        hex,
        count: 1,
        dark: r * 0.299 + g * 0.587 + b * 0.114 < 150,
        border: r < 32 && g < 32 && b < 32,
      };
    } else {
      map[hex].count++;
    }
  }

  const list = Object.keys(map)
    .map((key) => map[key])
    .sort((a, b) => b.count - a.count);

  list.forEach((color, i) => {
    color.name = i + 1 + '';
  });

  return { map, list };
});
