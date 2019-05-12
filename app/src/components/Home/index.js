import React, { Component } from 'react'

//import components
import Button from 'react-bootstrap/Button'

class Home extends Component {
  constructor(props, context) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    //console.log(addresses)
    return (
      <div className="App">
      Hello
      <Button variant="primary">Button</Button>
      </div>
    )
  }
}

export default Home
