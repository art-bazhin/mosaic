import { batch } from '@spred/core';
import { component, h, template } from '@spred/dom';
import { withLS } from '../../lib/with-ls';
import { file } from '../../model/image';

const FileInput = component(() => {
  return h('div', { class: 'file-input' }, () => {
    const filename = withLS('FILENAME', '');

    let input: HTMLInputElement | null = null;

    h('input', {
      type: 'file',
      accept: 'image/png, image/bpm',
      ref(el) {
        input = el;
      },
      onchange() {
        batch(() => {
          const fileValue = (this.files as FileList)[0];

          file.set(fileValue);
          filename.set(fileValue.name);
        });
      },
    });
    h('button', {
      class: 'file-input__button',
      text: 'Select Image',
      onclick() {
        input!.click();
      },
    });
    h('span', { text: filename });
  });
});

export const fileInput = template(FileInput);
