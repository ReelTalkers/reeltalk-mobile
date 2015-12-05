jest.dontMock('../TopChartsHome.js');

const TopChartsHome = require('../TopChartsHome.js');

describe('TopChartsHome', () => {
  it('changes to today', () => {
    let today = ["a"]
    let week = ["b"]
    TopChartsHome._onValueChange("Today", today, week)
    expect(TopChartsHome.state.shows).toBe(today)
  });
  it('changes to this week', () => {
    let today = ["a"]
    let week = ["b"]
    TopChartsHome._onValueChange("Week", today, week)
    expect(TopChartsHome.state.shows).toBe(week)
  });
});
