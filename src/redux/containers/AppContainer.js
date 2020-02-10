import { connect } from 'react-redux';
import App from '../../App';
import { getBookList, getCurrentUser } from '../actions';

const mapStateToProps = (state) => ({
  currentUser: state.userDetails.currentUser,
  isAuthenticated: state.userDetails.isAuthenticated,
  isLoading: state.userDetails.isLoading,
  bookList: state.bookDetails.bookList,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetBookList: () => {
    dispatch(getBookList());
  },
  checkForCurrentUser: () => {
    dispatch(getCurrentUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
