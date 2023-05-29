import { EventsType, TypedEmitter } from "@dash-vdk/tools";
import { createEl } from "../util";
import { Player } from "./player";

export abstract class Component<T extends EventsType> extends TypedEmitter<T> {
  el: HTMLElement; //el代表着该组件对应的整个HTML元素
  abstract readonly id: string
  constructor(
    public player?: Player,
    public container?: HTMLElement,
    tagName?: string,
    properties = {},
    attributes = {},
    content?: any
  ) {
    super();
    this.el = createEl(tagName, properties, attributes, content);
    if (container) container.appendChild(this.el);
  }

  init() { }
  initEvent() { }
  initPCEvent() { }
  initMobileEvent() { }
  initTemplate() { }
  initPCTemplate() { }
  initMobileTemplate() { }
  initComponent() { }
  resetEvent() { }
  dispose() { }
}
