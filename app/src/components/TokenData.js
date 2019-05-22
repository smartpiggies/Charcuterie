import React, { Component } from "react";
import { connect } from "react-redux";
import  { bindActionCreators }    from  'redux'
import ApolloClient, { gql, InMemoryCache } from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'

import BigNumber from 'bignumber.js/bignumber'

// import components
import SetTable from "../components/SetTable"

// import redux actions
import * as tokenActionCreators from  '../redux/actions/tokenActions';

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error('REACT_APP_GRAPHQL_ENDPOINT environment variable not defined')
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
})

let tokenMap = []

const blockDays = parseInt(5760)
const blockHours = parseInt(240) // 4 blocks per minute * 60 minutes per hour

const PIGGY_QUERY = gql`
  query piggies {
    piggies {
      id
      from
      collateral
      lotSize
      strike
      expiryBlock
      isEuro
      isPut
      RFP
      isOnAuction
      startBlock
      startPrice
      reservePrice
      auctionLength
      timeStep
      priceStep
      auctionDuration
    }
  }
`

function groomValues(value) {
  if (value !== null) {
    if (value.length < 19) {
      return "$0." + value.slice(-18,-16)
    }
      return "$" + value.slice(0,value.length-18) + "." + value.slice(-18,-16)
  }
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

function getPrice(startBlock, auctionDuration, startPrice, priceStep, timeStep, reservePrice, latestBlock) {
  let currentBlock = parseInt(latestBlock)
  let startBlockInt = parseInt(startBlock)
  if (currentBlock < parseInt(auctionDuration)) {
    if (startPrice === reservePrice) {
      return reservePrice
    }
    return ((currentBlock - startBlockInt)  * parseInt(priceStep) / parseInt(timeStep)).toString()
  } else {
    return reservePrice
  }
}

function groomBlocks(blocks, latestBlock) {
  let zero = new BigNumber('0')
  let expiry = new BigNumber(blocks)
  let currentBlock = new BigNumber(latestBlock)

  let blockDelta = expiry.minus(currentBlock)
  if (blockDelta.isNegative()) {
    return "expired"
  } else if (blockDelta.gte(blockDays)) {
      let days = blockDelta.idiv(blockDays)
      let hours = days.times(blockDays).minus(blockDelta).abs().idiv(blockHours)
      return days.toString() + `d:` + hours.toString() + `hrs`
  } else if (blockDelta.lt(blockDays) && blockDelta.gte(blockHours)) {
      let hours = (blockDays).minus(blockDelta).idiv(blockHours)
      return `0d:` + hours.toString() + `hrs`
  } else if (blockDelta.gt(zero) && blockDelta.lt(blockHours)) {
      return `<1hr`
  } else if (blockDelta.isZero()) {
      return `expiring now`
  }
   return 'no data'
}

class TokenData extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tokenMapLength: 0,
    };
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentBlock !== prevProps.currentBlock) {

    }
  }

  render() {
    return (
      <ApolloProvider client={client} >
      <Query
            query={PIGGY_QUERY}
            pollInterval={7000}
          >
            {({ data, error, loading }) => {
            if (data.piggies !== undefined && data.piggies.length > 0) {
              tokenMap = data.piggies.map((item, i) => {
                  return (
                    {
                      id: item.id,
                      from: item.from,
                      collateral: groomValues(item.collateral),
                      lotSize: item.lotSize,
                      strike: groomStrike(item.strike),
                      expiryBlock: groomBlocks(item.expiryBlock, this.props.currentBlock),
                      isExpired: parseInt(item.expiryBlock) < parseInt(this.props.currentBlock),
                      isEuro: groomStyle(item.isEuro),
                      isPut: groomDirection(item.isPut),
                      rfp: item.RFP,
                      isOnAuction: item.isOnAuction,
                      startBlock: item.startBlock,
                      startPrice: item.startPrice,
                      reservePrice: item.reservePrice,
                      auctionLength: item.auctionLength,
                      timeStep: item.timeStep,
                      priceStep: item.priceStep,
                      auctionDuration: item.auctionDuration,
                      auctionExpiry: item.startBlock === null ? "-" : groomBlocks(item.auctionDuration, this.props.currentBlock),
                      auctionPrice: item.startBlock === null ? "-" : groomValues(getPrice(item.startBlock,
                          item.auctionDuration,
                          item.startPrice,
                          item.priceStep,
                          item.timeStep,
                          item.reservePrice,
                          this.props.currentBlock
                        )
                      )
                    }
                    )
                  }
                )
              }
            return loading ? (
              "Loading"
            ) : error ? (
              "Something went wrong"
            ) : (
              // write tokenMap to redux
              <SetTable queryData={tokenMap} />
            )
          }}
          </Query>
      </ApolloProvider>
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

    stylesAll: state.filters.isStylesAll,
    stylesAmerican: state.filters.isStylesAmerican,
    isStylesEuropean: state.filters.isStylesEuropean,

    currentBlock: state.chainUtils.currentBlock,
    tokenData: state.tokenMapping.tokenMap
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenData);
