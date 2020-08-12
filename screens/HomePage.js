import React from 'react';
import { Button, StyleSheet, FlatList, Text, View, Dimensions, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, AsyncStorage, StatusBar, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation, NavigationActions } from 'react-navigation';
import { Col, Row, Grid } from "react-native-easy-grid";
import BottomNavigation from '../screens/BottomNavigation';
import { FontAwesome, AntDesign, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
const axios = require('axios');
import PieChart1 from 'react-native-pie-chart';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';


import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


const chartConfig = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientTo: "#FFFFFF",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.8,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726"
  },
  useShadowColorFromDataset: false // optional
};

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      r: 0,
      c: 0,
      d: 0,
      series: [],
      doughnutData: [],
      scaleAnimationDialog1: false,
      scaleAnimationDialog2: false,
      scaleAnimationDialog3: false,
      scaleAnimationDialog4: false,
      Bardata: {
        labels: ["Asia", "N.A", "S.A", "Eur", "Afr", "Aus"],
        datasets: [
          {
            data: ''
          }
        ]
      },
      Piedata: [
        {
          name: "Asia",
          population: 0,
          color: "rgba(131, 167, 234, 1)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "North America",
          population: 0,
          color: "#F00",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "South America",
          population: 0,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Europe",
          population: 0,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Africa",
          population: 0,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Australia",
          population: 0,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
      ],
      Progressdata: {
        labels: ["Asia", "N.America", "S.America", "Europe", "Africa", "Australia"], // optional
        data: ''
      },
      Stackdata: {
        labels: ["Asia", "N.A", "S.A", "Eur", "Afr", "Aus"],
        legend: ["%Cases", "%Deaths", "%Recovered"],
        data: '',
        barColors: ["#dfe4ea", "#ced6e0", "#a4b0be", "#000", "#ccc", "#eee"]
      },
      totalAll: '',
    };
  }
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Gotham-Book': require('../assets/fonts/GothamRoundedBook_21018.ttf'),
      'Gotham-Bold': require('../assets/fonts/GothamBold.ttf'),
      'Gotham-Medium': require('../assets/fonts/GothamMedium.ttf'),
      'octicons': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Octicons.ttf'),
      'FontAwesome': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf'),
      'ionicons': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
      'material': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
      'anticon': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/AntDesign.ttf'),
    });
    // this.setState({ fontLoaded: true });
    axios.get('https://coronavirus-19-api.herokuapp.com/all')
      .then(response => {
        console.log('api on top response ', response.data);
        let c = response.data.cases;
        let r = response.data.recovered;
        let d = response.data.deaths;
        var total = response.data.cases + response.data.deaths + response.data.recovered;
        var case1 = (response.data.cases / total).toPrecision(1);
        var death = (response.data.deaths / total).toPrecision(1);
        var recover = (response.data.recovered / total).toPrecision(1);
        console.log('lalallallaa', case1, death, recover);
        console.log('recover, cases, deaths around world are ', r, c, d);
        tmp = []
        tmp.push(case1 * 100);
        tmp.push(death * 100);
        tmp.push(recover * 100);
        console.log(tmp, 'i am tmp array')

        this.setState({
          doughnutData: tmp,
          series: [case1 * 100, recover * 100, death * 100],
          r: r,
          c: c,
          d: d,
          fontLoaded: true
        })
      });

    axios.get('https://corona.lmao.ninja/v2/continents?yesterday=true&sort')
      .then(response => {
        console.log('continents response ', response.data[0].cases);
        // let tmpArray = []
        var totalcases = totaldeaths = totalrecover = 0
        for (var i = 0; i < response.data.length; i++) {
          // tmpArray.push(response.data[i].cases)
          totalcases = totalcases + response.data[i].cases
          totalrecover = totalrecover + response.data[i].recovered
          totaldeaths = totaldeaths + response.data[i].deaths
        }
        var total = totalcases + totaldeaths + totalrecover;

        var asiaCase = (response.data[0].cases) / totalcases;
        var northCase = (response.data[1].cases) / totalcases;
        var southCase = (response.data[2].cases) / totalcases;
        var europeCase = (response.data[3].cases) / totalcases;
        var africaCase = (response.data[4].cases) / totalcases;
        var australiaCase = (response.data[5].cases) / totalcases;

        var case0 = (response.data[0].cases / totalcases).toPrecision(1);
        var case1 = (response.data[1].cases / totalcases).toPrecision(1);
        var case2 = (response.data[2].cases / totalcases).toPrecision(1);
        var case3 = (response.data[3].cases / totalcases).toPrecision(1);
        var case4 = (response.data[4].cases / totalcases).toPrecision(1);
        var case5 = (response.data[5].cases / totalcases).toPrecision(1);

        var death0 = (response.data[0].deaths / totaldeaths).toPrecision(1);
        var death1 = (response.data[1].deaths / totaldeaths).toPrecision(1);
        var death2 = (response.data[2].deaths / totaldeaths).toPrecision(1);
        var death3 = (response.data[3].deaths / totaldeaths).toPrecision(1);
        var death4 = (response.data[4].deaths / totaldeaths).toPrecision(1);
        var death5 = (response.data[5].deaths / totaldeaths).toPrecision(1);

        var recover0 = (response.data[0].recovered / totalrecover).toPrecision(1);
        var recover1 = (response.data[1].recovered / totalrecover).toPrecision(1);
        var recover2 = (response.data[2].recovered / totalrecover).toPrecision(1);
        var recover3 = (response.data[3].recovered / totalrecover).toPrecision(1);
        var recover4 = (response.data[4].recovered / totalrecover).toPrecision(1);
        var recover5 = (response.data[5].recovered / totalrecover).toPrecision(1);

        console.log('continents data ', asiaCase, northCase, southCase, europeCase, africaCase, australiaCase);

        this.setState({
          Bardata: {
            labels: ["Asia", "N.A", "S.A", "Eur", "Afr", "Aus"],
            datasets: [
              {
                data: [asiaCase * 100, northCase * 100, southCase * 100, europeCase * 100, africaCase * 100, australiaCase * 100]
              }
            ]
          },
          Piedata: [
            {
              name: "Asia",
              population: parseInt(response.data[0].recovered),
              color: "#E0E0E0",
              legendFontColor: "#E0E0E0",
              legendFontSize: 12
            },
            {
              name: "N. America",
              population: parseInt(response.data[1].recovered),
              color: "#BDBDBD",
              legendFontColor: "#BDBDBD",
              legendFontSize: 12
            },
            {
              name: "S. America",
              population: parseInt(response.data[2].recovered),
              color: "#9E9E9E",
              legendFontColor: "#9E9E9E",
              legendFontSize: 12
            },
            {
              name: "Europe",
              population: parseInt(response.data[3].recovered),
              color: "#616161",
              legendFontColor: "#616161",
              legendFontSize: 12
            },
            {
              name: "Africa",
              population: parseInt(response.data[4].recovered),
              color: "#757575",
              legendFontColor: "#757575",
              legendFontSize: 12
            },
            {
              name: "Australia",
              population: parseInt(response.data[5].recovered),
              color: "#616161",
              legendFontColor: "#616161",
              legendFontSize: 12
            },
          ],
          Progressdata: {
            labels: ["Asia", "N.Am", "S.Am", "Eurp", "Afrc", "Aust"], // optional
            data: [response.data[0].deaths / totaldeaths, response.data[1].deaths / totaldeaths, response.data[2].deaths / totaldeaths, response.data[3].deaths / totaldeaths, response.data[4].deaths / totaldeaths, response.data[5].deaths / totaldeaths],
          },
          Stackdata: {
            labels: ["Asia", "N.A", "S.A", "Eur", "Afr", "Aus"],
            legend: ["%Cases", "%Deaths", "%Recovered"],
            data: [[case0 * 100, death0 * 100, recover0 * 100], [case1 * 100, death1 * 100, recover1 * 100], [case2 * 100, death2 * 100, recover2 * 100], [case3 * 100, death3 * 100, recover3 * 100], [case4 * 100, death4 * 100, recover4 * 100], [case5 * 100, death5 * 100, recover5 * 100]],
            barColors: ["#dfe4ea", "#ced6e0", "#a4b0be", "#000", "#ccc", "#eee"]
          },
          totalAll: total,
          fontLoaded: true
        })
      });
  }

  render() {

    const sliceColor = ['#CFD8DC', '#FAFAFA', '#BDBDBD']

    if (this.state.fontLoaded) {
      return (
        <View style={styles.container}>

          <StatusBar barStyle='light-content' />

          <View style={styles.navigationTop}>
            <Text style={styles.globeHead}>COVID-19 World Statistics</Text>
          </View>

          <View style={styles.scrollViewContainer}>
            <ScrollView>
              {/* Cases pop up graph starts */}
              <Dialog onTouchOutside={() => { this.setState({ scaleAnimationDialog1: false }); }}
                width={0.9}
                visible={this.state.scaleAnimationDialog1}
                dialogAnimation={new ScaleAnimation()}
                onHardwareBackPress={() => {
                  console.log('onHardwareBackPress');
                  this.setState({ scaleAnimationDialog1: false });
                  return true;
                }}
                dialogTitle={
                  <DialogTitle
                    title="World Cases - Graphical"
                    hasTitleBar={true}
                  />
                }
                actions={[
                  <DialogButton text="DISMISS" onPress={() => { this.setState({ scaleAnimationDialog1: false }); }} />,
                ]}>
                <DialogContent>
                  <View style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', }}>
                    <BarChart
                      style={{ borderRadius: wp('2.7%'), }}
                      data={this.state.Bardata}
                      width={wp('90%')}
                      height={hp('38%')}
                      yAxisLabel="%"
                      chartConfig={chartConfig}
                      withHorizontalLabels={true}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={() => { this.setState({ scaleAnimationDialog1: false }); }}><Text style={styles.closeText}>Close</Text></TouchableOpacity>
                  </View>
                </DialogContent>
              </Dialog>
              {/* Cases pop up graph ends */}

              {/* Recovery pop up graph starts */}
              <Dialog onTouchOutside={() => { this.setState({ scaleAnimationDialog2: false }); }}
                width={0.9}
                visible={this.state.scaleAnimationDialog2}
                dialogAnimation={new ScaleAnimation()}
                onHardwareBackPress={() => {
                  console.log('onHardwareBackPress');
                  this.setState({ scaleAnimationDialog2: false });
                  return true;
                }}
                dialogTitle={
                  <DialogTitle
                    title="World Recovery - Graphical"
                    hasTitleBar={true}
                  />
                }
                actions={[
                  <DialogButton text="DISMISS" onPress={() => { this.setState({ scaleAnimationDialog2: false }); }} />,
                ]}>
                <DialogContent>
                  <View style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', }}>
                    <PieChart
                      data={this.state.Piedata}
                      width={wp('90%')}
                      height={hp('38%')}
                      chartConfig={chartConfig}
                      accessor="population"
                      backgroundColor="transparent"
                      paddingLeft="25"
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={() => { this.setState({ scaleAnimationDialog2: false }); }}><Text style={styles.closeText}>Close</Text></TouchableOpacity>
                  </View>
                </DialogContent>
              </Dialog>
              {/*  Recovery pop up graph ends */}

              {/* Deaths pop up starts */}
              <Dialog onTouchOutside={() => { this.setState({ scaleAnimationDialog3: false }); }}
                width={0.9}
                visible={this.state.scaleAnimationDialog3}
                dialogAnimation={new ScaleAnimation()}
                onHardwareBackPress={() => {
                  console.log('onHardwareBackPress');
                  this.setState({ scaleAnimationDialog3: false });
                  return true;
                }}
                dialogTitle={
                  <DialogTitle
                    title="World Deaths - Graphical"
                    hasTitleBar={true}
                  />
                }
                actions={[
                  <DialogButton text="DISMISS" onPress={() => { this.setState({ scaleAnimationDialog3: false }); }} />,
                ]}>
                <DialogContent>
                  <View style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', }}>
                    <ProgressChart
                      style={{ borderRadius: wp('2.7%') }}
                      data={this.state.Progressdata}
                      width={wp('90%')}
                      height={hp('38%')}
                      strokeWidth={8}
                      radius={26}
                      chartConfig={chartConfig}
                      hideLegend={false}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={() => { this.setState({ scaleAnimationDialog3: false }); }}><Text style={styles.closeText}>Close</Text></TouchableOpacity>
                  </View>
                </DialogContent>
              </Dialog>
              {/* Deaths pop up ends */}

              {/* Total pop up  graph starts */}
              <Dialog onTouchOutside={() => { this.setState({ scaleAnimationDialog4: false }); }}
                width={0.9}
                visible={this.state.scaleAnimationDialog4}
                dialogAnimation={new ScaleAnimation()}
                onHardwareBackPress={() => {
                  console.log('onHardwareBackPress');
                  this.setState({ scaleAnimationDialog4: false });
                  return true;
                }}
                dialogTitle={
                  <DialogTitle
                    title="World Total - Graphical"
                    hasTitleBar={true}
                  />
                }
                actions={[
                  <DialogButton text="DISMISS" onPress={() => { this.setState({ scaleAnimationDialog4: false }); }} />,
                ]}>
                <DialogContent>
                  <View style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingLeft: wp('5%'), paddingRight: wp('5%') }}>
                    <StackedBarChart
                      data={this.state.Stackdata}
                      width={wp('90%')}
                      height={hp('38%')}
                      chartConfig={chartConfig}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={() => { this.setState({ scaleAnimationDialog4: false }); }}><Text style={styles.closeText}>Close</Text></TouchableOpacity>
                  </View>
                </DialogContent>
              </Dialog>

              {/* total pop up graph ends */}
              <View style={styles.card}>
                <Grid>
                  <Col size={70} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <PieChart1
                      chart_wh={wp('64%')}
                      series={this.state.series}
                      sliceColor={sliceColor}
                      doughnut={true}
                      coverRadius={0.45}
                      coverFill={'#7986CB'}
                    />
                  </Col>
                  <Col size={30}>
                    <Text style={styles.doughnutlegend1}><FontAwesome name="circle" size={16} color='#CFD8DC' /> Cases%: {this.state.doughnutData[0]}</Text>
                    <Text style={styles.doughnutlegend2}><FontAwesome name="circle" size={16} color='#FAFAFA' /> Cured%: {this.state.doughnutData[2]}</Text>
                    <Text style={styles.doughnutlegend3}><FontAwesome name="circle" size={16} color='#BDBDBD' /> Deaths%: {this.state.doughnutData[1]}</Text>
                  </Col>
                </Grid>
              </View>

              <View style={styles.layout} >
                <TouchableOpacity onPress={() => { this.setState({ scaleAnimationDialog1: true, }); }} >
                  <View style={styles.casesCard}>
                    <Text style={styles.mainData}>Cases   <Octicons name="graph" size={26} color='#fff' /></Text>
                    <Text style={styles.mainData}>{this.state.c}</Text>
                    <AntDesign name="arrowright" size={30} color='#FAFAFA' style={{marginTop:hp('0.5%'), marginLeft:wp('32%')}} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ scaleAnimationDialog2: true, }); }} >
                  <View style={styles.cureCard}>
                    <Text style={styles.mainData}>Recovered   <FontAwesome name="pie-chart" size={26} color='#fff' /></Text>
                    <Text style={styles.mainData}>{this.state.r}</Text>
                    <AntDesign name="arrowright" size={30} color='#FAFAFA' style={{marginTop:hp('0.5%'), marginLeft:wp('32%')}} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.layout} >
                <TouchableOpacity onPress={() => { this.setState({ scaleAnimationDialog3: true, }); }} >
                  <View style={styles.casesCard}>
                    <Text style={styles.mainData}>Deaths   <MaterialCommunityIcons name="chart-donut-variant" size={26} color='#fff' /></Text>
                    <Text style={styles.mainData}>{this.state.d}</Text>
                    <AntDesign name="arrowright" size={30} color='#FAFAFA' style={{marginTop:hp('0.5%'), marginLeft:wp('32%')}} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ scaleAnimationDialog4: true, }); }} >
                  <View style={styles.cureCard}>
                    <Text style={styles.mainData}>Total   <MaterialCommunityIcons name="chart-bar-stacked" size={26} color='#fff' /></Text>
                    <Text style={styles.mainData}>{this.state.totalAll}</Text>
                    <AntDesign name="arrowright" size={30} color='#FAFAFA' style={{marginTop:hp('0.5%'), marginLeft:wp('32%')}} />
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>

          <View style={styles.footerContainer}>
            <BottomNavigation />
          </View>

        </View>
      );
    }
    else {
      return (
        <View style={{ opacity: 1, backgroundColor: '#0047CC', width: wp('100%'), height: hp('100%'), alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/loader.gif')} style={{ width: 50, height: 50 }} />
        </View>
      )

    }

  }
}
export default withNavigation(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  navigationTop: {
    flex: 0.06,
    backgroundColor: '#F5F5F5',
  },

  scrollViewContainer: {
    flex: 0.86,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },

  footerContainer: {
    flex: 0.08,
  },

  globeHead: {
    fontSize: wp('5.5%'),
    textAlign: 'center',
    fontFamily: 'Gotham-Medium',
    justifyContent: "center",
    color: '#1A237E',
    marginTop:hp('2%')
  },

  card: {
    width: wp('98%'),
    height: hp('42%'),
    backgroundColor: '#7986CB',
    borderRadius: wp('2.7%'),
    elevation: 2,
    alignItems: 'center',
    marginTop: hp('0.6%'),
    justifyContent: 'center'
  },

  layout: {
    marginTop: hp('1%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainData: {
    textAlign: 'left',
    marginLeft: wp('3.2%'),
    marginTop: hp('2.2%'),
    fontSize: wp('4%'),
    fontFamily: 'Gotham-Bold',
    color: '#FFFFFF'
  },

  casesCard: {
    width: wp('48%'),
    height: hp('18.4%'),
    backgroundColor: '#7986CB',
    elevation: 4,
    marginRight: wp('0.5%')
  },

  cureCard: {
    width: wp('48%'),
    height: hp('18.4%'),
    backgroundColor: '#7986CB',
    elevation: 4,
    marginLeft: wp('0.5%')
  },

  doughnutlegend1: {
    textAlign: 'left',
    marginTop: hp('8%'),
    color: '#FFFFFF',
    fontFamily: 'Gotham-Medium',
    fontSize: wp('3.4%')
  },

  doughnutlegend2: {
    textAlign: 'left',
    marginTop: hp('9%'),
    color: '#FFFFFF',
    fontFamily: 'Gotham-Medium',
    fontSize: wp('3.4%')

  },

  doughnutlegend3: {
    textAlign: 'left',
    marginTop: hp('9%'),
    color: '#FFFFFF',
    fontFamily: 'Gotham-Medium',
    fontSize: wp('3.4%')
  },

  closeButton: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('30%'),
    height: hp('5%'),
    backgroundColor: 'blue',
    borderRadius: wp('2%'),
    marginTop: hp('4%')
  },

  closeText: {
    fontFamily: 'Gotham-Bold',
    fontSize: wp('3.5%'),
    textAlign: 'center',
    color: '#fff',
  },

});
