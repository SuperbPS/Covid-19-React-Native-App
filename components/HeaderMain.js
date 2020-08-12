import React from 'react';
import { StyleSheet, Button, Text, View , Image,Dimensions ,TouchableOpacity , ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigator } from 'react-navigation';
import { withNavigation,DrawerActions,NavigationActions } from 'react-navigation';

class HeaderMain extends React.Component {
  
  constructor(props) {
    super(props); 
    //console.log("props",props.navigation);
  } 
  _onPressButton = () => {
  this.props.navigation.openDrawer();
  //this.props.navigation.navigate('DrawerOpen')
  }
  async componentDidMount() {
    count = global.cartCount;
    this.props.navigation.addListener(
      'didFocus',
      payload => {       
         this.props.navigation.setParams({count:global.cartCount});
        count = global.cartCount;
      }
    );
  }
    render() {
        return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.leftMenu} onPress={()=> this._onPressButton()}>
                 <Ionicons name="md-menu" size={32} color="black" />
            </TouchableOpacity>
           
            <TouchableOpacity style={styles.logo} onPress={()=>this.props.navigation.navigate('HomePage')}>
              <Image style={styles.logoImage} source={require('../assets/icon-1.png')} />
            </TouchableOpacity>
            <View style={styles.rightTop}>
              <TouchableOpacity style={styles.rightFixCart} onPress={()=>this.props.navigation.navigate('CartPage')}>
                <Ionicons name="md-cart" size={32} color="black" />             
              </TouchableOpacity>
              <View style={{position:'absolute',backgroundColor:'#fc0fc0',top:0,right:5,width:20,height:20,borderRadius:10}}>
                    <Text style={{color:'#fff',textAlign:'center',fontSize:11,paddingTop:3}}>{count}</Text>
              </View>
            </View>
        </View>
        );
    }
} 

export default withNavigation(HeaderMain);

const styles = StyleSheet.create({
    header: {
    marginTop:30,
    height:50,
    flexDirection:'row'
  },
  leftMenu: {
    flex:1,
    flexDirection:'column',
    marginLeft:10,
    marginTop:5
  },
  logo: {
    flex:1.5,
    flexDirection:'column',
    alignItems:'center',
    marginTop:5,
  },
  logoImage: {
    marginTop:5,
    resizeMode:'cover'
  },
  rightTop: {
    flex:1.4,
    position:'relative',
    right:0,
    flexDirection:'column',
  },
  rightFix: {
    position:'absolute',
    right:60,
    marginTop:5
  },
  rightFixCart: {
    position:'absolute',
    right:10,
    marginTop:5
  },

});