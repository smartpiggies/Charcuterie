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

let table

function dataHandler(data) {
  let toReturn = data['createPiggies']
  let i;
  for (i=0; i<toReturn.length; i++) {
    //console.log('piggy ', i, data['createPiggies'][i])
    // join auction data (in proper format)
    toReturn[i]['auctionLength'] = data['startAuctions'][i]['auctionLength']
    toReturn[i]['priceStep'] = data['startAuctions'][i]['priceStep']
    toReturn[i]['reservePrice'] = data['startAuctions'][i]['reservePrice']
    toReturn[i]['startPrice'] = data['startAuctions'][i]['startPrice']
    toReturn[i]['timeStep'] = data['startAuctions'][i]['timeStep']
    // calculate actual table values of interest
    toReturn[i]['auctionExpiry'] = 'insufficient data to calc'
    toReturn[i]['isEuro'] = toReturn['isEuro'] ? 'European' : 'American'
    toReturn[i]['isPut'] = toReturn['isPut'] ? 'Put' : 'Call'
    let strike = toReturn[i]['strike']
    toReturn[i]['strike'] = '$' + strike.slice(0, strike.length - 2) + '.' + strike.slice(strike.length -2, strike.length)
    toReturn[i]['price'] = 'insufficient data to calc'

    // also reformat any auction fields that need to be reformatted

  }
  return(toReturn)
}

class Default extends Component {
  constructor(props) {
    super(props)

    this.state = {

    };
  }

  componentDidMount() {
    table = <PiggyTable piggies={this.props.tokenData} />
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.tokenData !== prevProps.tokenData) {
      console.log("default update")
      console.log("data: ", this.props.tokenData)
      table = <PiggyTable piggies={this.props.tokenData} />
    }
  }

  render() {
    console.log("default: ", this.props.tokenData)
    return (
        <Container fluid className="p-0">
        {table}

          {/*
          <Row>
            <Col lg="8" className="d-flex">
              <LineChart />
            </Col>
            <Col lg="4" className="d-flex">
              <Feed />
            </Col>
          </Row>
          <Row>
            <Col lg="6" xl="4" className="d-flex">
              <Calendar />
            </Col>
            <Col lg="6" xl="4" className="d-flex">
              <PieChart />
            </Col>
            <Col lg="6" xl="4" className="d-flex">
              <Appointments />
            </Col>
          </Row>
          <Row>
            <Col lg="6" xl="8" className="d-flex">
              <Projects />
            </Col>
            <Col lg="6" xl="4" className="d-flex">
              <BarChart />
            </Col>
          </Row> */}
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
