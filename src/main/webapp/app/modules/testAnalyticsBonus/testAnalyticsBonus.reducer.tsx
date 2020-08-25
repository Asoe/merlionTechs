
export const ACTION_TYPES = {
  SET_USER_ID: 'SET_USER_ID',
  GET_USER_ID: 'GET_USER_ID',

};

const initialState = {
  userId: "0",
};

export type TestAnalyticsState = Readonly<typeof initialState>;

// Reducer

export default (state: TestAnalyticsState = initialState, action): TestAnalyticsState => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER_ID:
      return {
        ...state,
        userId: action.payload.userId,
      };
    default:
      return state;
  }
};

// Actions

export const setUserId = (payload) => ({
  type: ACTION_TYPES.SET_USER_ID,
  payload,
});

export const getUserId = (payload) => ({
  type: ACTION_TYPES.GET_USER_ID,
  payload,
})
