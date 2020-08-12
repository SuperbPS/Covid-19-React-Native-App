import React from 'react';
import { StyleSheet, FlatList, Text, View ,Dimensions ,TouchableOpacity ,AsyncStorage, ActivityIndicator, ScrollView } from 'react-native';
import { Image } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { Card } from 'react-native-elements';
import ImageSlider from 'react-native-image-slider';
import { FlatGrid } from 'react-native-super-grid';
import { LinearGradient } from 'expo';
import HeaderMain from '../components/HeaderMain';
import { Font } from 'expo';  

class MainPageScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false 
    };
  }
  async componentDidMount() {
    // await Font.loadAsync({
    //   'Gotham-Book': require('../assets/fonts/GothamRoundedBook_21018.ttf'),
    // });
  

    this.setState({ fontLoaded: true });
    const cartObject = await AsyncStorage.getItem('cartObject');
    cartCount = JSON.parse(cartObject);
    console.log("cartCount",cartCount);
    if(cartCount == null) {
      console.log("cartlength")
      global.cartCount = 0;
    } else {
      global.cartCount =  cartCount.length;  
    }
      
  }
  static navigationOptions = ({ navigation, navigationOptions }) => {

    return {
      headerTitle:  <Image style={{resizeMode:'cover'}} source={require('../assets/icon-1.png')} />,
      headerRight: (
      <TouchableOpacity style={{right:20,top:5}}>
        <View>
          <View>
            <Ionicons name="md-cart" size={32} color="#414141" />
          </View> 

       </View>
      </TouchableOpacity>
    ),
      headerLeft: (
      <TouchableOpacity style={{left:10,top:5}}  onPress={() => this.props.navigation.openDrawer()}>
                 <Ionicons name="md-menu" size={32} color="#414141" />
      </TouchableOpacity>
    ),
      
    };
  };
  
  onPressButton = (index) => {
    this.props.navigation.navigate(index);
  }

    render() {
      const { navigation } = this.props;
    const category = [
      {  image:'https://i.ibb.co/6NPKQB4/uxpmod-99ebe750bac742718ac1a7c40a275530-108546508-resort-1554136148614-ced3b6-c31a23.png' , name:'VS',subTitle:'BY VIJAYA',Page:'drawer' }, { image:'https://i.ibb.co/9NLT4Fg/uxpmod-4ed7ef7e24c648c5b7430940f8b8d7f9-108546508-uxpmod-4ed7ef7e24c648c5b7430940f8b8d7f9-108546508-Lopamudra-Raut-7d237d-e18288-b86d7d.png' , name:'MAQUILLIAGE',subTitle:'BY LOPAMUDRA',Page:''},
      {  image:'https://i.ibb.co/NWpBJNn/uxpmod-2dad5379f2ca4a00b5d65c43420cb762-108546508-Naveli-Deshmukh-Images-5-483263-cca9f6.png' ,name:'NAVELI',subTitle:'BY NAVELI DESHMUKH',Page:''},
    ];
        console.log("In Main Page ");
        return (
          
          <View>
          <View style={{justifyContent: 'center',
    alignItems: 'center',marginTop:40}}> 
              <Image style={{resizeMode:'cover'}} source={require('../assets/icon-1.png')} />
          </View>
          <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.state.fontLoaded ? (
                    <TouchableOpacity onPress={() => this.onPressButton('HomePage')}>
                       <View style={[styles.categoryItemContainer]}>
                        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',zIndex:3}}>
                          
                          <Text style={{textAlign:'center',textTransform:'uppercase',color:'#fff',fontSize:16}}>
                          Go To Home
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  
                    ) : (
          <ActivityIndicator size="large" /> 
        )}
          </ScrollView>
      </View>
        );
    }
}
export default withNavigation(MainPageScreen);

const styles = StyleSheet.create({
    topCards: {
    flexDirection:'row',
    paddingLeft:10
  },
  singleCard: {
    flex:1,
    flexDirection:'column',
    width:120,
    height:100,
    padding:0,
    marginLeft:25,
    borderRadius:15,
    borderWidth:1,
    borderColor:'#fff',
    overflow:'hidden',
  },
  bottomCardText: {
    position:'absolute',
    bottom:0,
    width:120,
    paddingBottom:10,
    opacity:1

  },
  cardCover: {
    resizeMode:'cover',
    width:'100%',
    height:150,
  },
  paragraph:{
    paddingTop:5,
    color:'#fff',
    fontWeight:'bold',
    fontSize:18,
    textAlign:'center'
  },
  slider:{
    marginTop:10,
    flex:1,
    height:200,
    marginBottom:10
  },
  bannerOffer: {
    height:70,
    width:'100%',
    overflow:'hidden',
    marginTop:10
  },
  cardBanner: {
    height:70,
    width:'100%',
    resizeMode:'cover'
  },
  cardBottomBanner: {
    height:200,
    width:'100%',
    resizeMode:'cover'
  },
  contentContainer: {
    paddingVertical: 20,
    paddingBottom:60
  },
  featuredSeller: {
    marginTop:10,
    marginBottom:10,
    justifyContent:'center',
    flex:1,
    flexDirection:'row'
  },
  heading: {
    fontSize:21,
    textTransform:'uppercase',
  },
  normalHeading: {
    paddingRight:5
  },
  boldHeading: {
    paddingLeft:5,
    fontWeight:'bold',
    justifyContent: 'space-between',
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    height: 250,
    marginBottom:5
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  categorygridView:{
    margin:0,
    flex:1
  },
  categoryItemContainer:{
    justifyContent: 'flex-end',
    height: 50,
    width:150,
    borderRadius:15,
    borderWidth:0,
    marginLeft:25,
    borderColor:'#fff',
    backgroundColor:'#ff7000',
    overflow:'hidden',

  },
  shadowCard: {
    
  },
  productImage: {
    height:200,
  },
  categoryImage:{
    height:200,
  },
  

});





