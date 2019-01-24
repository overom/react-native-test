import React, { Component } from 'react';
import _ from 'lodash';
import EmployeeForm from './EmployeeForm';
import { connect } from 'react-redux';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';
import Communications from 'react-native-communications';

class EmployeeEdit extends Component {
  state = { showModale: false };
  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;
    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  onAccept() {
    this.props.employeeDelete({ uid: this.props.employee.uid });
  }

  onDecline() {
    this.setState({ showModale: false });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button onPressDuButton={this.onButtonPress.bind(this)}>Save Changes</Button>
        </CardSection>
        <CardSection>
          <Button onPressDuButton={this.onTextPress.bind(this)}>Text Schedule</Button>
        </CardSection>

        <CardSection>
          <Button onPressDuButton={() => this.setState({ showModale: !this.state.showModale })}>
            Fire Employee
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModale}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this ?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(
  mapStateToProps,
  { employeeUpdate, employeeSave, employeeDelete }
)(EmployeeEdit);
