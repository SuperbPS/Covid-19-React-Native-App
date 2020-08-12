import React from 'react';
import { StyleSheet, FlatList, Text, View, Dimensions, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, AsyncStorage, StatusBar, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation, NavigationActions } from 'react-navigation';
import { Col, Row, Grid } from "react-native-easy-grid";
import SvgUri from 'react-native-svg-uri';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomNavigation from '../screens/BottomNavigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
const axios = require('axios');
import Carousel from 'react-native-carousel-view';
import PieChart1 from 'react-native-pie-chart';



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

class IssuesList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false,
      data: [
        {
          name: "Cases",
          population: 0,
          color: "rgba(131, 167, 234, 1)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Recovered",
          population: 0,
          color: "#F00",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Deaths",
          population: 0,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
      ],
      Bardata: {
        labels: ["Cases", "Recovered", "Deaths"],
        datasets: [
          {
            data: ''
          }
        ]
      },
      Progressdata: {
        labels: ["Cases", "Recovered", "Deaths"], // optional
        data: ''
      },
      Linedata: {
        labels: ["Cases", "Recovered", "Deaths"],
        datasets: [
          {
            data: '',
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
      },
      Biezerdata: {
        labels: ["Cases", "Recovered", "Deaths"],
        datasets: [
          {
            data: '',
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
      },
      Stackdata: {
        labels: ["Test1"],
        legend: ["L1", "L2", "L3"],
        data: '',
        barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
      },
      doughnutData: [],
      series: [],
      total: ''
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
        console.log('global response ', response.data);
        var total = response.data.cases + response.data.deaths + response.data.recovered;
        var case1 = (response.data.cases / total).toPrecision(1);
        var death = (response.data.deaths / total).toPrecision(1);
        var recover = (response.data.recovered / total).toPrecision(1);
        console.log('lalallallaa', case1, death, recover);

        tmp = []
        tmp.push(case1 * 100);
        tmp.push(death * 100);
        tmp.push(recover * 100);
        console.log(tmp, 'i am tmp array')

        this.setState({
          data: [
            {
              name: "Cases",
              population: parseInt(response.data.cases),
              color: "#CFD8DC",
              legendFontColor: "#CFD8DC",
              legendFontSize: 12
            },
            {
              name: "Recovered",
              population: parseInt(response.data.recovered),
              color: "#FAFAFA",
              legendFontColor: "#FAFAFA",
              legendFontSize: 12
            },
            {
              name: "Deaths",
              population: parseInt(response.data.deaths),
              color: "#BDBDBD",
              legendFontColor: "#BDBDBD",
              legendFontSize: 12
            },
          ],
          Bardata: {
            labels: ["Cases", "Recovered", "Deaths"],
            datasets: [
              {
                data: [case1 * 100, recover * 100, death * 100]
              }
            ]
          },
          Progressdata: {
            labels: ["Cases", "Cured", "Deaths"], // optional
            data: [response.data.cases / total, response.data.recovered / total, response.data.deaths / total]
          },
          Linedata: {
            labels: ["Cases", "Recovered", "Deaths"],
            datasets: [
              {
                data: [case1 * 100, recover * 100, death * 100],
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
                strokeWidth: 2 // optional
              }
            ],
          },
          Biezerdata: {
            labels: ["Cases", "Recovered", "Deaths"],
            datasets: [
              {
                data: [case1 * 100, recover * 100, death * 100],
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
                strokeWidth: 2 // optional
              }
            ],
          },
          Stackdata: {
            labels: ["World Percentage (%)"],
            legend: ["%Cases", "%Recovered", "% Deaths"],
            data: [[case1 * 100, recover * 100, death * 100],],
            barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
          },
          doughnutData: tmp,
          series: [case1 * 100, recover * 100, death * 100],
          total: total,
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
            <Text style={styles.globeHead}>COVID-19 World Graphical</Text>
          </View>

          <View style={styles.scrollViewContainer}>
            <ScrollView>
              <View style={styles.card}>
                <Carousel
                  width={wp('96.5%')}
                  height={hp('45%')}
                  delay={60000}
                  indicatorAtBottom={true}
                  indicatorSize={20}
                  //  indicatorText="$"
                  indicatorColor="black"
                >
                  <View>
                    <Text style={styles.graphHead}>World Bar Graph</Text>
                    <BarChart
                      data={this.state.Bardata}
                      width={wp('95%')}
                      height={hp('38%')}
                      yAxisLabel="%"
                      chartConfig={chartConfig}
                      withHorizontalLabels={true}
                    />
                  </View>
                  <View>
                    <Text style={styles.graphHead}>World Progress Graph</Text>
                    <ProgressChart
                      style={{ marginTop: hp('-2%') }}
                      data={this.state.Progressdata}
                      width={wp('95%')}
                      height={hp('38%')}
                      strokeWidth={16}
                      radius={32}
                      chartConfig={chartConfig}
                      hideLegend={false}
                    />
                  </View>

                  <View>
                    <Text style={styles.graphHead}>World Line Graph</Text>
                    <LineChart
                      data={this.state.Linedata}
                      width={wp('95%')}
                      height={hp('38%')}
                      yAxisLabel='%'
                      chartConfig={chartConfig}
                    />
                  </View>
                  <View style={{ backgroundColor: '#263238', borderRadius: wp('2.7%') }}>
                    <Text style={styles.piechartStyles}>World Pie Graph</Text>
                    <PieChart
                      style={{ marginTop: hp('-2.5%') }}
                      data={this.state.data}
                      width={wp('100%')}
                      height={hp('39%')}
                      chartConfig={chartConfig}
                      accessor="population"
                      backgroundColor="transparent"
                      paddingLeft="25"
                    />
                  </View>

                  <View>
                    <Text style={styles.graphHead}>World Biezer Graph</Text>
                    <LineChart
                      data={this.state.Biezerdata}
                      width={wp('95%')}
                      height={hp('38%')}
                      yAxisLabel='%'
                      chartConfig={chartConfig}
                      bezier
                    />
                  </View>

                  <View style={{ backgroundColor: '#263238', borderRadius: wp('2.7%') }}>
                    <Text style={styles.piechartStyles}>World Doughnut Graph</Text>
                    <Grid>
                      <Col size={70} style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <PieChart1 style={{ marginTop: hp('-2.5%') }}
                          chart_wh={wp('60%')}
                          series={this.state.series}
                          sliceColor={sliceColor}
                          doughnut={true}
                          coverRadius={0.45}
                          coverFill={'#263238'}
                        />
                      </Col>
                      <Col size={30}>
                        <Text style={styles.doughnutlegend1}><FontAwesome name="circle" size={16} color='#CFD8DC' /> Cases%: {this.state.doughnutData[0]}</Text>
                        <Text style={styles.doughnutlegend2}><FontAwesome name="circle" size={16} color='#FAFAFA' /> Cured%: {this.state.doughnutData[2]}</Text>
                        <Text style={styles.doughnutlegend3}><FontAwesome name="circle" size={16} color='#BDBDBD' /> Deaths%: {this.state.doughnutData[1]}</Text>
                      </Col>
                    </Grid>
                  </View>
                  <View>
                    <Text style={styles.graphHead}>World Stacked Bar Graph</Text>
                    <StackedBarChart
                      data={this.state.Stackdata}
                      width={wp('95%')}
                      height={hp('38%')}
                      chartConfig={chartConfig}
                    />
                  </View>
                </Carousel>

              </View>

              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: hp('-4.5%') }}>
                <View style={{ width: wp('46%'), height: hp('14%'), backgroundColor: '#fff', marginRight: wp('0.5%') }}>
                  <Text style={styles.mainData}>Total</Text>
                  <Text style={styles.mainData}>{this.state.total}</Text>
                </View>
                <View style={{ width: wp('46%'), height: hp('20%'), backgroundColor: '#fff', marginLeft: wp('0.5%'), marginTop: hp('6%') }}>
                  <Text style={styles.mainData}>Cases</Text>
                  <Text style={styles.mainData}>{this.state.doughnutData[0]}%</Text>
                </View>
              </View>

              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: hp('-2.9%') }}>
                <View style={{ width: wp('46%'), height: hp('20%'), backgroundColor: '#fff', marginRight: wp('0.5%'), marginTop: hp('-2.5%') }}>
                  <Text style={styles.mainData}>Recovered</Text>
                  <Text style={styles.mainData}>{this.state.doughnutData[1]}%</Text>
                </View>
                <View style={{ width: wp('46%'), height: hp('13.5%'), backgroundColor: '#fff', marginLeft: wp('0.5%'), marginTop: hp('3%') }}>
                  <Text style={styles.mainData}>Deaths</Text>
                  <Text style={styles.mainData}>{this.state.doughnutData[2]}%</Text>
                </View>
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
        <View style={{ opacity: 1, backgroundColor: '#0047CC', width: wp('102%'), height: hp('100%'), alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/loader.gif')} style={{ width: 50, height: 50 }} />
        </View>
      )

    }

  }
}
export default withNavigation(IssuesList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7986CB',
    // F2F2F2
  },

  navigationTop: {
    flex: 0.06,
    elevation: 1,
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
    fontSize: wp('4%'),
    textAlign: 'center',
    fontFamily: 'Gotham-Medium',
    justifyContent: "center",
    color: '#ffffff',
    marginTop: hp('1%'),
  },

  card: {
    width: wp('96.5%'),
    height: hp('45%'),
    backgroundColor: '#FFFFFF',
    borderRadius: wp('2.7%'),
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },

  graphHead: {
    marginTop: hp('1.5%'),
    marginLeft: wp('2.5%'),
    fontFamily: 'Gotham-Medium',
    fontSize: wp('3.5%'),
    marginBottom: hp('2%'),
    color: '#263238'
  },

  mainData: {
    textAlign: 'left',
    marginLeft: wp('3.2%'),
    marginTop: hp('2.2%'),
    fontSize: wp('4%'),
    fontFamily: 'Gotham-Bold',
    color: '#1A237E'
  },

  piechartStyles: {
    marginTop: hp('1.5%'),
    marginLeft: wp('2.5%'),
    fontFamily: 'Gotham-Medium',
    fontSize: wp('3.5%'),
    marginBottom: hp('2%'),
    color: '#fff'
  },

  doughnutlegend1: {
    textAlign: 'left',
    marginTop: hp('5%'),
    color: '#FFFFFF',
    fontFamily: 'Gotham-Medium',
    fontSize: wp('3.4%')
  },
  doughnutlegend2: {
    textAlign: 'left',
    marginTop: hp('7%'),
    color: '#FFFFFF',
    fontFamily: 'Gotham-Medium',
    fontSize: wp('3.4%')

  },

  doughnutlegend3: {
    textAlign: 'left',
    marginTop: hp('7%'),
    color: '#FFFFFF',
    fontFamily: 'Gotham-Medium',
    fontSize: wp('3.4%')
  },

});

