import SagaTester from 'redux-saga-tester';

import MockAdapter from 'axios-mock-adapter';
import api from '../../src/services/api';

import rootSaga from '../../src/store/sagas';
import * as actions from '../../src/store/userActions';

const userGithubFixture = require('./fixtures/userGithub.json');

describe('Testing user github saga', () => {
  let sagaTester = null;
  let apiMock = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    apiMock = new MockAdapter(api.axiosInstance);
    sagaTester.start(rootSaga);
  });

  it('can add user', async () => {
    apiMock.onGet('/users/fsmaiorano').reply(200, userGithubFixture['/users/fsmaiorano']);
    sagaTester.dispatch(actions.addUserRequest('fsmaiorano'));
    await sagaTester.waitFor(actions.addUserSuccess().type);
    expect(sagaTester.getLatestCalledAction()).toEqual(actions.addUserSuccess(userGithubFixture['/users/fsmaiorano']));
  });

  it(' throws error when user doesnt exists', async () => {
    apiMock.onGet('/users/fail2311231').reply(400);
    sagaTester.dispatch(actions.addUserRequest('fail2311231'));
    await sagaTester.waitFor(actions.addUserFailure().type);
    expect(sagaTester.getLatestCalledAction()).toEqual(actions.addUserFailure(userGithubFixture['/users/fsmaiorano']));
  });
});
