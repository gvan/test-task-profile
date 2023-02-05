import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { EyeClose, EyeOpen, Logo } from "../../assets/icons"
import globalStyles from "../../assets/styles/globalStyles"
import { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import BrandingHeader from "../../components/screens/BrandingHeader";
import RoundedButton from "../../components/buttons/RoundedButton";
import LineInput from "../../components/inputs/LineInput";
import LineInputPassword from "../../components/inputs/LineInputPassword";
import TextWithButton from "../../components/buttons/TextWithButton";
import userApi from "../../services/api/UserApi";
import { UserSignUp } from "../../types";
import { validateEmail, validatePassword } from "../../utils";

const { colors } = globalStyles;

const SignInScreen = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('ivan1@gmail.com');
    const [password, setPassword] = useState('password');
    
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const passwordRef = useRef();

    const onLoginPress = async () => {
        if(validateLoginForm()) {
            const res = await userApi.loginUser(email, password);
            console.log(`res ${JSON.stringify(res)}`)
            if(res.data) {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Profile'}],
                });
            } else {
                setEmailError(res.error);
            }
        }
    }

    const onCreateAccountPress = async () => {
        navigation.navigate('SignUp');
    }

    const onEmailSubmit = () => {
        passwordRef.current.focus();
    }

    const validateLoginForm = (): boolean => {
        setEmailError('');
        setPasswordError('');

        if(email === '') {
            setEmailError('Empty field');
            return false;
        }

        if(password === '') {
            setPasswordError('Empty field');
            return false;
        }

        if(!validateEmail(email)) {
            setEmailError('Invalid email format');
            return false;
        }

        if(password.length < 8) {
            setPasswordError('Password must have at least 8 characters');
            return false;
        }

        if(password.length > 32) {
            setPasswordError('Password can contain up to 32 characters');
            return false;
        }
        return true;
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
                        keyboardType="email-address"
                        autoCapitalize="none"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        value={email}
                        setValue={setEmail}
                        error={emailError}
                        onSubmitEditing={onEmailSubmit} />
                    <LineInputPassword
                        label='Password'
                        placeholder="••••••"
                        returnKeyType="done"
                        value={password}
                        setValue={setPassword}
                        error={passwordError}
                        inputRef={passwordRef}/>
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