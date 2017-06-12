import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { CURRENCYNAMES } from "../config.js";

let w = Dimensions.get("window").width;

export default class Conversion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: 0,
      converted: false
    };

    this.getConversion = this.getConversion.bind(this);
  }

  getConversion() {
    return fetch(
      "http://api.fixer.io/latest?base=" +
        this.props.base +
        "&symbols=" +
        this.props.conv
    )
      .then(response => response.json())
      .then(data => {
        for (var conv in data.rates) {
          this.setState({
            result: (this.props.amount * data.rates[conv]).toFixed(2),
            converted: true
          });
        }
      });
  }

  componentWillReceiveProps() {
    this.setState({converted: false})
  }

  componentDidUpdate(){
    if (!this.state.converted){
      this.getConversion();
    }
  }

  render() {
    return (
      <View style={styles.converted}>
        <Text style={{ fontSize: 18, color: "#333" }}>
          {this.props.amount} {CURRENCYNAMES[this.props.base]} =
        </Text>
        <Text style={{ fontSize: 46, color: "#000", marginTop: 12 }}>
          {this.props.base == this.props.conv
            ? this.props.amount
            : this.state.result}
        </Text>
        <Text style={{ fontSize: 22, color: "#000", marginTop: 8, marginBottom: 20 }}>
          {CURRENCYNAMES[this.props.conv]}
        </Text>
      </View>
    );
  }
}

Conversion.propTypes = {
  amount: PropTypes.string.isRequired,
  base: PropTypes.string.isRequired,
  conv: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  converted: {
    alignItems: "center",
    marginTop: 60
  }
});
