import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";

export default class DistanceSelect extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 16, marginRight: 50 }}>
          Within:
        </Text>
        <TouchableNativeFeedback onPress={this.props.minus}>
          <View style={styles.numButton}>
            <Text style={{ fontSize: 16 }}>-</Text>
          </View>
        </TouchableNativeFeedback>
        <Text style={{ fontSize: 18 }}>
          {this.props.distance / 1000}km
        </Text>
        <TouchableNativeFeedback onPress={this.props.add}>
          <View style={styles.numButton}>
            <Text style={{ fontSize: 16 }}>+</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 14
  },
  numButton: {
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    alignItems: "center",
    width: 22,
    height: 22,
    margin: 20
  }
});
