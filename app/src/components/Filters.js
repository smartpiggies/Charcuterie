import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox
} from "availity-reactstrap-validation";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Button,
  Label,
  FormGroup,
  CustomInput
} from "reactstrap";

/* actions */
import * as filterActionCreators    from '../redux/actions/filterActions';



class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    const { filters } = this.props.actions
    const defaultValues = {
      AuctionsRadio: 'AllAuctions',
      DirectionsRadio: 'AllDirections',
      ExpirationRadio: 'AllExpires',
      StyleRadio: 'AllStyles',
    }

    return (
      <Container fluid className="sidebar-content">

        <Card className='sidebar-nav'>
          {/*<CardHeader>
            <CardTitle tag="h5">Filters</CardTitle>
          </CardHeader> */}
          <CardBody>
            <AvForm model={defaultValues}>


              {/* Radios */}

              <h4>Auction Filters</h4>
              <AvRadioGroup name="AuctionsRadio" required>
                <AvRadio
                  customInput label="All Auctions"
                  value="AllAuctions"
                  onClick={() => filters.showAllAuctions()}
                />
                <AvRadio
                  customInput label="For Sale"
                  value="Only on Auction"
                  onClick={() => filters.showForSale()}
                />
                <AvRadio
                  customInput label="Not On Auction"
                  value="Only not on Auction"
                  onClick={() => filters.showNotForSale()}
                />
              </AvRadioGroup>
              <hr />
              <h4>Put / Call Filters</h4>
              <AvRadioGroup name="DirectionsRadio" required>
                <AvRadio
                  customInput label="All Directions"
                  value="AllDirections"
                  onClick={() => filters.showAllPutCall()}
                  checked
                />
                <AvRadio
                  customInput label="Puts Only"
                  value="Puts Only"
                  onClick={() => filters.showOnlyPuts()}
                />
                <AvRadio
                  customInput label="Calls Only"
                  value="Calls Only"
                  onClick={() => filters.showOnlyCalls()}
                />
              </AvRadioGroup>
              <hr />
              <h4>Expiry Filters</h4>
              <AvRadioGroup name="ExpirationRadio" required>
                <AvRadio
                  customInput label="All Expires"
                  value="AllExpires"
                  onClick={() => filters.showAllExpiry()}
                />
                <AvRadio
                  customInput label="Only non-expired"
                  value="Only non-expired"
                  onClick={() => filters.showNotExpired()}
                />
                <AvRadio
                  customInput label="Only expired"
                  value="Only expired"
                  onClick={() => filters.showExpired()}
                />
              </AvRadioGroup>
              <hr />
              <h4>Style Filters</h4>
              <AvRadioGroup name="StyleRadio" required>
                <AvRadio
                  customInput label="All Styles"
                  value="AllStyles"
                  onClick={() => filters.showAllStyles()}
                />
                <AvRadio
                  customInput label="Only American"
                  value="Only American"
                  onClick={() => filters.showAmerican()}
                />
                <AvRadio
                  customInput label="Only European"
                  value="Only European"
                  onClick={() => filters.showEuropean()}
                />
              </AvRadioGroup>
            </AvForm>
          </CardBody>
        </Card>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      filters: bindActionCreators(filterActionCreators, dispatch)
    }
  };
}

export default connect(null, mapDispatchToProps)(Filters);
