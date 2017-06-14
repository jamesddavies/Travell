import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableNativeFeedback,
  Picker,
  ActivityIndicator
} from "react-native";
var PickerItem = Picker.Item;
import Background from "./Background";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SUBKEY, LANGUAGES } from "../config.js";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Translate extends Component {

  static navigationOptions = {
      tabBarLabel: 'Translate',
    tabBarIcon:  () => (
          <Icon
            name="translate"
            size={24}
            style={{ color: "white" }}
          />
          )
    };

  constructor(props) {
    super(props);

    this.state = {
      text: null,
      fromLang: "en",
      toLang: "en",
      translatedText: null,
      token: null,
      isMounted: false
    };

    this.getToken = this.getToken.bind(this);
  }

  parseXML(string) {
    return string.replace(/<[^>]*>/g, " ").replace(/\s{2,}/g, " ").trim();
  }

  _translatePhrase() {
    return fetch(
      "https://api.microsofttranslator.com/v2/http.svc/Translate?appid=Bearer%20" +
        this.state.token +
        "&text=" +
        this.state.text +
        "&from=" +
        this.state.fromLang +
        "&to=" +
        this.state.toLang +
        "",
      {
        header: {
          Accept: "application/xml"
        }
      }
    )
      .then(response => response.text())
      .then(data => this.setState({ translatedText: this.parseXML(data) }));
  }

  getToken() {
    return fetch(
      "https://api.cognitive.microsoft.com/sts/v1.0/issueToken?Subscription-Key=" +
        SUBKEY,
      {
        header: {
          Accept: "application/jwt",
          "Content-Type": "application/json"
        },

        method: "POST"
      }
    )
      .then(response => response.text())
      .then(data => { if (this.state.isMounted){ this.setState({ token: data }) } });
  }

  componentWillMount() {
    this.setState({isMounted: true})
    this.getToken();
  }

  componentWillUnmount(){
    this.setState({isMounted: false});
  }

  render() {

    let h = Dimensions.get("window").height;

    return (
      <KeyboardAwareScrollView contentContainerStyle={{ height: h }}>
        <View style={styles.container}>
          <Background />
          <View>
            <TextInput
              style={{
                height: 50,
                fontSize: 18,
                width: 300,
                marginBottom: 40,
                textAlign: "center"
              }}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              placeholder="Text to Translate"
            />

            <View>
              <View
                style={{
                  backgroundColor: "rgba(255,255,255,0)",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <Text>From:</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      style={styles.picker}
                      selectedValue={this.state.fromLang}
                      onValueChange={lang => this.setState({ fromLang: lang })}
                    >

                      {LANGUAGES.map(value =>
                        <PickerItem label={value[1]} value={value[0]} key={value[0]} />
                      )}

                    </Picker>
                  </View>
                </View>

                <View style={{ flexDirection: "column" }}>
                  <Text>To:</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      style={styles.picker}
                      selectedValue={this.state.toLang}
                      onValueChange={lang => this.setState({ toLang: lang })}
                    >

                      {LANGUAGES.map(value =>
                        <PickerItem label={value[1]} value={value[0]} key={value[0]} />
                      )}

                    </Picker>
                  </View>
                </View>
              </View>
            </View>

            <TouchableNativeFeedback onPress={() => this._translatePhrase()}>
              <View style={styles.button}>
                <Text style={{ fontSize: 16 }}>Translate</Text>
              </View>
            </TouchableNativeFeedback>

            <Text style={styles.translation}>
              {!this.state.translatedText ? "..." : this.state.translatedText}
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
  picker: {
    height: 30,
    width: 120,
    color: "white"
  },
  pickerContainer: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 10
  },
  button: {
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    height: 40
  },
  translation: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 46,
    color: "#000",
    textAlign: "center",
    marginTop: 60,
    width: 300
  }
});
