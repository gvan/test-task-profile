import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/signin/SignInScreen";
import SignUpScreen from "../screens/signup/SignUpScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default AuthStack;