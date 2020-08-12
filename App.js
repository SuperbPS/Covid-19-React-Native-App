import * as React from 'react';
import { Text, Button, Image, View, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import { Constants } from 'expo';
import HomeScreen from './screens/HomePage';
var screenWidth = Dimensions.get('window').width;

import { Ionicons, AntDesign } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';
import BottomNavigation from './screens/BottomNavigation';
import IssuesList from './screens/IssuesList';
import AllReports from './screens/AllReports';
import IndiaStatistics from './screens/IndiaStatistics';
import OnBoardScreen from './screens/OnBoard';
import MainPageScreen from './screens/MainPageScreen';
import ProfileScreen from './screens/Profile';
import { createStackNavigator } from 'react-navigation-stack';


const AppStack = createStackNavigator({

  HomePage: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  MainPage: {
    screen: MainPageScreen,
    navigationOptions: {
      headerShown: false
    }
  },


  IssueListPage: {
    screen: IssuesList,
    navigationOptions: {
      headerShown: false
    }
  },

  AllReportsPage: {
    screen: AllReports,
    navigationOptions: {
      headerShown: false
    }
  },


  IndiaStatisticsPage: {
    screen: IndiaStatistics,
    navigationOptions: {
      headerShown: false
    }
  },

  ProfilePage: {
    screen: ProfileScreen,
    navigationOptions: {
      headerShown: false
    }
  },

  OnboardPage: {
    screen: OnBoardScreen,
    navigationOptions: {
      headerShown: false
    }
  },

  BottomNavigation: {
    screen: BottomNavigation,
    navigationOptions: {
      headerShown: false
    }
  },

}, {
  initialRouteName: 'OnboardPage',
}
);

const App = createAppContainer(AppStack);

export default App;


