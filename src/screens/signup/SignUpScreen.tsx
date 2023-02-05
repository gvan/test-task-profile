import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import BrandingHeader from "../../components/screens/BrandingHeader";
import { useEffect, useRef, useState } from "react";
import LineInput from "../../components/inputs/LineInput";
import globalStyles from "../../assets/styles/globalStyles";
import LineInputPassword from "../../components/inputs/LineInputPassword";
import RoundedButton from "../../components/buttons/RoundedButton";
import TextWithButton from "../../components/buttons/TextWithButton";
import { useNavigation } from "@react-navigation/native";
import PhoneNumberInput from "../../components/inputs/PhoneNumberInput";
import VerificationCodeInput from "../../components/inputs/VerificationCodeInput";
import userApi from "../../services/api/UserApi";

const { colors } = globalStyles;

const SignUpScreen = () => {

    const navigation = useNavigation();

    const [phone, setPhone] = useState('');
    const [code, setCode] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [phoneError, setPhoneError] = useState('');
    const [codeError, setCodeError] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const codeRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const onSignInPress = () => {
        navigation.goBack();
    }

    const onNextPress = async () => {
        const res = await userApi.registerUser({
            name: 'Ivan Hanzha',
            email: 'ivan@gmail.com',
            password: 'password',
            phoneNumber: '+380961112233'
        } as UserSignUp);
        console.log(`register response ${JSON.stringify(res)}`);
        if(res.data) {
            navigation.reset({
                index: 0,
                routes: [{name: 'Profile'}],
            });
        } else {

        }
    }

    const onPhoneSubmit = () => {
        codeRef.current.focus();
    }

    const onCodeSubmit = () => {
        nameRef.current.focus();
    }

    const onNameSubmit = () => {
        emailRef.current.focus();
    }

    const onEmailSubmit = () => {
        passwordRef.current.focus();
    }

    const onPasswordSubmit = () => {
        confirmPasswordRef.current.focus();
    }

    return <SafeAreaView style={st.container}>
        <ScrollView>
            <View>
                <BrandingHeader
                    title="Sign Up To Woorkroom" />
                <View style={st.formContainer}>
                    <PhoneNumberInput
                        label="Phone Number"
                        setPhone={setPhone}
                        returnKeyType="next"
                        onSubmitEditing={onPhoneSubmit}
                        blurOnSubmit={false}/>
                    <VerificationCodeInput
                        label="Code"
                        setCode={setCode}
                        returnKeyType="next"
                        inputRef={codeRef}
                        onSubmitEditing={onCodeSubmit}
                        blurOnSubmit={false}/>
                    <LineInput
                        label='Your Name'
                        placeholder="John Doe"
                        value={name}
                        setValue={setName}
                        returnKeyType="next"
                        inputRef={nameRef}
                        onSubmitEditing={onNameSubmit}
                        blurOnSubmit={false}/>
                    <LineInput
                        label="Your Email"
                        placeholder="johndoe@example.com"
                        value={email}
                        setValue={setEmail}
                        returnKeyType="next"
                        inputRef={emailRef}
                        onSubmitEditing={onEmailSubmit}
                        blurOnSubmit={false}/>
                    <LineInputPassword
                        label="Password"
                        placeholder="••••••"
                        value={password}
                        setValue={setPassword}
                        returnKeyType="next"
                        inputRef={passwordRef}
                        onSubmitEditing={onPasswordSubmit}
                        blurOnSubmit={false}/>
                    <LineInputPassword
                        label="Confirm Password"
                        placeholder="••••••"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        returnKeyType="done"
                        inputRef={confirmPasswordRef}/>
                    <RoundedButton
                        text="Next"
                        onPress={onNextPress}/>
                    <TextWithButton
                        text="Have Account?"
                        buttonText="Log In"
                        onPress={onSignInPress}/>
                </View>

            </View>
        </ScrollView>

    </SafeAreaView>
};

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
    }
});

export default SignUpScreen;