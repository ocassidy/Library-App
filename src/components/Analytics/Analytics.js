import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../Shared/NavBar';
import LoanDetailsBarChart from './BarCharts/LoanDetailsBarChart';
import { getBookAnalytics } from '../../redux/actions';

function Analytics(props) {
  const { bookAnalyticsList } = props;

  return (
    <div>
      <NavBar />
      {bookAnalyticsList.allLoanDetailsList && bookAnalyticsList.allLoanDetailsList.length > 0
        ? (
          <LoanDetailsBarChart
            chartTitle="All Loans"
            barColourFill="#80eb34"
            yAxisDataKey="numberOfLoans"
            xAxisDataKey="bookName"
            barDataKey="numberOfLoans"
            bookAnalyticsList={bookAnalyticsList.allLoanDetailsList}
          />
        )
        : <div>Nothing retrieved for all loans.</div>}

      {bookAnalyticsList.allActiveLoansDetailsList
      && bookAnalyticsList.allActiveLoansDetailsList.length > 0
        ? (
          <LoanDetailsBarChart
            chartTitle="All Active Loans"
            barColourFill="#329ea8"
            yAxisDataKey="numberOfLoans"
            xAxisDataKey="bookName"
            barDataKey="numberOfLoans"
            bookAnalyticsList={bookAnalyticsList.allActiveLoansDetailsList}
          />
        )
        : <div>Nothing retrieved for active loans.</div>}
    </div>
  );
}

const mapStateToProps = (state) => ({
  bookAnalyticsList: state.bookAnalytics.bookAnalyticsList,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetBookAnalytics: () => {
    dispatch(getBookAnalytics());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
