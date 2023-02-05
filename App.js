import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useCallback, useEffect } from 'react';
import { createUserTables, getUserDBConnection } from './src/persistence/sqlite';

const Stack = createNativeStackNavigator();

const App = () => {

  const initializeDB = useCallback(async () => {
    const db = await getUserDBConnection();
    await createUserTables(db);
  }, []);
  
  useEffect(() => {
    initializeDB();
  }, [initializeDB]);

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