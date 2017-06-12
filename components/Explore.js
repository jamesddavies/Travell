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
import Background from "./Background";
import LinearGradient from "react-native-linear-gradient";
import Picker from "react-native-wheel-picker";
var PickerItem = Picker.Item;
import { APIKEY, PLACES } from "../config.js";
import DistanceSelect from "./DistanceSelect";
import PlaceCard from "./PlaceCard";

export default class Explore extends Component {
	static navigationOptions = {
    	tabBarLabel: 'Explore'
    };

  constructor(props) {
    super(props);

    this.state = {
      lat: null,
      lon: null,
      error: null,
      placeType: 0,
      distance: 10000,
      icon: null,
      placeName: null,
      openNow: null,
      rating: null,
      vicinity: null,
      placeLocation: null,
      searching: false,
      isMounted: false
    };

    this._findPlace = this._findPlace.bind(this);
  }

  componentWillMount() {
    this.setState({isMounted: true});
    navigator.geolocation.getCurrentPosition(
      position => {
        if (this.state.isMounted){
          this.setState({
           lat: position.coords.latitude,
           lon: position.coords.longitude,
           error: null
          });
        }
      },
      error => { if (this.state.isMounted){ this.setState({ error: error.message }) } },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentWillUnmount(){
    this.setState({isMounted: false});
  }

  onPickerSelect(index) {
    this.setState({
      placeType: index
    });
  }

  _findPlace() {
    this.setState({
      icon: null,
      placeName: null,
      openNow: null,
      rating: null,
      vicinity: null,
      placeLocation: null,
      searching: true,
      error: null
    });
    return fetch(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=" +
        APIKEY +
        "&location=" +
        this.state.lat +
        "," +
        this.state.lon +
        "&radius=" +
        this.state.distance +
        "&type=" +
        PLACES[this.state.placeType][1]
    )
      .then(response => response.json())
      .then(data => {
        let rand = Math.floor(Math.random() * data.results.length);
        let place = data.results[rand];

      if (place == null){
        this.setState({ error: "Sorry, no results - try looking for something else!"})
      } else {
        if (place.icon == null) {
          this.setState({ icon: null });
        } else {
          this.setState({ icon: place.icon });
        }
        if (place.name == null) {
          this.setState({ placeName: null });
        } else {
          this.setState({ placeName: place.name });
        }
        if (place.opening_hours == null) {
          this.setState({ openNow: null });
        } else {
          this.setState({ openNow: place.opening_hours.open_now });
        }
        if (place.rating == null) {
          this.setState({ rating: null });
        } else {
          this.setState({ rating: place.rating });
        }
        if (place.vicinity == null) {
          this.setState({ vicinity: null });
        } else {
          this.setState({ vicinity: place.vicinity });
        }
        if (place.geometry.location.lat == null) {
          this.setState({ placeLocation: null });
        } else {
          this.setState({
            placeLocation:
              place.geometry.location.lat + "," + place.geometry.location.lng
          });
        }
      }
      });
    
    this.setState({ searching: false });
  }

  _minusKm() {
    if (this.state.distance > 1000) {
      this.setState({
        distance: this.state.distance - 1000
      });
    }
  }

  _addKm() {
    if (this.state.distance < 50000) {
      this.setState({
        distance: this.state.distance + 1000
      });
    }
  }

  render() {
    let distances = [2, 5, 8, 10, 15, 20, 30, 40, 50];
    let h = Dimensions.get("window").height;

    return (
      <View>
        <Background />
        <ScrollView contentContainerStyle={{ flex: 0 }}>
          <View style={styles.container}>

            {!this.state.lon
              ? <ActivityIndicator
                  color="#fdfdfd"
                  size="large"
                  style={{ marginTop: 120 }}
                />
              : <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row"
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      {PLACES[this.state.placeType][0][0] == "A"
                        ? "I want to find an..."
                        : "I want to find a..."}
                    </Text>
                    <Picker
                      style={{ width: 200, height: 180 }}
                      selectedValue={this.state.placeType}
                      itemStyle={{ fontSize: 18 }}
                      onValueChange={index => this.onPickerSelect(index)}
                    >
                      {PLACES.map((value, i) =>
                        <PickerItem label={value[0]} value={i} key={value[0]} />
                      )}
                    </Picker>
                  </View>

                  <DistanceSelect
                    add={() => this._addKm()}
                    minus={() => this._minusKm()}
                    distance={this.state.distance}
                  />

                  <TouchableNativeFeedback onPress={() => this._findPlace()}>
                    <View style={[styles.goButton, { width: 300 }]}>
                      <Text style={{ fontSize: 16 }}>Go</Text>
                    </View>
                  </TouchableNativeFeedback>

                  {!this.state.searching
                    ? <View />
                    : <PlaceCard
                        name={this.state.placeName}
                        icon={this.state.icon}
                        openNow={this.state.openNow}
                        rating={this.state.rating}
                        vicinity={this.state.vicinity}
                        location={this.state.placeLocation}
                        error={this.state.error}
                      />}
                </View>}

          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: 20
  },
  goButton: {
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    height: 40
  }
});
