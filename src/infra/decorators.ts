import {
  debounce as _debounce,
  DebounceSettings,
  throttle as _throttle,
  ThrottleSettings
} from "lodash";

export const debounce = (
  wait: number,
  opts?: DebounceSettings
): MethodDecorator => (_, __, descriptor: PropertyDescriptor) => {
  descriptor.value = _debounce(descriptor.value, wait, opts);

  return descriptor;
};

export const throttle = (
  wait: number,
  opts?: ThrottleSettings
): MethodDecorator => (_, __, descriptor: PropertyDescriptor) => {
  descriptor.value = _throttle(descriptor.value, wait, opts);

  return descriptor;
};
