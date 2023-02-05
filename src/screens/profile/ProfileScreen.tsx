import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import globalStyles from "../../assets/styles/globalStyles"
import { Edit } from "../../assets/icons";
import { User } from "../../types";
import LineInput from "../../components/inputs/LineInput";
import { useState } from "react";
import RoundedButton from "../../components/buttons/RoundedButton";
import { useNavigation } from "@react-navigation/native";

const { colors } = globalStyles;

const ProfileScreen = () => {

    const navigation = useNavigation();

    const user = {
        name: 'Mike Tyson',
        email: 'miketyson@gmail.com',
        phoneCode: '+440',
        phoneNumber: '96556954',
        position: 'UI/UX Designer',
        skype: 'live-miketyson98'
    } as User;

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phoneNumber);
    const [position, setPosition] = useState(user.position);
    const [skype, setSkype] = useState(user.skype);

    const onLogOutPress = () => {
        navigation.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
        });
    }

    const onSavePress = () => {

    }

    return <SafeAreaView style={st.container}>
        <ScrollView>
            <View style={st.content}>
                <View style={st.headerContainer}>
                    <Text style={st.headerTitle}>{'Edit Profile'}</Text>
                    <TouchableOpacity style={st.headerAction} onPress={onLogOutPress}>
                        <Text style={st.headerActionText}>{'Log Out'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={st.profileContainer}>
                    <View>
                        <Image
                            style={st.profileImage}
                            source={require('../../assets/images/DefaultUser.png')} />
                        <TouchableOpacity
                            style={st.profileEdit}>
                            <Edit/>
                        </TouchableOpacity>
                    </View>
                    <Text style={st.profileUsername}>{user.name}</Text>
                    <Text style={st.profilePosition}>{user.position}</Text>
                </View>
                <LineInput
                    label="Name"
                    value={name}
                    setValue={setName}
                    labelStyle={{marginTop: 30}}/>
                <LineInput
                    label="Email"
                    value={email}
                    setValue={setEmail}/>
                <LineInput
                    label="Phone"
                    value={phone}
                    setValue={setPhone}/>
                <LineInput
                    label="Position"
                    value={position}
                    setValue={setPosition}/>
                <LineInput
                    label="Skype"
                    value={skype}
                    setValue={setSkype}/>
                <RoundedButton
                    text="Save"
                    onPress={onSavePress}/>
            </View>
        </ScrollView>
    </SafeAreaView>
}

const st = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        marginTop: 50,
        marginRight: 32,
        marginLeft: 32,
        marginBottom: 50,
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerTitle: {
        fontSize: 18,
        lineHeight: 27,
        color: colors.mainText,
    },
    headerAction: {
        position: 'absolute',
        right: 0,
    },
    headerActionText: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.primary,
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    profileImage: {
        width: 70,
        height: 70,
    },
    profileEdit: {
        position: 'absolute',
        bottom: 0,
        end: 0
    },
    profileUsername: {
        fontSize: 24,
        lineHeight: 36,
        color: colors.mainText,
        marginTop: 10
    },
    profilePosition: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.secondaryText,
        marginTop: 3,
    }
})

export default ProfileScreen;