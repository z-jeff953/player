export type MapKeyType = string | number | symbol;

export class TypedMap<T extends MapKeyType = MapKeyType, TValue = any> {

  constructor() {
    this.map = new Map(...arguments)
  }

  private map: Map<T, TValue> = new Map();

  merge<T2 extends MapKeyType>(map1: TypedMap<T2>): TypedMap<T | T2, TValue> {
    for (let [k, v] of map1.map) {
      this.map.set(k as unknown as T, v);
    }
    return this;
  }

  public set(key: T, value: TValue): TypedMap<T, TValue> {
    this.map.set(key, value);
    return this;
  }

  public get(key: T): TValue | undefined {
    return this.map.get(key);
  }
}

// 使用示例
// 创建 TypedMap 实例
// const map1 = new TypedMap<"key1" | "key2">();
// const map2 = new TypedMap<"key3" | "key4">();

// map1.set("key1", "lol");
// map1.set("key2", "lol");

// map2.set("key3", "XD");

// const mergedMap = map1.merge(map2); // 合并后的实例类型为 TypedMap<"key1" | "key2" | "key3" | "key4", any>
// mergedMap.get("key3"); // 返回类型为 any | undefined
