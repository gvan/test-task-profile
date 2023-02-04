import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import BrandingHeader from "../../components/screens/BrandingHeader";
import { useEffect, useState } from "react";
import LineInput from "../../components/inputs/LineInput";
import globalStyles from "../../assets/styles/globalStyles";
import LineInputPassword from "../../components/inputs/LineInputPassword";
import RoundedButton from "../../components/buttons/RoundedButton";
import TextWithButton from "../../components/buttons/TextWithButton";
import { useNavigation } from "@react-navigation/native";
import PhoneNumberInput from "../../components/inputs/PhoneNumberInput";
import VerificationCodeInput from "../../components/inputs/VerificationCodeInput";

const { colors } = globalStyles;

const SignUpScreen = () => {

    const navigation = useNavigation();

    const [phone, setPhone] = useState('');
    const [code, setCode] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onSignInPress = () => {
        navigation.goBack();
    }

    const onNextPress = () => {
        navigation.navigate('Profile');
    }

    return <SafeAreaView style={st.container}>
        <ScrollView>
            <View>
                <BrandingHeader
                    title="Sign Up To Woorkroom" />
                <View style={st.formContainer}>
                    <PhoneNumberInput
                        label="Phone Number"
                        setPhone={setPhone}/>
                    <VerificationCodeInput
                        label="Code"
                        setCode={setCode}/>
                    <LineInput
                        label='Your Name'
                        placeholder="John Doe"
                        value={name}
                        setValue={setName} />
                    <LineInput
                        label="Your Email"
                        placeholder="johndoe@example.com"
                        value={email}
                        setValue={setEmail}/>
                    <LineInputPassword
                        label="Password"
                        placeholder="••••••"
                        value={password}
                        setValue={setPassword}/>
                    <LineInputPassword
                        label="Confirm Password"
                        placeholder="••••••"
                        value={confirmPassword}
                        setValue={setConfirmPassword}/>
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