import {
  GET_BOOK_FAILURE,
  GET_BOOK_SUCCESS,
} from '../actionTypes';

const initialState = {
  book: null,
};

export default function bookListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOK_SUCCESS:
      // eslint-disable-next-line no-return-assign
      return state = {
        book: action.book,
      };

    case GET_BOOK_FAILURE:
      // eslint-disable-next-line no-return-assign
      return state = {
        book: null,
      };

    default:
      return state;
  }
}
