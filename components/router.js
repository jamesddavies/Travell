import React from "react";
import { TabNavigator } from "react-navigation";

import Convert from "./Convert";
import Translate from "./Translate";
import Explore from "./Explore";

const Tabs = new TabNavigator(
  {
    Convert: {
      screen: Convert
    },
    Translate: {
      screen: Translate
    },
    Explore: {
      screen: Explore      
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "#89AADF"
      },
      activeTintColor: "#FFF",
      //showIcon: true
    }
  }
);

export default Tabs;
