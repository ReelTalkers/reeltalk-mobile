jest.dontMock('../RatingSlider.js');

const RatingSlider = require('../RatingSlider.js');

describe('RatingSlider', () => {
  it('sets bucket width correctly on layout', () => {
    RatingSlider._onLayout(15, 30)
    expect(RatingSlider.state.bucketWidth).toBe(2)

    RatingSlider._onLayout(90, 30)
    expect(RatingSlider.state.bucketWidth).toBe(3)

    RatingSlider._onLayout(80, 30)
    expect(RatingSlider.state.bucketWidth).toBe(2)

    RatingSlider._onLayout(80, 300)
    expect(RatingSlider.state.bucketWidth).toBe(0)
  });

  it('Alters Ratings', () => {
    let options = [{'text': 'first', 'color': 'blue'},
    {'text': 'second', 'color': 'green'},
    {'text': 'third', 'color': 'red'}]
    RatingSlider._alterRating(15, 30, options)
    expect(RatingSlider.state.text).toBe("first")
    expect(RatingSlider.state.color).toBe("blue")

    RatingSlider._alterRating(60, 30, options)
    expect(RatingSlider.state.text).toBe("third")
    expect(RatingSlider.state.color).toBe("red")

    RatingSlider._alterRating(80, 30, options)
    expect(RatingSlider.state.text).toBe("third")
    expect(RatingSlider.state.color).toBe("red")

    RatingSlider._alterRating(30, 30, options)
    expect(RatingSlider.state.text).toBe("second")
    expect(RatingSlider.state.color).toBe("green")
  });
});
