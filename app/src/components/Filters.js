import React from "react";

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

const Filters = () => (
  <Container fluid className="sidebar-content">

    <Card className='sidebar-nav'>
      {/*<CardHeader>
        <CardTitle tag="h5">Filters</CardTitle>
      </CardHeader> */}
      <CardBody>
        <AvForm>


          {/* Radios */}

          <h4>Auction Filters</h4>
          <AvRadioGroup name="radioCustomInputExample" required>
            <AvRadio customInput label="All" value="All" />
            <AvRadio customInput label="Only on Auction" value="Only on Auction" />
            <AvRadio customInput label="Only not on Auction" value="Only not on Auction" />
          </AvRadioGroup>
        
          <h4>Put / Call Filters</h4>
          <AvRadioGroup name="radioCustomInputExample" required>
            <AvRadio customInput label="All" value="All" />
            <AvRadio customInput label="Puts Only" value="Puts Only" />
            <AvRadio customInput label="Calls Only" value="Calls Only" />
          </AvRadioGroup>

          <h4>Expiry Filters</h4>
          <AvRadioGroup name="radioCustomInputExample" required>
            <AvRadio customInput label="All" value="All" />
            <AvRadio customInput label="Only non-expired" value="Only non-expired" />
            <AvRadio customInput label="Only expired" value="Only expired" />
          </AvRadioGroup>

          <hr />

          {/* checkboxes */}

          <h4>Custom Checkboxes</h4>
          <AvCheckboxGroup name="checkboxCustomInputExample" required>
            <AvCheckbox customInput label="Bulbasaur" value="Bulbasaur" />
            <AvCheckbox customInput label="Squirtle" value="Squirtle" />
            <AvCheckbox customInput label="Charmander" value="Charmander" />
            <AvCheckbox customInput label="Pikachu" value="Pikachu" disabled />
          </AvCheckboxGroup>

          <hr />
        </AvForm>
      </CardBody>
    </Card>
  </Container>
);

export default Filters;
