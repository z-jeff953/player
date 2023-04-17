import {$} from '../../src/util/$'
describe('$', () => {
  beforeAll(() => {
    // 在测试前准备 DOM，例如添加一个测试用的 DOM 元素
    document.body.innerHTML = `
      <div id="testDiv">
        <p>Hello, world!</p>
      </div>
    `;
  });

  afterAll(() => {
    // 在测试后恢复 DOM 初始状态
    document.body.innerHTML = '';
  });

  it('should select a DOM element with valid selector', () => {
    // 调用 $ 函数并获取 DOM 元素
    const divElement = $('#testDiv');

    // 验证 DOM 元素是否存在
    expect(divElement).toBeDefined();
    // 验证 DOM 元素的标签名是否符合预期
    expect(divElement?.tagName.toLowerCase()).toBe('div');
  });

  it('should return null with invalid selector', () => {
    // 调用 $ 函数并尝试获取不存在的 DOM 元素
    const nonExistentElement = $('#nonExistentElement');

    // 验证返回值是否为 null
    expect(nonExistentElement).toBeNull();
  });
});