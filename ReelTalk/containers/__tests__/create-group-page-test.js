jest.dontMock('../CreateGroupPage.js');

const CreateGroupPage = require('../CreateGroupPage.js');

describe('CreateGroupPage', () => {
  it('adds a user', () => {
    let users = [{'id' : '1', 'name' : 'Molly'},
      {'id' : '2', 'name' : 'Paul'}
    ]
    CreateGroupPage.handleSelectUser({'id' : '3', 'name' : 'Sally'}, users)
    expect(CreateGroupPage.state.selectedUsers).toBe(
      [
        {'id' : '1', 'name' : 'Molly'},
        {'id' : '2', 'name' : 'Paul'},
        {'id' : '3', 'name' : 'Sally'}
      ]
    )
  });
  it('edits a user', () => {
    let users = [{'id' : '1', 'name' : 'Molly'},
      {'id' : '2', 'name' : 'Paul'}
    ]
    CreateGroupPage.handleSelectUser({'id' : '2', 'name' : 'Tom'}, users)
    expect(CreateGroupPage.state.selectedUsers).toBe(
      [
        {'id' : '1', 'name' : 'Molly'},
        {'id' : '2', 'name' : 'Tom'},
      ]
    )
  });
  it('removes a user', () => {
    let users = [{'id' : '1', 'name' : 'Molly'},
      {'id' : '2', 'name' : 'Paul'}
    ]
    CreateGroupPage.handleSelectUser({'id' : '1', 'name' : 'Molly'}, users)
    expect(CreateGroupPage.state.selectedUsers).toBe(
      [
        {'id' : '2', 'name' : 'Tom'},
      ]
    )
  });
});
