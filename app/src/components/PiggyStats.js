import React from "react";
import { Col, Card, CardBody, Media, Row } from "reactstrap";

import { ShoppingCart, Activity, DollarSign, ShoppingBag } from "react-feather";

import { Link, Hexagon, TrendingDown, TrendingUp, } from 'react-feather';

const PiggyStats = () => (
  <Row>
    <Col md="6" xl>
      <Card className="flex-fill">
        <CardBody className="py-4">
          <Media>
            <div className="d-inline-block mt-2 mr-3">
              <Link className="feather-lg text-primary" />
            </div>
            <Media body>
              <h3 className="mb-2">9001</h3>
              <div className="mb-0">Piggies on Chain</div>
            </Media>
          </Media>
        </CardBody>
      </Card>
    </Col>
    <Col md="6" xl>
      <Card className="flex-fill">
        <CardBody className="py-4">
          <Media>
            <div className="d-inline-block mt-2 mr-3">
              <TrendingDown className="feather-lg text-warning" />
            </div>
            <Media body>
              <h3 className="mb-2">4500</h3>
              <div className="mb-0">Total Puts</div>
            </Media>
          </Media>
        </CardBody>
      </Card>
    </Col>
    <Col md="6" xl>
      <Card className="flex-fill">
        <CardBody className="py-4">
          <Media>
            <div className="d-inline-block mt-2 mr-3">
              <TrendingUp className="feather-lg text-info" />
            </div>
            <Media body>
              <h3 className="mb-2">4501</h3>
              <div className="mb-0">Total Calls</div>
            </Media>
          </Media>
        </CardBody>
      </Card>
    </Col>
    <Col md="6" xl>
      <Card className="flex-fill">
        <CardBody className="py-4">
          <Media>
            <div className="d-inline-block mt-2 mr-3">
              <DollarSign className="feather-lg text-success" />
            </div>
            <Media body>
              <h3 className="mb-2">543</h3>
              <div className="mb-0">On Auction</div>
            </Media>
          </Media>
        </CardBody>
      </Card>
    </Col>
    {/*<Col md="6" xl className="d-none d-xxl-flex">
      <Card className="flex-fill">
        <CardBody className="py-4">
          <Media>
            <div className="d-inline-block mt-2 mr-3">
              <DollarSign className="feather-lg text-info" />
            </div>
            <Media body>
              <h3 className="mb-2">$ 18.700</h3>
              <div className="mb-0">Total Revenue</div>
            </Media>
          </Media>
        </CardBody>
      </Card>
    </Col>*/}
  </Row>
);

export default PiggyStats;
