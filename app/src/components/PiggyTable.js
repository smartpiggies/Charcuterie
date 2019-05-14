import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, CardHeader, CardTitle, Container } from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

import { MinusCircle, PlusCircle } from "react-feather";
//expandRow={expandRow}

let tableData = [
  {
    id: "1",
    putcall: "Put",
    strike: 195.00,
    collateral: 1000,
    multiplier: 61,
    piggyExpiry: "2019/06/30",
    price: 45.00,
    auctionExpiry: '2019/05/15'
  },
  {
    id: "2",
    putcall: "Call",
    strike: 190.00,
    collateral: 1000,
    multiplier: 61,
    piggyExpiry: "2019/06/30",
    price: 12.00,
    auctionExpiry: '2019/05/15'
  },
  {
    id: "3",
    putcall: "Put",
    strike: 195.00,
    collateral: 2500,
    multiplier: 61,
    piggyExpiry: "2019/06/30",
    price: 65.00,
    auctionExpiry: '2019/05/15'
  },
  {
    id: "4",
    putcall: "Put",
    strike: 205.00,
    collateral: 1500,
    multiplier: 61,
    piggyExpiry: "2019/07/15",
    price: 25.00,
    auctionExpiry: '2019/05/30'
  },
  {
    id: "5",
    putcall: "Call",
    strike: 195.00,
    collateral: 1000,
    multiplier: 61,
    piggyExpiry: "2019/06/30",
    price: '-',
    auctionExpiry: '-'
  },
  {
    id: "6",
    putcall: "Put",
    strike: 195.00,
    collateral: 1000,
    multiplier: 61,
    piggyExpiry: "2019/04/30",
    price: 45.00,
    auctionExpiry: '2019/05/15'
  },
  {
    id: "7",
    putcall: "Put",
    strike: 195.00,
    collateral: 1000,
    multiplier: 61,
    piggyExpiry: "2019/06/30",
    price: 45.00,
    auctionExpiry: '2019/05/15'
  },
  {
    id: "8",
    putcall: "Put",
    strike: 195.00,
    collateral: 1000,
    multiplier: 61,
    piggyExpiry: "2019/06/30",
    price: 45.00,
    auctionExpiry: '2019/05/15'
  },
  {
    id: "9",
    putcall: "Put",
    strike: 195.00,
    collateral: 1000,
    multiplier: 61,
    piggyExpiry: "2019/06/30",
    price: 45.00,
    auctionExpiry: '2019/05/15'
  },
  {
    id: "10",
    putcall: "Put",
    strike: 195.00,
    collateral: 1000,
    multiplier: 61,
    piggyExpiry: "2019/06/30",
    price: 45.00,
    auctionExpiry: '2019/05/15'
  },
];

const tableColumns = [
  {
    dataField: "putcall",
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
    dataField: "multiplier",
    text: "Multiplier",
    sort: true
  },
  {
    dataField: "piggyExpiry",
    text: "Maturity",
    sort: true
  },
  {
    dataField: "price",
    text: "Price",
    sort: true
  },
  {
    dataField: "auctionExpiry",
    text: "Auction Expiry",
    sort: true
  }
];

const piggyColumns = [
  {
    dataField: "tokenId",
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
    dataField: "price",
    text: "Price",
    sort: true
  },
  {
    dataField: "auctionExpiry",
    text: "Auction Expiry",
    sort: true
  }
];

class PiggyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true })
  }

  render() {
    console.log(this.props.piggies)
    let displayPiggies = this.props.piggies

    let displayData
    if (this.props.putOnly) {
      displayData = tableData.filter(row => row.putcall === "Put")
    }
    if (this.props.callOnly) {
      displayData = tableData.filter(row => row.putcall === "Call")
    }
    if (this.props.directionAll) {
      displayData = tableData
    }

    /**
    displayData = tableData.map(item => {
      console.log("displayData")
      if (this.props.putOnly) {
        return (
          item.putcall === "put" ? item :   {
              id: "",
              putcall: "",
              strike: 0,
              collateral: 0,
              multiplier: 0,
              piggyExpiry: "",
              price: '-',
              auctionExpiry: '-'
            }
        )
      } else if (this.props.callOnly) {
        return (
          item.putcall === "call" ? item : {
              id: "",
              putcall: "",
              strike: 0,
              collateral: 0,
              multiplier: 0,
              piggyExpiry: "",
              price: '-',
              auctionExpiry: '-'
            }
        )
      } else {
        return (
          item
        )
      }
    })
    **/
    let expandRow
    if (this.state.isMounted) {
      expandRow = {
        renderer: row => (
          <div>
            <p>{`This Expand row is belong to "${row.id}"`}</p>
            <p>
              You can render anything here, also you can add additional data on every row object.
            </p>
          </div>
        ),
        showExpandColumn: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) =>
          isAnyExpands ? (
            <MinusCircle width={16} height={16} />

          ) : (
            <PlusCircle width={16} height={16} />
          ),
        expandColumnRenderer: ({ expanded }) =>
          expanded ? (
            <MinusCircle width={16} height={16} />
          ) : (
            <PlusCircle width={16} height={16} />
          )
      };
    }

    return (

      <Card>
        <CardHeader>
          <CardTitle tag="h5">Charcuterie Sampler</CardTitle>
          <h6 className="card-subtitle text-muted">
            Filter Piggies using the controls on the left
          </h6>
        </CardHeader>
        <CardBody>
          <BootstrapTable
            bootstrap4
            bordered={false}
            keyField="id"
            data={displayData}
            columns={tableColumns}

            pagination={paginationFactory({
              sizePerPage: 5,
              sizePerPageList: [5, 10, 25, 50]
            })}
          />
        </CardBody>

        <div>
        <CardHeader>
          <CardTitle tag="h5">Piggies From Graph</CardTitle>
          <h6 className="card-subtitle text-muted">
            Filter Piggies using the controls on the left
          </h6>
        </CardHeader>
        <CardBody>
          <BootstrapTable
            bootstrap4
            bordered={false}
            keyField="id"
            data={displayPiggies.createPiggies}
            columns={piggyColumns}

            pagination={paginationFactory({
              sizePerPage: 5,
              sizePerPageList: [5, 10, 25, 50]
            })}
          />
        </CardBody>
        </div>
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
  }
}

export default connect(mapStateToProps, null)(PiggyTable);
