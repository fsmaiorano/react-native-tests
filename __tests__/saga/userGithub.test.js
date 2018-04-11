import SagaTester from 'redux-saga-tester';
import rootSaga from '../../src/store/sagas';
import * as actions from '../../src/store/userActions';

const userResponse = {

};

describe('Testing user github saga', () => {
  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(rootSaga);
  });

  it('can add user', async () => {
    sagaTester.dispatch(actions.addUserRequest('fsmaiorano'));
    await sagaTester.waitFor(actions.addUserSuccess().type);
    expect(sagaTester.getLatestCalledAction()).toEqual(userResponse);
  });
});
