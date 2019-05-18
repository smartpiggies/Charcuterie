import React, { Component } from "react";
import { connect } from "react-redux";
import  { bindActionCreators }    from  'redux'
import ApolloClient, { gql, InMemoryCache } from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'

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
let tableRender

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

class TokenData extends Component {
  constructor(props) {
    super(props)

    this.getPrice = this.getPrice.bind(this)

    this.state = {
      tokenMapLength: 0,
    };
  }

  componentDidMount() {
      tableRender = <Query
            query={PIGGY_QUERY}
            variables={{
            }}
          >
            {({ data, error, loading }) => {
              if (data['createPiggies'] !== undefined && data['createPiggies'].length > 0) {
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
                        auctionExpiry: (parseInt(auction[0].startBlock) + parseInt(auction[0].auctionLength)).toString(),
                        auctionPrice: groomValues(this.getPrice(parseInt(auction[0].startBlock),
                          (parseInt(auction[0].startBlock) + parseInt(auction[0].auctionLength)),
                          parseInt(auction[0].startPrice),
                          parseInt(auction[0].priceStep),
                          parseInt(auction[0].timeStep),
                          parseInt(auction[0].reservePrice)).toString())
                      }
                    )
                  }
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
                      rfp: item.RFP
                    }
                  )
                })
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
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentBlock !== prevProps.currentBlock) {

      tableRender = <Query
        query={PIGGY_QUERY}
        variables={{ }}
      >
        {({ data, error, loading }) => {
          if (data['createPiggies'] !== undefined && data['createPiggies'].length > 0) {
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
                    auctionExpiry: (parseInt(auction[0].startBlock) + parseInt(auction[0].auctionLength)).toString(),
                    auctionPrice: groomValues(this.getPrice(parseInt(auction[0].startBlock),
                      (parseInt(auction[0].startBlock) + parseInt(auction[0].auctionLength)),
                      parseInt(auction[0].startPrice),
                      parseInt(auction[0].priceStep),
                      parseInt(auction[0].timeStep),
                      parseInt(auction[0].reservePrice)).toString())
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
            "Loading"
          ) : error ? (
            "Something went wrong"
          ) : (
            // write tokenMap to redux
            <SetTable queryData={tokenMap} />
          )
        }}
      </Query>
    }
  }

  getPrice(startBlock, auctionLength, startPrice, priceStep, timeStep, reservePrice) {
    let currentBlock = this.props.currentBlock
    if (currentBlock < (startBlock + auctionLength)) {

      return (currentBlock - startBlock)  * priceStep / timeStep

    } else {
      return reservePrice
    }
  }

  render() {
    return (
      <ApolloProvider client={client} >
        {tableRender}
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

    currentBlock: state.chainUtils.currentBlock,
    tokenData: state.tokenMapping.tokenMap
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenData);
