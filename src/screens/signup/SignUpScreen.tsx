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

const { colors } = globalStyles;

const SignUpScreen = () => {

    const navigation = useNavigation();

    const [phone, setPhone] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onSignInPress = () => {
        navigation.goBack();
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
                    <LineInput
                        label='Your Name'
                        placeholder="John Doe"
                        value={name}
                        onChangeText={setName} />
                    <LineInput
                        label="Your Email"
                        placeholder="johndoe@example.com"
                        value={email}
                        onChangeText={setEmail}/>
                    <LineInputPassword
                        label="Password"
                        placeholder="••••••"
                        value={password}
                        onChangeText={setPassword}/>
                    <LineInputPassword
                        label="Confirm Password"
                        placeholder="••••••"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}/>
                    <RoundedButton
                        text="Next"/>
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