import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ActivityIndicator
} from "react-native";
import Background from "./components/Background";
import Explore from "./components/Explore";
import Translate from "./components/Translate";
import Tabs from "./components/router";

export default class travell extends Component {
  constructor(props){
    super(props);

    this.state = {
      ready: false
    }
  }

  componentDidMount(){
    setTimeout(function(){
      this.setState({ready: true})
    }.bind(this),2000)
  }


  render() {

    return (
      <View style={{flex: 1}}>
      
        <Tabs />
    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

AppRegistry.registerComponent("travell", () => travell);
