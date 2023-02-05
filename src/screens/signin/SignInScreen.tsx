import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { EyeClose, EyeOpen, Logo } from "../../assets/icons"
import globalStyles from "../../assets/styles/globalStyles"
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import BrandingHeader from "../../components/screens/BrandingHeader";
import RoundedButton from "../../components/buttons/RoundedButton";
import LineInput from "../../components/inputs/LineInput";
import LineInputPassword from "../../components/inputs/LineInputPassword";
import TextWithButton from "../../components/buttons/TextWithButton";
import userApi from "../../services/api/UserApi";
import { UserSignUp } from "../../types";

const { colors } = globalStyles;

const SignInScreen = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('ivan@gmail.com');
    const [password, setPassword] = useState('password');

    const onLoginPress = async () => {
        const res = await userApi.loginUser(email, password);
        console.log(`res ${JSON.stringify(res)}`)
        if(res.data) {
            navigation.reset({
                index: 0,
                routes: [{name: 'Profile'}],
            });
        } else {

        }
    }

    const onCreateAccountPress = async () => {
        navigation.navigate('SignUp');
    }

    return <SafeAreaView style={st.container}>
        <ScrollView>
            <View>
                <BrandingHeader
                    title='Log In To Woorkroom' />
                <View style={st.formContainer}>
                    <LineInput
                        label='Your email'
                        placeholder="name@example.com"
                        value={email}
                        setValue={setEmail} />
                    <LineInputPassword
                        label='Password'
                        placeholder="••••••"
                        value={password}
                        setValue={setPassword}/>
                    <TouchableOpacity style={st.textButton} >
                        <Text style={st.secondaryLabel}>{'Forgot password?'}</Text>
                    </TouchableOpacity>
                    <RoundedButton
                        text="Log In"
                        onPress={onLoginPress} />
                    <TextWithButton
                        text='New User?'
                        buttonText='Create Account'
                        onPress={onCreateAccountPress}/>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
}

const st = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    formContainer: {
        marginTop: 10,
        marginStart: 32,
        marginEnd: 32,
        marginBottom: 70,
    },
    textButton: {
        marginTop: 20,
        alignSelf: 'flex-end'
    },
    secondaryLabel: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.secondaryText,
    },
    inputIcon: {
        position: 'absolute',
        right: 0,
    }

})

export default SignInScreen;