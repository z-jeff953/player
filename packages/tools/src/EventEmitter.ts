export type EventsType = string | number | symbol
export interface Listener<T, K = any> {
  (event: T, ...args: K[]): any
}

export class Emitter<T extends EventsType = EventsType> {
  private listeners = new Map<T, Set<Listener<T>>>()
  private onceToWrapper = new Map<Listener<T>, Listener<T>>()
  private get eventNames() {
    return [...this.listeners.keys()]
  }

  public merge<U extends EventsType, K extends Emitter>(
    ee: Emitter<U>
  ): this {
    const events = (ee.eventNames as unknown) as U[]
    events.forEach(event => {
      const listeners = ee.listeners.get(event as U)
      const onceWrappers = ee.onceToWrapper
      if (listeners) {
        // 合并监听器到当前实例的监听器中
        if (this.listeners.has((event as unknown) as T)) {
          const existingListeners = this.listeners.get(
            (event as unknown) as T
          )!
          listeners.forEach(listener =>
            existingListeners.add(
              (listener as unknown) as Listener<T>
            )
          )
        } else {
          this.listeners.set(
            (event as unknown) as T,
            (new Set(listeners) as unknown) as Set<Listener<T>>
          )
        }
        // 合并 onceToWrapper
        onceWrappers.forEach((wrapper, originalListener) => {
          this.onceToWrapper.set(
            (wrapper as unknown) as Listener<T>,
            (originalListener as unknown) as Listener<T>
          )
          if (listeners.has(originalListener)) {
            const existingListeners = this.listeners.get(
              (event as unknown) as T
            )!
            existingListeners.add((wrapper as unknown) as Listener<T>)
            listeners.delete(originalListener)
            onceWrappers.delete(originalListener)
          }
        })
        // 移除被合并的 EventEmitter 实例的监听器
        ee.removeAllListeners(event as U)
      }
    })
    return this
  }
  // public merge<U extends EventsType>(
  //   ee: EventEmitter<U>
  // ): EventEmitter<T | U> {
  //   const events = (ee.eventNames as unknown) as U[]
  //   events.forEach(event => {
  //     const listeners = ee.listeners.get(event as U)
  //     const onceWrappers = ee.onceToWrapper
  //     if (listeners) {
  //       // 合并监听器到当前实例的监听器中
  //       if (this.listeners.has((event as unknown) as T)) {
  //         const existingListeners = this.listeners.get(
  //           (event as unknown) as T
  //         )!
  //         listeners.forEach(listener =>
  //           existingListeners.add(
  //             (listener as unknown) as Listener<T>
  //           )
  //         )
  //       } else {
  //         this.listeners.set(
  //           (event as unknown) as T,
  //           (new Set(listeners) as unknown) as Set<Listener<T>>
  //         )
  //       }
  //       // 合并 onceToWrapper
  //       onceWrappers.forEach((wrapper, originalListener) => {
  //         this.onceToWrapper.set(
  //           (wrapper as unknown) as Listener<T>,
  //           (originalListener as unknown) as Listener<T>
  //         )
  //         if (listeners.has(originalListener)) {
  //           const existingListeners = this.listeners.get(
  //             (event as unknown) as T
  //           )!
  //           existingListeners.add((wrapper as unknown) as Listener<T>)
  //           listeners.delete(originalListener)
  //           onceWrappers.delete(originalListener)
  //         }
  //       })
  //       // 移除被合并的 EventEmitter 实例的监听器
  //       ee.removeAllListeners(event as U)
  //     }
  //   })
  //   return this as EventEmitter<T | U>
  // }

  public removeAllListeners(event?: T): void {
    if (event === undefined) {
      this.listeners = new Map()
      this.onceToWrapper = new Map()
    } else {
      const listeners = this.listeners.get(event)
      if (listeners) {
        for (let l of listeners) this.onceToWrapper.delete(l)
        this.listeners.delete(event)
      }
    }
  }

  public on(event: T, callback: Listener<T>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    const fns = this.listeners.get(event)!
    fns.add(callback)
  }

  public once(event: T, callback: Listener<T>): void {
    const wrapper: Listener<T> = (...args) => {
      callback(...args)
      this.onceToWrapper.delete(callback)
      this.off(event, wrapper)
    }
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    const st = this.listeners.get(event)!
    this.onceToWrapper.set(callback, wrapper)
    st.add(wrapper)
  }

  public emit(event: T, ...args: any[]): void {
    if (!this.listeners.has(event)) {
      return
    }
    const fns = this.listeners.get(event)!
    const values = [...fns]
    for (const fn of values) {
      fn.call(null, event, ...args)
    }
  }

  public onNewEvent<U extends EventsType>(
    event: U,
    callback: Listener<U>
  ): Emitter<T | U> {
    const ee = new Emitter<U>()
    ee.on(event, callback)
    return this.merge(ee)
  }

  public onceNewEvent<U extends EventsType>(
    event: U,
    callback: Listener<U>
  ): Emitter<T | U> {
    const ee = new Emitter<U>()
    ee.once(event, callback)
    return this.merge(ee)
  }

  public off(event: T, callback: Listener<T>): void {
    const st = this.listeners.get(event)
    callback = this.onceToWrapper.get(callback) || callback
    if (st) {
      st.delete(callback)
      this.onceToWrapper.delete(callback)
      if (st.size === 0) {
        this.listeners.delete(event)
      }
    }
  }

  public listenerCount(event: T): number {
    const fns = this.listeners.get(event)
    return fns ? fns.size : 0
  }

  public addListener(event: T, callback: Listener<T>) {
    return this.on(event, callback)
  }

  public removeListener(event: T, callback: Listener<T>): void {
    this.off(event, callback)
  }
}
