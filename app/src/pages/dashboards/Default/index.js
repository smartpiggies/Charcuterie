import React from "react";
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
      startPrice
      reservePrice
      auctionLength
      timeStep
      priceStep
    }
  }
`

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
let auctionTokens
let createdTokens

const Default = () => (
  <ApolloProvider client={client}>
    <Container fluid className="p-0">
    <Query
      query={PIGGY_QUERY}
      variables={{
      }}
    >
      {({ data, error, loading }) => {
        console.log('data:', data)
        if (data['createPiggies'] !== undefined && data['createPiggies'].length > 0) {
          //let formatted = dataHandler(data)
          //console.log('formatted: ', formatted)
          createdTokens = data.createPiggies.map((item, i) => {
            return (
              {
                token: item.tokenId,
                details: {
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
              }
            )
          })

          tokenMap = createdTokens.map(item => {
            if (data.startAuctions.tokenId === )
          })

          auctionTokens = data.startAuctions.map((item, i) => {
            let token = createdTokens.find((created) => {
              return (created.token === item.tokenId)
            })
            return (
              {
                token: item.tokenId,
                details: {
                  details: token.details
                },
                auction: {
                  from: item.from,
                  startBlock: item.startBlock,
                  startPrice: item.startPrice,
                  reservePrice: item.reservePrice,
                  auctionLength: item.auctionLength,
                  timeStep: item.timeStep,
                  priceStep: item.priceStep
                }
              }
            )
          })
        }

        return loading ? (
          <Alerts />
        ) : error ? (
          <Alerts />
        ) : (
          <PiggyTable piggies={createdTokens} />
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
);

export default Default;
