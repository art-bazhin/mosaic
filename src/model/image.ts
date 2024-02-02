import { on, signal } from '@spred/core';
import { withLS } from '../lib/withLS';
import { async } from '../lib/async';

const file = signal<File>();

const base64 = withLS('BASE64', '');

const imageState = async((cb: (value: HTMLImageElement) => void) => {
  if (!base64.get()) return;

  const image = new Image();

  image.setAttribute('style', 'image-rendering: pixelated');
  image.src = base64.get();
  image.onload = () => {
    image.height = image.height * 8;
    cb(image);
  };
});

const image = signal(() => imageState.get().data);

const reader = new FileReader();

reader.onload = (e) => {
  base64.set(e.target!.result as string);
};

on(file, (file) => reader.readAsDataURL(file));

export { file, base64, image };
