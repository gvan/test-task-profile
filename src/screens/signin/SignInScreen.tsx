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

const { colors } = globalStyles;

const SignInScreen = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onCreateAccountPress = () => {
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
                        text="Log In" />
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