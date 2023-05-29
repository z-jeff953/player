
import { PlayerAddon, PlayerMiddleware } from "./player";

export function useMiddleware<K extends keyof PlayerAddon>(addons: PlayerAddon[], name: K)
  : (initialValue: PlayerAddon<any>[K] extends PlayerMiddleware<infer V> ? V : never)
    => PlayerAddon<any>[K] extends PlayerMiddleware<infer V> ? V : never {

  if (!addons || !addons.length) {
    return function (initialValue) { return initialValue; };
  }

  return function (initialValue) {
    return addons
      .map(function (x) { return x[name]; })
      .filter(Boolean)
      .reduce(function (previous, middleware) {
        return middleware!(previous);
      }, initialValue);
  };
}