import React, {Component} from "react";
import { connect } from "react-redux";
import  { bindActionCreators }    from  'redux'

// import redux actions
import * as tokenActionCreators from  '../../../redux/actions/tokenActions';

import { Container, Row, Col } from "reactstrap";

import Statistics from "./Statistics";
import LineChart from "./LineChart";
import Feed from "./Feed";
import Calendar from "./Calendar";
import PieChart from "./PieChart";
import Appointments from "./Appointments";
import Projects from "./Projects";
import BarChart from "./BarChart";
import Alerts from "../../ui-elements/Alerts"

import PiggyTable from '../../../components/PiggyTable'

class Default extends Component {
  constructor(props) {
    super(props)

    this.state = {

    };
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.tokenData !== prevProps.tokenData) {

    }
  }

  render() {

    return (
      <Container fluid className="p-0">
        <PiggyTable piggies={this.props.tokenData} />
      </Container>
  )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      tokenActions : bindActionCreators(tokenActionCreators, dispatch)
    }
  }
}

function mapStateToProps(state) {
  return {
    auctionAll: state.filters.isAuctionAll,
    forSale: state.filters.isAuctionForSale,
    notForSale: state.filters.isAuctionNotForSale,

    directionAll: state.filters.isPutCallAll,
    putOnly: state.filters.isPutOnly,
    callOnly: state.filters.isCallOnly,

    expiryAll: state.filters.isExpiryAll,
    onlyExpired: state.filters.isExpiredOnly,
    notExpired: state.filters.isNotExpired,

    currentBlock: state.chainUtils.currentBlock,
    tokenData: state.tokenMapping.tokenMap
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Default);
