import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


import AuthScreen from '../screens/AuthScreen'
import MapScreen from '../screens/MapScreen'
import DeckScreen from '../screens/DeckScreen'
import ReviewScreen from '../screens/ReviewScreen'
import SettingsScreen from '../screens/SettingScreen'
import WelcomeScreen from '../screens/WelcomeScreen'

const Tab = createBottomTabNavigator();

const MainTab = createBottomTabNavigator()

const Review = createStackNavigator()

function ReviewFlow() {
  return(
    <Review.Navigator>
      <Review.Screen name='Review' component={ReviewScreen} options={ReviewScreen.navigationOptions}/>
      <Review.Screen name='Settings' component={SettingsScreen}/>
    </Review.Navigator>
  )
}

function MainFlow() {
  return(
    <MainTab.Navigator>
      <MainTab.Screen name='Map' component={MapScreen}
      options={{
        tabBarLabel: 'Map',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="google-maps" color={color} size={size} />
        ),
      }}/>
      <MainTab.Screen name='Deck' component={DeckScreen}
      options={{
        tabBarLabel: 'Jobs',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="file" color={color} size={size} />
        ),
      }}/>
      <MainTab.Screen name='Review' component={ReviewFlow}
      options={{
        tabBarLabel: 'Review Jobs',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="heart" color={color} size={size} />
        ),
      }}/>
    </MainTab.Navigator> 
  )
}


export default function JobNavigation() {

  return (
      <NavigationContainer>

          <Tab.Navigator tabBar={()=> null }>
            <Tab.Screen name="Welcome" component={WelcomeScreen} />
            <Tab.Screen name="Auth" component={AuthScreen} />
            <Tab.Screen name='MainFlow' component={MainFlow} />
          </Tab.Navigator>

      </NavigationContainer>   
  );
}