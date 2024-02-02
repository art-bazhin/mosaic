import { batch, on, signal } from '@spred/core';
import { Coords } from './coords';
import { base64, cols, rows } from './image';
import { withLS } from '../lib/withLS';

const frameX = withLS('FRAME_X', 0);
const frameY = withLS('FRAME_Y', 0);

const KEYBOARD_EVENTS: Record<string, () => void> = {
  ArrowUp() {
    const y = frameY.get() - 1;
    frameY.set(y < 0 ? 0 : y);
  },

  ArrowDown() {
    const y = frameY.get() + 1;
    frameY.set(y >= rows.get() ? rows.get() - 1 : y);
  },

  ArrowLeft() {
    const x = frameX.get() - 1;
    frameX.set(x < 0 ? 0 : x);
  },

  ArrowRight() {
    const x = frameX.get() + 1;
    frameX.set(x >= cols.get() ? cols.get() - 1 : x);
  },
};

document.addEventListener('keydown', (e) => {
  if (KEYBOARD_EVENTS[e.key]) KEYBOARD_EVENTS[e.key]();
});

on(base64, () => {
  frameX.set(0);
  frameY.set(0);
});

export function setFrameCoords(x: number, y: number) {
  batch(() => {
    frameX.set(x);
    frameY.set(y);
  });
}

export const frameCoords = signal<Coords>(() => {
  return {
    x: frameX.get(),
    y: frameY.get(),
  };
});
