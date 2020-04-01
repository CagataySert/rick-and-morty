import { FETCH_EPISODES, FETCH_SINGLE_EPISODE } from '../actions/episode';

const initialState = {
  data: null,
  mappedDataById: null
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_EPISODES:
      const data = action.payload;
      const mappedDataById = data.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      }, {});
      return { ...state, data, mappedDataById };
    case FETCH_SINGLE_EPISODE:
      const singleEpisode = action.payload.data;
      const mappedEpisodeDatumById = { [singleEpisode.id]: singleEpisode };
      return {
        ...state,
        data: singleEpisode,
        mappedDataById: mappedEpisodeDatumById
      };
    default:
      return state;
  }
};

export default user;
