import React, { Component } from "react";
import { connect } from "react-redux";
import { Card,
         CardBody,
         CardHeader,
         CardTitle,
         Container,
         Button,
         Modal,
         ModalBody,
         ModalFooter,
         ModalHeader,
         Input,
         InputMask } from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

import { MinusCircle, PlusCircle } from "react-feather";
//expandRow={expandRow}

const piggyColumns = [
  {
    dataField: "id",
    text: "piggy #",
    sort: true
  },
  {
    dataField: "isEuro",
    text: "Style",
    sort: true
  },
  {
    dataField: "isPut",
    text: "Put/Call",
    sort: true
  },
  {
    dataField: "strike",
    text: "Strike Price",
    sort: true
  },
  {
    dataField: "collateral",
    text: "Collateral",
    sort: true
  },
  {
    dataField: "lotSize",
    text: "Multiplier",
    sort: true
  },
  {
    dataField: "expiryBlock",
    text: "Maturity",
    sort: true
  },
  {
    dataField: "auctionPrice",
    text: "Price",
    sort: true
  },
  {
    dataField: "auctionExpiry",
    text: "Auction Expiry",
    sort: true
  }
];

class PiggyTable extends Component {
  constructor(props) {
    super(props)
    this.toggleDAImodal = this.toggleDAImodal.bind(this)
    this.handleDAI = this.handleDAI.bind(this)
    this.state = {
      showDAImodal: false,
      ethaddr: null,
      requestedDAI: 0
    }
  }

  componentDidMount() {

  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.piggies !== prevProps.piggies) {

    }
  }

  toggleDAImodal() {
    let current = this.state.showDAImodal
    this.setState({showDAImodal: !current})
  }

  updateField = name => event => {
    this.setState({[name]: event.target.value})
    // console.log(this.state.ethaddr)
  }

  handleDAI() {
    let baseURL = 'https://verify.testwyre.com/widget/v1?env=test&operation=debitcard&accountId=AC_1234&authType=metamask&destCurrency=DAI&sourceCurrency=USD&sourceAmount='
    let midURL = '&dest=ethereum:'
    let tailURL = '&redirectUrl=https://sendwyre.com'
    // patch user-input ETH address into the Wyre URL
    let wyreURL = baseURL + this.state.requestedDAI + midURL + this.state.ethaddr + tailURL
    // console.log(wyreURL)
    // open the modified URL w/ user-supplied ethereum address to send DAI to
    window.open(wyreURL, '_blank')
  }


  render() {
    let displayPiggies = this.props.piggies

    // alternative filter method
    let displayData = displayPiggies
    let showOnAuction = this.props.forSale || this.props.auctionAll
    let showNotOnAuction = !this.props.forSale || this.props.auctionAll
    let showPuts = (this.props.putOnly || this.props.directionAll)
    let showCalls = (this.props.callOnly || this.props.directionAll)
    let showExpired = this.props.onlyExpired || this.props.expiryAll
    let showNotExpired = this.props.notExpired || this.props.expiryAll
    let showAmerican = this.props.stylesAmerican || this.props.stylesAll
    let showEuropean = this.props.stylesEuropean || this.props.stylesAll

    // run displayPiggies through each filter and see what we wind up with
    displayData = displayData.filter(row => ((row.isOnAuction && showOnAuction) || (!row.isOnAuction && showNotOnAuction)))
    displayData = displayData.filter(row => ((row.isPut === 'put' && showPuts) || (row.isPut === 'call' && showCalls)))
    displayData = displayData.filter(row => ((row.isExpired && showExpired) || (!row.isExpired && showNotExpired)))
    displayData = displayData.filter(row => ((row.isEuro === 'American' && showAmerican) || (row.isEuro === 'European' && showEuropean)))

    return (

      <Card>
        <CardHeader>
          <CardTitle tag="h5">Piggies From Graph</CardTitle>
          <div style={{float: 'left'}}>
            <h6 className="card-subtitle text-muted">
              Filter Piggies using the controls on the left
            </h6>
          </div>
          <div style={{float: 'right'}}>
            {/* <Button color={'primary'} className="mr-1 mb-1" onClick={() => window.open('https://verify.testwyre.com/widget/v1?env=test&operation=debitcard&accountId=AC_1234&authType=metamask&destCurrency=DAI&sourceCurrency=USD&sourceAmount=0.01&dest=ethereum:0x4f5d52710C8C3E23e4c44f678868d23Aa2a49B37&redirectUrl=https://sendwyre.com', '_blank')}>Need DAI? Click Here</Button> */}
            <Button color={'primary'} className="mr-1 mb-1" onClick={this.toggleDAImodal}>Need DAI? Click Here</Button>
          </div>
          <Modal
            isOpen={this.state.showDAImodal}
            centered
          >
            <ModalHeader>
                  Before we send you to Wyre...
                </ModalHeader>
                <ModalBody className="text-center m-3">
                  <p className="mb-0">
                    How much DAI would you like to purchase? Purchases are made in USD:
                  </p>
                  <Input type='money' name='requestedDAI' placeholder='0' onChange={this.updateField('requestedDAI')}/>
                  <br></br>
                  <p className="mb-0">
                    Where should we send your DAI? Your Ethereum address should be 42 characters, starting with 0x:
                  </p>
                  <Input type='text' name='ethaddr' placeholder='0x1234...' onChange={this.updateField('ethaddr')}/>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggleDAImodal}>
                    Cancel
                  </Button>{" "}
                  <Button
                    color="primary"
                    onClick={this.handleDAI}
                  >
                    Go to Wyre
                  </Button>
                </ModalFooter>
          </Modal>
        </CardHeader>
        <CardBody>
        <BootstrapTable
          bootstrap4
          bordered={false}
          keyField="id"
          data={displayData}
          columns={piggyColumns}

          pagination={paginationFactory({
            sizePerPage: 5,
            sizePerPageList: [5, 10, 25, 50]
          })}
        />
        </CardBody>
      </Card>
    )
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
    stylesEuropean: state.filters.isStylesEuropean,
  }
}

export default connect(mapStateToProps, null)(PiggyTable);
