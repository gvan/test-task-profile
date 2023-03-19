import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useCallback, useEffect } from 'react';
import { createUserTables, getUserDBConnection } from './src/persistence/sqlite';
import { useFonts } from 'expo-font';
import { StyleSheet, View } from 'react-native';
import globalStyles from './src/assets/styles/globalStyles';

const Stack = createNativeStackNavigator();
const {colors} = globalStyles;

const App = () => {

  const initializeDB = useCallback(async () => {
    const db = await getUserDBConnection();
    await createUserTables(db);
  }, []);
  
  useEffect(() => {
    initializeDB();
  }, [initializeDB]);

  const [fontsLoaded] = useFonts({
    'Poppins-Medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
  });  
  
  if (!fontsLoaded) {
    return <View style={st.splash}></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainStack"
          component={AuthStack}
          options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const st = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: colors.background,
  }
})

export default App;