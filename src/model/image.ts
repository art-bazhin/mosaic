import { on, signal } from '@spred/core';
import { withLS } from '../lib/withLS';
import { async } from '../lib/async';
import { FRAME_SIZE } from './constants';

const file = signal<File>();

const base64 = withLS('BASE64', '');

const imageState = async((cb: (value: HTMLImageElement) => void) => {
  if (!base64.get()) return;

  const image = new Image();

  image.setAttribute('style', 'image-rendering: pixelated');
  image.src = base64.get();
  image.onload = () => cb(image);
});

const image = signal(() => imageState.get().data);

const width = signal(() => {
  return ceil(image.get()?.width || 0);
});

const height = signal(() => {
  return ceil(image.get()?.height || 0);
});

const cols = signal(() => width.get() / FRAME_SIZE);
const rows = signal(() => height.get() / FRAME_SIZE);

const reader = new FileReader();

reader.onload = (e) => {
  base64.set(e.target!.result as string);
};

on(file, (file) => reader.readAsDataURL(file));

function ceil(value: number) {
  return Math.ceil(value / FRAME_SIZE) * FRAME_SIZE;
}

export { file, base64, image, width, height, cols, rows };
