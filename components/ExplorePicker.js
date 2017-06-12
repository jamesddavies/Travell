import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableNativeFeedback,
  ActivityIndicator,
  ScrollView
} from "react-native";
import Picker from "react-native-wheel-picker";
var PickerItem = Picker.Item;
import { PLACES } from "../config.js";

export default class ExplorePicker extends Component {
  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(index) {
    this.props.onSelect(index);
  }

  render() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row"
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>
          {PLACES[this.props.placeType][0][0] == "A"
            ? "I want to find an..."
            : "I want to find a..."}
        </Text>
        <Picker
          style={{ width: 200, height: 180 }}
          selectedValue={this.props.placeType}
          itemStyle={{ color: "white", fontSize: 22 }}
          onValueChange={index => this.onSelect(index)}
        >
          {PLACES.map((value, i) =>
            <PickerItem label={value[0]} value={i} key={value[0]} />
          )}
        </Picker>
      </View>
    );
  }
}
