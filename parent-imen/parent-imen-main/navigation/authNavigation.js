import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconFontisto from "react-native-vector-icons/Fontisto";
import Login from "../screens/login";
import Signup from "../screens/signup";
import Landing from "../screens/landing";
import JardinDetail from "../screens/jardin-detail";

const Auth = createStackNavigator(
  {
    Login: Login,
    Signup: Signup,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#5e35b1",
      },
      headerTintColor: "white",
    },
  }
);

const Home = createStackNavigator(
  {
    Landing: Landing,
    JardinDetail: JardinDetail
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#039be5",
      },
      headerTintColor: "white",
    },
  }
);

const AppNav = createMaterialBottomTabNavigator(
  {
    Acceuil: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <IconAntDesign name="home" size={25} color="#fafafa" />;
        },
        tabBarColor: "#039be5",
      },
    },
    Login: {
      screen: Auth,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <IconFontisto name="person" size={25} color="#fafafa" />;
        },
        tabBarColor: "#5e35b1",
      },
    },
  },
  {
    activeColor: "white",
    shifting: true,
  }
);

export default createAppContainer(AppNav);
