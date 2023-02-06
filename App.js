import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useCallback, useEffect } from 'react';
import { createUserTables, getUserDBConnection } from './src/persistence/sqlite';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

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

export default App;