import React, {Component} from "react";
import ApolloClient, { gql, InMemoryCache } from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'

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

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error('REACT_APP_GRAPHQL_ENDPOINT environment variable not defined')
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
})

const endpoint = 'https://api-rinkeby.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=YourApiKeyToken'

const PIGGY_QUERY = gql`
  query piggies {
    createPiggies {
      id
      from
      tokenId
      collateral
      lotSize
      strike
      expiryBlock
      isEuro
      isPut
      RFP
    }
    startAuctions {
      id
      from
      tokenId
      startBlock
      startPrice
      reservePrice
      auctionLength
      timeStep
      priceStep
    }
  }
`

function groomValues(value) {
  if (value.length < 19) {
    return "$0." + value.slice(-18,-16)
  }
    return "$" + value.slice(0,value.length-18) + "." + value.slice(-18,-16)
}


function groomStyle(condition) {
  return condition ? "European" : "American"
}

function groomDirection(condition) {
  return condition ? "put" : "call"
}

function groomStrike(price) {
  return "$" + price.slice(0,price.length-2) + "." + price.slice(-2)
}

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

let tokenMap

class Default extends Component {
  constructor(props) {
    super(props)

    this.fetchLatestBlock = this.fetchLatestBlock.bind(this)

    this.state = {
      block: 0
    };
  }

  async fetchLatestBlock() {
    let rspData = await fetch(endpoint)
    let jsonRsp = await rspData.json()

    this.setState({
        block: parseInt(jsonRsp.result, 16)
      })
  }

  componentDidMount() {
    this.fetchLatestBlock()

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.block !== prevState.block) {
      //this.fetchLatestBlock()
    }
  }

  render() {
    
    return (
      <ApolloProvider client={client}>
        <Container fluid className="p-0">
        <Query
          query={PIGGY_QUERY}
          variables={{
          }}
        >
          {({ data, error, loading }) => {
            if (data['createPiggies'] !== undefined && data['createPiggies'].length > 0) {
              //let formatted = dataHandler(data)
              //console.log('formatted: ', formatted)
              tokenMap = data.createPiggies.map((item, i) => {
                let auction = data.startAuctions.filter(auction => {return (auction.tokenId === item.tokenId)})
                if (auction.length > 0) {
                  return (
                    {
                      id: item.id,
                      from: item.from,
                      tokenId: item.tokenId,
                      collateral: groomValues(item.collateral),
                      lotSize: item.lotSize,
                      strike: groomStrike(item.strike),
                      expiryBlock: item.expiryBlock,
                      isEuro: groomStyle(item.isEuro),
                      isPut: groomDirection(item.isPut),
                      rfp: item.RFP,
                      auctionFrom: auction[0].from,
                      startBlock: auction[0].startBlock,
                      startPrice: auction[0].startPrice,
                      reservePrice: auction[0].reservePrice,
                      auctionLength: auction[0].auctionLength,
                      timeStep: auction[0].timeStep,
                      priceStep: auction[0].priceStep,
                      auctionExpiry: (parseInt(auction[0].startBlock) + parseInt(auction[0].auctionLength)).toString()
                    }
                  )
                }
                return (
                  {
                    id: item.id,
                    from: item.from,
                    tokenId: item.tokenId,
                    collateral: item.collateral,
                    multiplier: item.lotSize,
                    strike: item.strike,
                    expiry: item.expiryBlock,
                    isEuro: item.isEuro,
                    isPut: item.isPut,
                    rfp: item.RFP
                  }
                )
              })
            }

            return loading ? (
              <Alerts />
            ) : error ? (
              <Alerts />
            ) : (
              <PiggyTable piggies={tokenMap} />
            )
          }}
        </Query>

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
      </ApolloProvider>
    )
  }
}

export default Default;
