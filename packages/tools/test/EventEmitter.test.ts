import { EventEmitter, Listener, EventsType } from '../src/EventEmitter'

describe('EventEmitter', () => {
  type Events1 = "e1" | "e2"
  type Events2 = "e3" | "e4"
  let ee1: EventEmitter<Events1>
  let ee2: EventEmitter<Events2>

  beforeEach(() => {
    ee1 = new EventEmitter<Events1>()
    ee2 = new EventEmitter<Events2>()
  })

  afterEach(() => {
    ee1.removeAllListeners()
    ee2.removeAllListeners()
  })


  it('should add and emit listeners for Events1', () => {
    const mockListener1: Listener<Events1> = jest.fn()
    const mockListener2: Listener<Events1> = jest.fn()

    ee1.on('e1', mockListener1)
    ee1.on('e2', mockListener2)

    ee1.emit('e1', 'arg1', 'arg2')
    ee1.emit('e2', 'arg3', 'arg4')

    expect(mockListener1).toHaveBeenCalledTimes(1)
    expect(mockListener1).toHaveBeenCalledWith('e1', 'arg1', 'arg2')

    expect(mockListener2).toHaveBeenCalledTimes(1)
    expect(mockListener2).toHaveBeenCalledWith('e2', 'arg3', 'arg4')
  })

  it('should add and emit listeners for Events2', () => {
    const mockListener1: Listener<Events2> = jest.fn()
    const mockListener2: Listener<Events2> = jest.fn()

    ee2.on('e3', mockListener1)
    ee2.on('e4', mockListener2)

    ee2.emit('e3', 'arg1', 'arg2')
    ee2.emit('e4', 'arg3', 'arg4')

    expect(mockListener1).toHaveBeenCalledTimes(1)
    expect(mockListener1).toHaveBeenCalledWith('e3', 'arg1', 'arg2')

    expect(mockListener2).toHaveBeenCalledTimes(1)
    expect(mockListener2).toHaveBeenCalledWith('e4', 'arg3', 'arg4')
  })

  it('should remove listeners', () => {
    const mockListener1: Listener<Events1> = jest.fn()
    const mockListener2: Listener<Events1> = jest.fn()
    ee1.on('e1', mockListener1)
    ee1.on('e1', mockListener2)

    ee1.emit('e1', 'arg1', 'arg2')
    expect(mockListener1).toHaveBeenCalledTimes(1)
    expect(mockListener2).toHaveBeenCalledTimes(1)

    ee1.off('e1', mockListener1)

    ee1.emit('e1', 'arg3', 'arg4')
    expect(mockListener1).toHaveBeenCalledTimes(1)
    expect(mockListener2).toHaveBeenCalledTimes(2)
  })

  it('should remove all listeners for an event', () => {
    const mockListener1: Listener<Events1> = jest.fn()
    const mockListener2: Listener<Events1> = jest.fn()


    ee1.on('e1', mockListener1)
    ee1.on('e2', mockListener2)

    ee1.emit('e1', 'arg1', 'arg2')
    ee1.emit('e2', 'arg3', 'arg4')

    expect(mockListener1).toHaveBeenCalledTimes(1)
    expect(mockListener2).toHaveBeenCalledTimes(1)

    ee1.removeAllListeners('e1')

    ee1.emit('e1', 'arg5', 'arg6')
    ee1.emit('e2', 'arg7', 'arg8')

    expect(mockListener1).toHaveBeenCalledTimes(1)
    expect(mockListener2).toHaveBeenCalledTimes(2)

  })


  test('merge() should merge event listeners from another EventEmitter instance', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    // 给 ee1 添加一个监听器
    ee1.on('e1', callback1);
    ee1.emit('e1');

    // 给 ee2 添加一个监听器
    ee2.on('e3', callback2);
    ee2.emit('e3');

    // 合并 ee2 到 ee1
    const ee3 = ee1.merge(ee2);

    // 验证合并后的 ee1 是否包含 ee2 的监听器
    ee3.emit('e1');
    ee3.emit('e3');

    // 验证合并后的 ee1 是否调用了 ee2 的监听器
    expect(callback1).toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
  });

  test('merge() should not merge event listeners from unrelated EventEmitter instance', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    // 给 ee1 添加一个监听器
    ee1.on('e1', callback1);
    ee1.emit('e1');

    // 给 ee2 添加一个监听器
    ee2.on('e3', callback2);
    ee2.emit('e3');
    expect(callback2).toHaveBeenCalledTimes(1);


    // 合并 ee2 到 ee1
    const ee3 = ee1.merge(ee2);

    // 验证合并后的 ee3 是否包含 ee3 的监听器
    ee3.emit('e1');
    ee3.emit('e3');

    // 验证合并后的 ee1 是否调用了 ee2 的监听器
    expect(callback1).toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(2);
  });

  test('merge() should work out when extends', () => {
    class Player<T extends EventsType = EventsType> extends EventEmitter<T> {
      constructor(public id: string) { super() };
      play() { return "play" }
    }
    const p1 = new Player<"e1" | "e2">("1")
    const p2 = new Player<"e3" | "e4">("2")

    const p3 = p1.merge(p2) as Player

    expect(p3.play()).toEqual("play")
    expect(p3.id).toEqual("1")
  });

});
