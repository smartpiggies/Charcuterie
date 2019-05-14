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
    createPiggies (skip: 5) {
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

const Default = () => (
  <ApolloProvider client={client}>
    <Container fluid className="p-0">
    <Query
      query={PIGGY_QUERY}
      variables={{
      }}
    >
      {({ data, error, loading }) => {
        return loading ? (
          <Alerts />
        ) : error ? (
          <Alerts />
        ) : (
          <PiggyTable piggies={data} />
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
