import { batch, computed, writable } from '@spred/core';

const noop = () => {};

export function async<T>(
  computation: (
    resolve: (value: T) => void,
    reject?: (e: unknown) => void,
  ) => void,
) {
  let id = 0;

  const data = writable<T>();
  const error = writable();
  const rejected = writable(false);
  const pending = writable(true);

  const source = computed(() => {
    const selfId = ++id;

    pending.set(true);

    computation(
      (value: T) => {
        if (selfId === id) {
          batch(() => {
            data.set(value);
            rejected.set(false);
            pending.set(false);
          });
        }
      },
      (e: unknown) => {
        if (selfId === id) {
          batch(() => {
            error.set(e);
            rejected.set(true);
            pending.set(false);
          });
        }
      },
    );
  });

  let unsub: any = null;

  const target = computed(
    () => {
      return {
        data: data.get(),
        error: rejected.get() ? error.get() : undefined,
        pending: pending.get(),
      };
    },
    {
      onActivate() {
        unsub = source.subscribe(noop);
      },
      onDeactivate() {
        if (unsub) unsub();
      },
    },
  );

  return target;
}
