import React from 'react';
import { StyleSheet, Button, Text, View , Image,Dimensions ,TouchableOpacity , ScrollView , AsyncStorage} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigator, StackActions, NavigationActions } from 'react-navigation';
import { withNavigation } from 'react-navigation';
import DrawerLeft from '../App';
import HomeScreen  from '../screens/HomePage';
import { LinearGradient ,font} from 'expo';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';

class DrawerDesign extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      //fontLoaded: false ,
      isLogin: false,
      userName: '',
      userId:'',
      catSubCategory:[],
      featuredSeller:[]
    };
    
    _retrieveData = async () => {
      try {
        const isLogin = await AsyncStorage.getItem('userLogin');
        const userName = await AsyncStorage.getItem('userName');
        const userId = await AsyncStorage.getItem('userId');
        console.log("isLogin",isLogin);
         
        if (isLogin !== null) {
            // We have data!!
            console.log("value",isLogin);
            this.setState({
              isLogin: true,
              userName:userName,
              userId:userId
            });
            console.log("state now is ",this.state);
          } else {
            console.log("jolly")
          }
      } catch (error) {
        // Error retrieving data
      }
    };
    _retrieveData();
  }

  async componentDidMount() {
    // const cartObject = await AsyncStorage.getItem('cartObject');
    // test = JSON.parse(cartObject);
    // console.log("cart length",test.length);
    
  
    

    this.setState({ fontLoaded: true });
    return fetch('http://unikonfashion.com:3000/home_app')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("resp")
        this.setState({
          isLoading: false,
          catSubCategory:responseJson.catSubCategory,
          featuredSeller:responseJson.featuredSeller
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  test = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'BlogPage' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  logout = async() => {
    AsyncStorage.clear();
    this.props.navigation.navigate('MainPage');
}

  // goToAbout() {
  //   const resetAction = StackActions.reset({
  //     index: 0,
  //     actions: [NavigationActions.navigate({ routeName: 'AboutPage' })],
  //   });
  //   this.props.navigation.dispatch(resetAction);
  // }

  displayHeaderlogin() {
    if(this.state.isLogin){  
      return  <TouchableOpacity>
      <View>
      <Ionicons name="md-contact" style={[styles.userIcon]}  size={50} color="white" />
        <Text style={styles.headingLogin}> Hi, {this.state.userName}  </Text>
      </View>
      </TouchableOpacity>
    } else {
      return <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginPage')}>
      <View>
      <Ionicons name="md-contact" style={[styles.userIcon]}  size={50} color="white" />
        <Text style={styles.headingLogin}> Log In | Sign Up </Text>
      </View>
    </TouchableOpacity>
    }
  }
  displayLogout() {
    if(this.state.isLogin){  
      return  <View  style={styles.list}>
      <TouchableOpacity onPress={() => this.logout()}>
        <View style={styles.singleList}>
            <View style={styles.iconFlex}>
              <Ionicons name="ios-power" style={[styles.menuIcon,{color:'#ff0d00'}]}  size={15} color="black" />
            </View>
            <View style={styles.textFlex}>
              <Text style={styles.headingMenu}> Logout </Text>
            </View>
            <View style={styles.rightArrow}>
              <Ionicons name="ios-arrow-forward" style={styles.rightArrowIcon}  size={15} ></Ionicons>
            </View>             
        </View>
      </TouchableOpacity>
</View>
    } else {
      return 
    }
  }
  
//   goToHome = (index) => {
//     console.log("Hello",index)
//     this.props.navigation.navigate(index);
//   }

    render() {
      const listItems = [
    
    {
      title: 'Blog',
      icon: 'ios-book',
      page: 'BlogPage',
      color:'#fc0fc0'
    },
    
];

        return (
          <View>
            
            <LinearGradient
              colors={['#aa45c0', '#fc0fc0']}
              style={styles.header}>
              {this.displayHeaderlogin()}     
          </LinearGradient>

          <View  style={styles.list}>
                <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()}>
                  <View style={styles.singleList}>
                      <View style={styles.iconFlex}>
                        <Ionicons name="ios-home" style={[styles.menuIcon,{color:'#878787'}]}  size={15} color="black" />
                      </View>
                      <View style={styles.textFlex}>
                        <Text style={styles.headingMenu}> Home </Text>
                      </View>
                      <View style={styles.rightArrow}>
                        <Ionicons name="ios-arrow-forward" style={styles.rightArrowIcon}  size={15} ></Ionicons>
                      </View>             
                  </View>
                </TouchableOpacity>
        </View>
 
  <View>
<Collapse>
    <CollapseHeader>
    <View  style={styles.list}>
                
                  <View style={styles.singleList}>
                      <View style={styles.iconFlex}>
                        <Ionicons name="ios-woman" style={[styles.menuIcon,{color:'#878787'}]}  size={15} color="black" />
                      </View>
                      <View style={styles.textFlex}>
                        <Text style={styles.headingMenu}> Looks </Text>
                      </View>
                      <View style={styles.rightArrow}>
                        <Ionicons name="ios-add" style={styles.rightArrowIcon}  size={15} ></Ionicons>
                      </View>             
                  </View>
                
        </View>
    </CollapseHeader>
    <CollapseBody>
     {
      (this.state.catSubCategory.length > 0) ?
      <View>
          {this.state.catSubCategory.map((item,key) =>
                    (
                      <View  style={styles.list}>
                      <TouchableOpacity onPress={()=> this.props.navigation.navigate('CategoryPage',{catID:item.Product_Category})}>
                        <View style={styles.singleList}>
                          
                            <View style={styles.textFlex}>
                              <Text style={styles.headingMenu}> {item.Product_Category} </Text>
                            </View>
                                      
                        </View>
                      </TouchableOpacity>
        </View>
                    ))
              }
      </View> : 
          <View></View>
     } 
    
    </CollapseBody>
    
</Collapse>

</View>
  
  <View>
<Collapse>
    <CollapseHeader>
    <View  style={styles.list}>
                
                  <View style={styles.singleList}>
                      <View style={styles.iconFlex}>
                        <Ionicons name="ios-star" style={[styles.menuIcon,{color:'#f0d01d'}]}  size={15} color="black" />
                      </View>
                      <View style={styles.textFlex}>
                        <Text style={styles.headingMenu}> Featured Collections </Text>
                      </View>
                      <View style={styles.rightArrow}>
                        <Ionicons name="ios-add" style={styles.rightArrowIcon}  size={15} ></Ionicons>
                      </View>             
                  </View>
                
        </View>
    </CollapseHeader>
    <CollapseBody>
     {
      (this.state.featuredSeller.length > 0) ?
      <View>
          {this.state.featuredSeller.map((item,key) =>
                    (
                      <View  style={styles.list}>
                      <TouchableOpacity onPress={()=> this.props.navigation.navigate('CategoryPage',{catID:item.Product_Category})}>
                        <View style={styles.singleList}>
                          
                            <View style={styles.textFlex}>
                              <Text style={styles.headingMenu}> {item.Product_Category} </Text>
                            </View>
                                      
                        </View>
                      </TouchableOpacity>
        </View>
                    ))
              }
      </View> : 
          <View></View>
     } 
    
    </CollapseBody>
    
</Collapse>

</View>
 
  <View  style={styles.list}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('AllProductPage',{catID:'airport',subcatID:'fabric'})}>
                  <View style={styles.singleList}>
                      <View style={styles.iconFlex}>
                        <Ionicons name="ios-cart" style={[styles.menuIcon,{color:'#878787'}]}  size={15} color="black" />
                      </View>
                      <View style={styles.textFlex}>
                        <Text style={styles.headingMenu}> Shop All Products </Text>
                      </View>
                      <View style={styles.rightArrow}>
                        <Ionicons name="ios-arrow-forward" style={styles.rightArrowIcon}  size={15} ></Ionicons>
                      </View>             
                  </View>
                </TouchableOpacity>
  </View>

            {
          listItems.map((item,key) =>
          (
            <View key= {key} style={styles.list}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate(item.page,{catID:'airport',subcatID:'fabric'})}>
                  <View style={styles.singleList}>
                      <View style={styles.iconFlex}>
                        <Ionicons name={item.icon} style={[styles.menuIcon,{color:item.color}]}  size={15} color="black" />
                      </View>
                      <View style={styles.textFlex}>
                        <Text style={styles.headingMenu}> { item.title } </Text>
                      </View>
                      <View style={styles.rightArrow}>
                        <Ionicons name="ios-arrow-forward" style={styles.rightArrowIcon}  size={15} ></Ionicons>
                      </View>             
                  </View>
                </TouchableOpacity>
            </View>
          ))
        }
        <View>
            <Image style={{height:100,width:'100%',resizeMode:'contain'}} source={{uri:'https://s3.amazonaws.com/upload.uxpin/files/641313/635366/FLAT_30__OFF_FOR_NEW_USERS-f68b60.png'}} />
        </View>

        <View  style={styles.list}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutPage')}>
                  <View style={styles.singleList}>
                      <View style={styles.iconFlex}>
                        <Ionicons name="ios-people" style={[styles.menuIcon,{color:'#878787'}]}  size={15} color="black" />
                      </View>
                      <View style={styles.textFlex}>
                        <Text style={styles.headingMenu}> About Us </Text>
                      </View>
                      <View style={styles.rightArrow}>
                        <Ionicons name="ios-arrow-forward" style={styles.rightArrowIcon}  size={15} ></Ionicons>
                      </View>             
                  </View>
                </TouchableOpacity>
        </View>
        <View  style={styles.list}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactPage')}>
                  <View style={styles.singleList}>
                      <View style={styles.iconFlex}>
                        <Ionicons name="ios-call" style={[styles.menuIcon,{color:'#878787'}]}  size={15} color="black" />
                      </View>
                      <View style={styles.textFlex}>
                        <Text style={styles.headingMenu}> Contact Us </Text>
                      </View>
                      <View style={styles.rightArrow}>
                        <Ionicons name="ios-arrow-forward" style={styles.rightArrowIcon}  size={15} ></Ionicons>
                      </View>             
                  </View>
                </TouchableOpacity>
        </View>
        <View  style={styles.list}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('WishListPage')}>
                  <View style={styles.singleList}>
                      <View style={styles.iconFlex}>
                        <Ionicons name="ios-heart" style={[styles.menuIcon,{color:'#ff0d00'}]}  size={15} color="black" />
                      </View>
                      <View style={styles.textFlex}>
                        <Text style={styles.headingMenu}> Wishlist </Text>
                      </View>
                      <View style={styles.rightArrow}>
                        <Ionicons name="ios-arrow-forward" style={styles.rightArrowIcon}  size={15} ></Ionicons>
                      </View>             
                  </View>
                </TouchableOpacity>
        </View>
        {this.displayLogout()}
      </View>
        
        );
    }
}
export default withNavigation(DrawerDesign);

const styles = StyleSheet.create({
    header: {
    height:100,
    flexDirection:'row',
    width:280,
    alignItems:'center',
    justifyContent:'center' 
  },
  userIcon: {
    position:'absolute',
    marginRight:10,
    marginTop:-10,
    left:-50
  },
  loginHeader: {
    backgroundColor:'#fc0fc0',
    flex:1,
    flexDirection:'row',
    width:280,
    paddingTop:40,
    justifyContent:'center'
  },
  headingLogin: {
    color:'#fff',
    fontSize:21,
  },
  singleList: {
    flex:1,
    flexDirection:'row',
    height:50,
    borderBottomWidth:0,
    paddingTop:15,
    paddingLeft:15,
  
  },
  headingMenu: {
    fontSize:17,
    marginLeft:10,
    color:'#414141'
  },
  textFlex: {
  },
  rightArrow: {
    position:'absolute',
    right:10,
    top:15,
  },
  menuIcon: {
     color:'#878787',
  },
  rightArrowIcon: {
    fontSize:21,
    color:'#878787',
  }

});