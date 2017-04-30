export default function({ dispatch }) {
  return next => action => {
    // If action does not have payload
    // or, the payload does not have .then property
    // we don't care about it, send it on to
    // the next middleware
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    // Make sure the action's promise resolves
    // by using .then

    action.payload.then(response => {
      // create a new action object where we
      // preserve type (... action) but replace
      // the promise that was in payload with a
      // response data (payload: response)
      const newAction = { ...action, payload: response };
      dispatch(newAction);
    });
  };
}
