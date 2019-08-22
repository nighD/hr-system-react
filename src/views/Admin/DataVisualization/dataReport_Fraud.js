import React, { Component} from 'react';

import { withFirebase } from '../../../containers/Firebase';
// import * as actionService from '../../../services/actionService';
import 'react-pivottable/pivottable.css';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import Widget04 from '../../Widgets/Widget04';
class DataReport_Fraud extends Component {
  constructor(props) {
    super(props);
    this.state = {persons:[]}
  }

render() {
  return (
    <div className="animated fadeIn">
      <Row>
        <Col sm="6" md="3">
          <Widget04 icon="icon-people" color="danger" header="100%" value="100%" invert>Scam by working Overtime</Widget04>
            </Col>
        <Col sm="6" md="3">
          <Widget04 icon="icon-user-follow" color="warning" header="214" value="214" invert>Large Steals Culprit</Widget04>
            </Col>
        <Col sm="6" md="3">
            <Widget04 icon="icon-user-following" color="success" header="454" value="454" invert>Normal Behaviours</Widget04>
        </Col>
        <Col sm="6" md="3">
            <Widget04 icon="icon-fire" color="primary" header="90%" value="90%" invert>Accuracy</Widget04>
        </Col>
      </Row>
        <Row>
            <Col xs="12" sm="6" lg="4">
              <Card>
                <CardHeader>
                  Environment Satisfaction
                </CardHeader>
                <CardBody>
                  <iframe width="100%" height="300" display="block" frameborder="0" scrolling="no" src="//plot.ly/~baole16/29.embed?show_link=false&autosize=true&logo=false&height=100%" title = "1"></iframe>
                </CardBody>
              </Card>
            </Col>

            <Col xs="12" sm="6" lg="4">
              <Card >
                <CardHeader>
                  Relationship Satisfaction
                </CardHeader>
                <CardBody>
                  <iframe width="100%" height="300" display="block" frameborder="0" scrolling="no" src="//plot.ly/~baole16/33.embed?show_link=false&autosize=true" title = "2"></iframe>
                </CardBody>
              </Card>
            </Col>

            <Col xs="12" sm="6" lg="4">
              <Card >
                <CardHeader>
                  Job Satisfaction
                </CardHeader>
                <CardBody>
                  <iframe width="100%" height="300" display="block" frameborder="0" scrolling="no" src="//plot.ly/~baole16/31.embed?show_link=false&autosize=true" title = "3"></iframe>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="6" lg="7">
              <Card>
                <iframe width="100%" height="627" frameborder="0" scrolling="no" src="//plot.ly/~baole16/18.embed?show_link=false&autosize=true" title = "4"></iframe>
              </Card>
            </Col>

            <Col xs="12" md="6" lg="5">
              <Row>
                <Col xs="12" md="6" lg="12">
                  <Card>
                    <iframe width="100%" height="300" frameborder="0" scrolling="no" src="//plot.ly/~baole16/24.embed?show_link=false&autosize=true" title = "5"></iframe>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="6" lg="12">
                  <Card>
                    <iframe width="100%" height="300" frameborder="0" scrolling="no" src="//plot.ly/~baole16/27.embed?show_link=false&autosize=true" title = "6"></iframe>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                  <Col xs="12" sm="6" lg="6">
                    <iframe width="100%" height="400" display="block" frameborder="0" scrolling="no" src="//plot.ly/~baole16/16.embed?show_link=false&autosize=true&height=100%" title = "7"></iframe>
                  </Col>
                  <Col xs="12" sm="6" lg="6">
                    <iframe width="100%" height="400" display="block" frameborder="0" scrolling="no" src="//plot.ly/~baole16/20.embed?show_link=false&autosize=true&height=100%" title = "8"></iframe>
                  </Col>
                  </Row>
                </CardBody>
                
              </Card>
            </Col>
          </Row>
        </div>
    );
  }
}

export default withFirebase(DataReport_Fraud);
