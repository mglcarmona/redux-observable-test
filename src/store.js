import { createReducer, createActions } from 'reduxsauce';
import { createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware, ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { from } from 'rxjs';
import produce from 'immer';

const INITIAL_STATE = { users: [] };
const { Types, Creators } = createActions({
  fillUsers: null,
  fillUsersSuccess: ['users'],
});
export { Types, Creators };
const api = {
  fetchUsers: (id) => {
    const request = fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(response => response.json());
    return from(request);
  }
};
const pingEpic = action$ => action$.pipe(
  ofType(Types.FILL_USERS),
  mergeMap(action =>
    api.fetchUsers().pipe(
      map(Creators.fillUsersSuccess)
    ),
  )
);



const fillUsersSuccess = (state, { users }) => produce(state, draft => {
  draft.users = users;
});

const HANDLERS = {
  [Types.FILL_USERS_SUCCESS]: fillUsersSuccess,
};

const reducer = createReducer(INITIAL_STATE, HANDLERS);
const epic = combineEpics(pingEpic);
const epicMiddleware = createEpicMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(epicMiddleware)
);
epicMiddleware.run(epic);

export default store;
