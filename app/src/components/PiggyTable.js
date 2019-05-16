import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardBody, CardHeader, CardTitle, Container } from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

import { MinusCircle, PlusCircle } from "react-feather";
//expandRow={expandRow}

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

class PiggyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: [],
    };
  }

  componentDidMount() {
    this.setState({
      table: this.props.piggies
    })
  }

  render() {
    let displayPiggies = this.props.piggies

    let displayData
    if (this.props.putOnly) {
      displayData = displayPiggies.filter(row => row.isPut === "put")
    }
    if (this.props.callOnly) {
      displayData = displayPiggies.filter(row => row.isPut === "call")
    }
    if (this.props.directionAll) {
      displayData = displayPiggies
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
  }
}

export default connect(mapStateToProps, null)(PiggyTable);
