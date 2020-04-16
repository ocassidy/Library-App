import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import toastr from 'toastr';
import {
  getBookAnalytics,
  getBookDateRangeAnalytics,
  getReturnsDateRangeAnalytics,
  getUserAnalytics,
} from '../../../redux/actions';
import QuickStats from '../QuickStats/QuickStats';
import BookAnalytics from './BookAnalytics';
import UserAnalytics from './UserAnalytics';

function Analytics(props) {
  const [showBookAnalytics, setShowBookAnalytics] = useState(false);
  const [showUserAnalytics, setShowUserAnalytics] = useState(false);
  const {
    bookAnalyticsList, bookDateRangeList, handleGetBookDateRangeAnalytics, userAnalyticsList,
    handleGetUserAnalytics, handleGetReturnDateRangeAnalytics, returnsDateRangeList,
  } = props;

  return (
    <div className="container-fluid">
      <div className="row no-gutters justify-content-center m-2">
        <div className="col-sm-12 col-md-4 col-lg-5 border border-dark rounded m-2">
          <div className="h3 m-3">Toggles:</div>
          <div className="row no-gutters m-3 justify-content-center">
            <div className="col-auto mr-2 mb-2">
              <Button
                variant="light"
                onClick={() => {
                  setShowBookAnalytics(!showBookAnalytics);
                  setShowUserAnalytics(false);
                }}
              >
                Show Book Analytics
              </Button>
            </div>
            <div className="col-auto mr-2 mb-2">
              <Button
                variant="light"
                onClick={() => {
                  setShowBookAnalytics(false);
                  setShowUserAnalytics(!showUserAnalytics);
                }}
              >
                Show User Analytics
              </Button>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-5 m-2">
          <QuickStats data={bookAnalyticsList} />
        </div>
      </div>
      {showBookAnalytics && !showUserAnalytics
        ? (
          <BookAnalytics
            bookAnalyticsList={bookAnalyticsList}
            bookDateRangeList={bookDateRangeList}
            returnsDateRangeList={returnsDateRangeList}
            handleGetBookDateRangeAnalytics={handleGetBookDateRangeAnalytics}
            handleGetReturnDateRangeAnalytics={handleGetReturnDateRangeAnalytics}
          />
        )
        : null}

      {showUserAnalytics && !showBookAnalytics
        ? (
          <UserAnalytics
            userAnalyticsList={userAnalyticsList}
            handleGetUserAnalytics={handleGetUserAnalytics}
          />
        )
        : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  bookAnalyticsList: state.bookAnalytics.bookAnalyticsList,
  bookDateRangeList: state.bookAnalytics.bookDateRangeList,
  userAnalyticsList: state.userAnalytics.userAnalyticsList,
  returnsDateRangeList: state.bookAnalytics.returnsDateRangeList,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetBookAnalytics: () => {
    dispatch(getBookAnalytics());
  },
  handleGetUserAnalytics: (e, loanNumber) => {
    e.preventDefault();

    if (loanNumber < 1) {
      return toastr.error('Loan Number Cannot be less than 1.', 'Error');
    }

    return dispatch(getUserAnalytics(loanNumber));
  },
  handleGetBookDateRangeAnalytics: (e, startDate, endDate) => {
    e.preventDefault();

    if (moment(endDate).isBefore(startDate)) {
      return toastr.error(`End date of ${moment(endDate).format('DD-MM-YYYY')}
      cannot be before start date of ${moment(startDate).format('DD-MM-YYYY')}.`,
      'Error');
    }

    return dispatch(getBookDateRangeAnalytics(startDate, endDate));
  },
  handleGetReturnDateRangeAnalytics: (e, startDate, endDate) => {
    e.preventDefault();

    if (moment(endDate).isBefore(startDate)) {
      return toastr.error(`End date of ${moment(endDate).format('DD-MM-YYYY')}
      cannot be before start date of ${moment(startDate).format('DD-MM-YYYY')}.`,
      'Error');
    }

    return dispatch(getReturnsDateRangeAnalytics(startDate, endDate));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
