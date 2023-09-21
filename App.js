import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import LoginPage from './LoginPage'
import { NavigationContainer } from '@react-navigation/native';
import StudentPanel from './StudentPanel/Navigation/index'
import TeacherPanel from './TeacherPage/Navigation/index'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name='LoginPage' component={LoginPage} />
        <Stack.Screen options={{ headerShown: false }} name='StudentPage' component={StudentPanel} />
        <Stack.Screen options={{ headerShown: false }} name='TeacherPanel' component={TeacherPanel} />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
