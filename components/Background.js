import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";

function Background(props) {
  let w = Dimensions.get("window").width;
  let h = Dimensions.get("window").height;

  return (
    <LinearGradient
      colors={["#89AADF", "#FC9FB1", "#FAF172"]}
      style={[styles.linearGradient, { width: w, height: h }]}
    />
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    position: "absolute",
    top: 0,
    left: 0
  }
});

module.exports = Background;
