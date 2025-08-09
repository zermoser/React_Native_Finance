import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import ExploreScreen from '../screens/ExploreScreen';
import GoalsScreen from '../screens/GoalsScreen';
import HomeScreen from '../screens/HomeScreen';
import ReportsScreen from '../screens/ReportsScreen';
import { colors } from '../utils/helpers';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          } else if (route.name === 'Goals') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else {
            iconName = focused ? 'pie-chart' : 'pie-chart-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          paddingVertical: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'หน้าหลัก' }} />
      <Tab.Screen name="Explore" component={ExploreScreen} options={{ title: 'วิเคราะห์' }} />
      <Tab.Screen name="Goals" component={GoalsScreen} options={{ title: 'เป้าหมาย' }} />
      <Tab.Screen name="Reports" component={ReportsScreen} options={{ title: 'รายงาน' }} />
    </Tab.Navigator>
  );
};

export default AppNavigator;