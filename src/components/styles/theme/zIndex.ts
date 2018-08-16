export type IZIndexKey = keyof typeof zIndex;

const zIndex = Object.freeze({
  modal: 100,
  loading: 101
});

export default zIndex;
