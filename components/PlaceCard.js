import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableNativeFeedback,
  Image,
  ActivityIndicator,
  Linking
} from "react-native";
import { APIKEY } from "../config.js";
import PropTypes from "prop-types";

export default class PlaceCard extends Component {
  render() {
    let w = Dimensions.get("window").width;

    return (
      <View style={styles.container}>
        {this.props.error != null ?
          <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 20, textAlign: "center" }}>
                {this.props.error}
              </Text>
          </View>
          :
          !this.props.name
          ? <ActivityIndicator color="#89AADF" size="large" />
          : <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 26, textAlign: "center" }}>
                {this.props.name}
              </Text>
              <Image source={{ uri: this.props.icon }} style={styles.icon} />
              {this.props.openNow !== null
                ? !this.props.openNow
                  ? <Text style={{ fontSize: 18, color: "#D60611" }}>
                      Closed
                    </Text>
                  : <Text style={{ fontSize: 18, color: "#0AB504" }}>
                      Open Now
                    </Text>
                : <Text style={{ fontSize: 18, textAlign: "center" }}>
                    No Opening Times Information
                  </Text>}
              <Text style={{ fontSize: 20, marginBottom: 10, marginTop: 10 }}>
                Rating: {!this.props.rating ? "N/A" : this.props.rating}
              </Text>
              <Text style={{ fontSize: 18, textAlign: "center" }}>
                {this.props.vicinity}
              </Text>
              <TouchableNativeFeedback
                onPress={() =>
                  Linking.openURL(
                    "https://www.google.com/maps/place/" + this.props.location
                  )}
              >
                <View style={[styles.linkButton, { width: 260 }]}>
                  <Text style={{ fontSize: 16 }}>View on Google Maps</Text>
                </View>
              </TouchableNativeFeedback>
            </View>}
      </View>
    );
  }
}

PlaceCard.PropTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  openNow: PropTypes.string,
  rating: PropTypes.string,
  vicinity: PropTypes.string,
  location: PropTypes.string,
  error: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 40
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    marginTop: 10
  },
  linkButton: {
    borderRadius: 4,
    backgroundColor: "rgba(137,170,223,0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    height: 40
  }
});
