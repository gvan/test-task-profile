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
import GlobalText from "../../assets/text/GlobalText";
import { validateEmail, validatePassword } from "../../utils";
import InputError from "../../components/errors/InputError";
import { UserSignUp } from "../../types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { colors } = globalStyles;
const {messages} = GlobalText;

const SignUpScreen = () => {

    const navigation = useNavigation();

    const [phone, setPhone] = useState('');
    const [code, setCode] = useState(0);
    const [codeVerified, setCodeVerified] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [phoneError, setPhoneError] = useState('');
    const [codeError, setCodeError] = useState('');
    const [codeSuccess, setCodeSuccess] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');

    const codeRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    useEffect(() => {
        const validateCode = async () => {
            if(code && code !== '') {
                const codeValid = await userApi.checkVerificationCode(phone, code);
                setCodeVerified(codeValid);
                if(codeValid) {
                    setCodeError('');
                    setCodeSuccess(messages.CODE_IS_VALID);
                } else {
                    setCodeError(messages.CODE_IS_NOT_VALID);
                    setCodeSuccess('');
                }
            }
        }
        validateCode();
    }, [code])

    const onSignInPress = () => {
        navigation.goBack();
    }

    const onNextPress = async () => {
        if(validateRegistrationForm()) {
            const user = {
                name: name,
                email: email,
                password: password,
                phoneNumber: phone
            } as UserSignUp;
            const res = await userApi.registerUser(user);

            if(res.data) {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Profile', params: {userId: res.data.id}}],
                });
            } else {
                setGeneralError(res.error);
            }
        }
    }

    const validateRegistrationForm = () => {
        setPhoneError('');
        setCodeError('');
        setCodeSuccess('');
        setNameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setGeneralError('');

        if(phone === '') {
            setPhoneError(messages.THIS_FIELS_IS_REQUIRED);
            return false;
        }

        if(code === '') {
            setCodeError(messages.THIS_FIELS_IS_REQUIRED);
            return false;
        }

        if(!codeVerified) {
            setCodeError(messages.CODE_IS_NOT_VALID);
            return false;
        }

        if(name === '') {
            setNameError(messages.THIS_FIELS_IS_REQUIRED);
            return false;
        }

        if(name.length < 3) {
            setNameError(messages.NAME_MIN);
            return false;
        }

        if(name.length > 64) {
            setNameError(messages.NAME_MAX);
            return false;
        }

        if(email === '') {
            setEmailError(messages.THIS_FIELS_IS_REQUIRED);
            return false;
        }

        if(!validateEmail(email)) {
            setEmailError(messages.INVALID_EMAIL_FORMAT);
            return false;
        }

        if(password === '') {
            setPasswordError(messages.THIS_FIELS_IS_REQUIRED);
            return false;
        }

        if(password.length < 8) {
            setPasswordError(messages.PASSWORD_MIN);
            return false;
        }

        if(password.length > 32) {
            setPasswordError(messages.PASSWORD_MAX);
            return false;
        }

        if(!validatePassword(password)) {
            setPasswordError(messages.INVALID_PASSWORD_FORMAT);
            return false;
        }

        if(confirmPassword === '') {
            setConfirmPasswordError(messages.THIS_FIELS_IS_REQUIRED);
            return false;
        }

        if(confirmPassword.length < 8) {
            setConfirmPasswordError(messages.PASSWORD_MIN);
            return false;
        }

        if(confirmPassword.length > 32) {
            setConfirmPasswordError(messages.PASSWORD_MAX);
            return false;
        }

        if(!validatePassword(confirmPassword)) {
            setConfirmPasswordError(messages.INVALID_PASSWORD_FORMAT);
            return false;
        }

        if(password != confirmPassword) {
            setConfirmPasswordError(messages.PASSWORDS_DO_NOT_MATCH);
            return false;
        }

        return true;
    }

    return <SafeAreaView style={st.container}>
        <KeyboardAwareScrollView 
            keyboardShouldPersistTaps='handled' 
            showsVerticalScrollIndicator={false}>
            <View>
                <BrandingHeader
                    title="Sign Up To Woorkroom" />
                <View style={st.formContainer}>
                    <PhoneNumberInput
                        label="Phone Number"
                        setPhone={setPhone}
                        returnKeyType="next"
                        onSubmitEditing={() => codeRef.current.focus()}
                        blurOnSubmit={false}
                        error={phoneError}/>
                    <VerificationCodeInput
                        label="Code"
                        setCode={setCode}
                        returnKeyType="next"
                        inputRef={codeRef}
                        onSubmitEditing={() => nameRef.current.focus()}
                        blurOnSubmit={false}
                        error={codeError}
                        success={codeSuccess}/>
                    <LineInput
                        label='Your Name'
                        placeholder="John Doe"
                        autoCapitalize="words"
                        value={name}
                        setValue={setName}
                        returnKeyType="next"
                        inputRef={nameRef}
                        onSubmitEditing={() => emailRef.current.focus()}
                        blurOnSubmit={false}
                        error={nameError}/>
                    <LineInput
                        label="Your Email"
                        placeholder="johndoe@example.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        setValue={setEmail}
                        returnKeyType="next"
                        inputRef={emailRef}
                        onSubmitEditing={() => passwordRef.current.focus()}
                        blurOnSubmit={false}
                        error={emailError}/>
                    <LineInputPassword
                        label="Password"
                        placeholder="••••••"
                        value={password}
                        setValue={setPassword}
                        returnKeyType="next"
                        inputRef={passwordRef}
                        onSubmitEditing={() => confirmPasswordRef.current.focus()}
                        blurOnSubmit={false}
                        error={passwordError}/>
                    <LineInputPassword
                        label="Confirm Password"
                        placeholder="••••••"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        returnKeyType="done"
                        inputRef={confirmPasswordRef}
                        error={confirmPasswordError}/>
                    {(generalError && generalError !== '') && <InputError>{generalError}</InputError>}
                    <RoundedButton
                        text="Next"
                        onPress={() => onNextPress()}/>
                    <TextWithButton
                        text="Have Account?"
                        buttonText="Log In"
                        onPress={() => onSignInPress()}/>
                </View>

            </View>
        </KeyboardAwareScrollView>

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