jest.dontMock('../Avatar.js');

const Avatar = require('../Avatar.js');

describe('Avatar', () => {
  it('gets an image', () => {
    expect(Avatar._getImage("www.foo.com")).toBe(
      <Image
          source={{uri: "www.foo.com"}}
          style={Avatar.styles.image}
      />
    )
  });
  it('returns no image', () => {
    expect(Avatar._getImage(null)).toBe(null)
  });
});
