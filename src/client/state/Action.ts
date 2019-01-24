// Flux standard action
// https://github.com/redux-utilities/flux-standard-action
export interface Action<Type, Payload = null, Meta = undefined> {
  type: Type;
  payload: Payload;
  meta?: Meta;
}

export interface ErrorAction<Type, Payload = Error, Meta = undefined> {
  type: Type;
  payload: Payload;
  error: true;
  meta?: Meta;
}
