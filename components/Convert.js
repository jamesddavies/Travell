import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, TextInput, ActivityIndicator, Image, ScrollView } from "react-native";
import Background from "./Background";
import LinearGradient from "react-native-linear-gradient";
import Picker from "react-native-wheel-picker";
var PickerItem = Picker.Item;
import Conversion from "./Conversion";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Translate extends Component {

  static navigationOptions = {
      tabBarLabel: 'Convert',
    tabBarIcon:  () => (
          <Icon
            name="monetization-on"
            size={24}
            style={{ color: "white" }}
          />
          )
    };

  constructor(props) {
    super(props);

    this.state = {
      baseCurr: "GBP",
      baseCurrIndex: 0,
      convCurrIndex: 0,
      currList: null,
      amount: "1"
    };

    this.getCurrencies = this.getCurrencies.bind(this);
  }

  getCurrencies() {
    var currencies = [this.state.baseCurr];

    return fetch("http://api.fixer.io/latest?base=" + this.state.baseCurr)
      .then(response => response.json())
      .then(data => {
        for (var curr in data.rates) {
          if (data.rates.hasOwnProperty(curr)) {
            currencies.push(curr);
          }
        }
        this.setState({
          currList: currencies
        });
      })
      .catch(error => alert(error));
  }

  componentWillMount() {
    if (!this.state.currList){
      this.getCurrencies();
    }
  }

  onBasePickerSelect(index) {
    this.setState({
      baseCurrIndex: index
    });
  }

  onCurrPickerSelect(index) {
    this.setState({
      convCurrIndex: index
    });
  }

  render() { 
    let w = Dimensions.get("window").width;

    return (
        <View>
          <Background />
            <ScrollView contentContainerStyle={{ flex: 0 }}>
              <View style={styles.container}>
          {!this.state.currList
            ? <View>
        <Image
          source={require("../img/travell.png")}
          style={{ width: w * 0.8 }}
          resizeMode="contain"
        />
        <ActivityIndicator color="#fdfdfd" size="large" />
      </View>
            : <View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <TextInput
                    style={{
                      height: 50,
                      fontSize: 18,
                      width: 200,
                      marginTop: 30,
                      marginBottom: 40,
                      textAlign: "center"
                    }}
                    onChangeText={text => this.setState({ amount: text })}
                    value={this.state.amount}
                    keyboardType="numeric"
                  />
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={styles.PickerContainer}>
                    <Text>From:</Text>
                    <Picker
                      style={{ width: 150, height: 180 }}
                      selectedValue={this.state.baseCurrIndex}
                      itemStyle={{ color: "black", fontSize: 26 }}
                      onValueChange={index => this.onBasePickerSelect(index)}
                    >
                      {this.state.currList.map((value, i) =>
                        <PickerItem label={value} value={i} key={value} />
                      )}
                    </Picker>
                  </View>

                  <View style={styles.PickerContainer}>
                    <Text>To:</Text>
                    <Picker
                      style={{ width: 150, height: 180 }}
                      selectedValue={this.state.convCurrIndex}
                      itemStyle={{ color: "black", fontSize: 26 }}
                      onValueChange={index => this.onCurrPickerSelect(index)}
                    >
                      {this.state.currList.map((value, i) =>
                        <PickerItem label={value} value={i} key={value} />
                      )}
                    </Picker>
                  </View>

                </View>

                <Conversion
                  amount={this.state.amount}
                  base={this.state.currList[this.state.baseCurrIndex]}
                  conv={this.state.currList[this.state.convCurrIndex]}
                />

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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  PickerContainer: {
    alignItems: "center",
    justifyContent: "center"
  }
});
