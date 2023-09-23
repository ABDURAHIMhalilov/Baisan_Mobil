module.exports = function(api) {
  api.cache(true);// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  // import Home from "./Pages/Home";
  // import Profile from "./Pages/Profile";
  // import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
  // import { EventRegister } from 'react-native-event-listeners'
  // import React, { useState, useEffect } from "react";
  // import theme from "./theme/theme";
  // import themeContext from "./theme/themeContext";
  // import { Switch } from "react-native";
  
  
  // const Tab = createBottomTabNavigator();
  
  // export default function App() {
  //   const [ darkMode, setDarkMode ] = useState(false)
  
  //   useEffect(() => {
  //     const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
  //       setDarkMode(data)
  //     })
  //     return() => {
  //       EventRegister.removeAllListeners(listener)
  //     }
  //   }, [darkMode])
  
  //   return (
  //     <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
  //     <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}>
  //       <Tab.Navigator>
  //         <Tab.Screen name="Home" options={{
  //           headerRight: () => {
  //             return(
  //               <Switch value={darkMode} onValueChange={(value) => {
  //                 setDarkMode(value)
  //                 EventRegister.emit('ChangeTheme', value)
  //               }} />
  //             )
  //           }
  //         }} component={Home} />
  //         <Tab.Screen name="Profile" component={Profile} />
  //       </Tab.Navigator>
  //     </NavigationContainer>
  //     </themeContext.Provider>
  //   );
  // }
  
  
  
  
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin']
  };
};
