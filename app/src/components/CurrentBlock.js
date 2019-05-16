import React, { Component } from "react";
import { connect } from "react-redux";
import  { bindActionCreators }    from  'redux'

// import redux actions
import * as chainActionCreators from  '../redux/actions/chainActions';

const endpoint = 'https://api-rinkeby.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=YourApiKeyToken'

class TokenData extends Component {
  constructor(props) {
    super(props)

    this.fetchLatestBlock = this.fetchLatestBlock.bind(this)

    this.state = {

    }
  }

  async fetchLatestBlock() {
    const { actions } = this.props
    let rspData = await fetch(endpoint)
    let jsonRsp = await rspData.json()

    actions.chainUtils.setCurrentBlock(parseInt(jsonRsp.result, 16))
  }

  componentDidMount() {
    this.fetchLatestBlock()

    //update current block number every 7 seconds
    this.interval = setInterval(() => {
      this.fetchLatestBlock()
    }, 7000)

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentBlock !== prevProps.currentBlock) {
      // update component if block changes?
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {

    return (
      null
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      chainUtils : bindActionCreators(chainActionCreators, dispatch)
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenData);
