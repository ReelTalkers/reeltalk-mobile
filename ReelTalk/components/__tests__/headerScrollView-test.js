jest.dontMock('../HeaderScrollView.js');

const HeaderScrollView = require('../HeaderScrollView.js');

describe('HeaderScrollView', () => {
  it('has correct defaults', () => {
    expect(HeaderScrollView.getDefaultProps().windowHeight).toBe(300)
  });
  it('renders background', () => {
    expect(HeaderScrollView.getDefaultProps(250, "www.foo.com")).toBe(
      <Image
          style={[HeaderScrollView.styles.background, {
              height: 250,
          }]}
          source={"www.foo.com"}>
      </Image>
    )
  });
  it('renders background no height', () => {
    expect(HeaderScrollView.renderBackground(null, "www.foo.com")).toBe(null)
  });
  it('renders background no source', () => {
    expect(HeaderScrollView.renderBackground(250, null)).toBe(null)
  });
});
