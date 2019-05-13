import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Container } from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

import { MinusCircle, PlusCircle } from "react-feather";

const tableData = [
  {
    putcall: "Put",
    strike: 195.00,
    collateral: 1000,
    multiplier: 61,
    piggyExpiry: "2019/06/30",
    price: 45.00,
    auctionExpiry: '2019/05/15'
  },
  {
    putcall: "Call",
    strike: 190.00,
    collateral: 1000,
    multiplier: 61,
    piggyExpiry: "2019/06/30",
    price: 12.00,
    auctionExpiry: '2019/05/15'
  },
  {
    putcall: "Put",
    strike: 195.00,
    collateral: 2500,
    multiplier: 61,
    piggyExpiry: "2019/06/30",
    price: 65.00,
    auctionExpiry: '2019/05/15'
  },
  {
    putcall: "Put",
    strike: 205.00,
    collateral: 1500,
    multiplier: 61,
    piggyExpiry: "2019/07/15",
    price: 25.00,
    auctionExpiry: '2019/05/30'
  },
  {
    putcall: "Call",
    strike: 195.00,
    collateral: 1000,
    multiplier: 61,
    piggyExpiry: "2019/06/30",
    price: '-',
    auctionExpiry: '-'
  },
  {
    putcall: "Put",
    strike: 195.00,
    collateral: 1000,
    multiplier: 61,
    piggyExpiry: "2019/04/30",
    price: 45.00,
    auctionExpiry: '2019/05/15'
  },
  {
    putcall: "Put",
    strike: 195.00,
    collateral: 1000,
    multiplier: 61,
    piggyExpiry: "2019/06/30",
    price: 45.00,
    auctionExpiry: '2019/05/15'
  },
  {
    putcall: "Put",
    strike: 195.00,
    collateral: 1000,
    multiplier: 61,
    piggyExpiry: "2019/06/30",
    price: 45.00,
    auctionExpiry: '2019/05/15'
  },
  {
    putcall: "Put",
    strike: 195.00,
    collateral: 1000,
    multiplier: 61,
    piggyExpiry: "2019/06/30",
    price: 45.00,
    auctionExpiry: '2019/05/15'
  },
  {
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


const PiggyTableExpandable = () => {
  const expandRow = {
    renderer: row => (
      <div>
        <p>{`This Expand row is belong to "${row.putcall}"`}</p>
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
          keyField="putcall"
          data={tableData}
          columns={tableColumns}
          expandRow={expandRow}
          pagination={paginationFactory({
            sizePerPage: 5,
            sizePerPageList: [5, 10, 25, 50]
          })}
        />
      </CardBody>
    </Card>
  );
};

export default PiggyTableExpandable;
