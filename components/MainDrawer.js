// import React, { Component } from 'react';
// import { Text, Button, View } from 'react-native';
// import { Constants } from 'expo';
// import {
//   createDrawerNavigator,
//   createStackNavigator,
//   DrawerActions,
// } from 'react-navigation';

// const InboxScreen = ({ navigation }) => (
//   <View style={{ justifyContent: 'space-around', flex: 1 }}>
//     <Button
//       title="Toggle Outer"
//       onPress={navigation.toggleOuterDrawer}
//     />
//   </View>
// );

// const InnerDrawer = createDrawerNavigator(
//   {
//     inbox: InboxScreen,
//   },
//   {
//     getCustomActionCreators: (route, stateKey) => {
//       console.log('inner: ' + stateKey);
//       return {
//         toggleInnerDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
//       };
//     },
//   }
// );

// const StackNav = createStackNavigator({
//   drawerLeft: {
//     screen: InnerDrawer,
//     navigationOptions: ({ navigation }) => ({
//       headerRight: (
//         <Button
//           title="Toggle Inner"
//           color="blue"
//           onPress={navigation.toggleInnerDrawer}
//         />
//       ),
//     }),
//   },
// });

// const OuterDrawer = createDrawerNavigator(
//   {
//     stackNav: StackNav,
//   },
//   {
//     drawerPosition: 'right',
//     getCustomActionCreators: (route, stateKey) => {
//       return {
//         toggleOuterDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
//       };
//     },
//   }
// );

// export default class Main extends Component {
//   render() {
//     return <OuterDrawer />;
//   }
// }
