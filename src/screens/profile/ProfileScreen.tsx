import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import globalStyles from "../../assets/styles/globalStyles"
import { Edit } from "../../assets/icons";
import { User } from "../../types";
import LineInput from "../../components/inputs/LineInput";
import React, { useEffect, useState } from "react";
import RoundedButton from "../../components/buttons/RoundedButton";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import userApi from "../../services/api/UserApi";
import { AuthStackParamList } from "../../navigation/types";
import InputError from "../../components/errors/InputError";
import GlobalText from "../../assets/text/GlobalText";
import { validateEmail } from "../../utils";
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { colors, fonts } = globalStyles;
const {messages} = GlobalText;

type Props = RouteProp<AuthStackParamList, 'Profile'>;

const ProfileScreen: React.FC = () => {

    const navigation = useNavigation();
    const route = useRoute<Props>();

    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [position, setPosition] = useState('');
    const [skype, setSkype] = useState('');
    const [avatar, setAvatar] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [generalError, setGeneralError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const res = await userApi.getUser(route.params.userId);
            if(res.data) {
                updateStateFields(res.data);
            } else {
                setGeneralError(res.error);
            }
        };

        fetchUser();
    }, []);

    const onLogOutPress = () => {
        navigation.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
        });
    }

    const onSavePress = async () => {
        if(validateProfile()) {
            const userParams = {
                ...user,
                name: name,
                email: email,
                phoneNumber: phone,
                position: position,
                skype: skype,
                avatar: avatar,
            } as User;

            const res = await userApi.updateUserInfo(userParams);
            if(res.data) {
                updateStateFields(res.data);
            } else {
                setGeneralError(res.error);
            }
        }
    }

    const onChangeAvatarPress = async () => {
        const options = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: true,
            maxWidth: 400,
            maxHeight: 400,
        } as ImageLibraryOptions;

        const result = await launchImageLibrary(options);
        if(result.assets.length > 0) {
            const asset = result.assets[0];
            const res = await userApi.updateUserAvatar(user.id, asset.base64);
            if(res.data) {
                updateStateFields(res.data);
            } else {
                setGeneralError(res.error);
            }
        }
    }

    const updateStateFields = (user: user) => {
        setUser(user);
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phoneNumber);
        setPosition(user.position ? user.position : '');
        setSkype(user.skype ? user.skype : '');
        setAvatar(user.avatar ? user.avatar : '');
    }

    const validateProfile = () => {
        setNameError('');
        setEmailError('');
        setPhoneError('');
        setGeneralError('');

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

        if(phone === '') {
            setPhoneError(messages.THIS_FIELS_IS_REQUIRED);
            return false;
        }

        return true;
    }

    const getAvatarPath = () => {
        if(!avatar || avatar === 'null' || avatar === '') {
            return require('../../assets/images/DefaultUser.png');
        } else {
            return {uri: `data:image/png;base64,${avatar}`};
        }
    }

    return <SafeAreaView style={st.container}>
        <KeyboardAwareScrollView  
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}>
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
                            source={getAvatarPath()} />
                        <TouchableOpacity
                            style={st.profileEdit}
                            onPress={() => onChangeAvatarPress()}>
                            <Edit/>
                        </TouchableOpacity>
                    </View>
                    <Text style={st.profileUsername}>{user.name}</Text>
                    <Text style={st.profilePosition}>{user.position}</Text>
                </View>
                <LineInput
                    label="Name"
                    autoCapitalize="words"
                    value={name}
                    setValue={setName}
                    labelStyle={{marginTop: 30}}
                    error={nameError}/>
                <LineInput
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    setValue={setEmail}
                    error={emailError}/>
                <LineInput
                    label="Phone"
                    value={phone}
                    setValue={setPhone}
                    error={phoneError}/>
                <LineInput
                    label="Position"
                    value={position}
                    setValue={setPosition}/>
                <LineInput
                    label="Skype"
                    value={skype}
                    autoCapitalize="none"
                    setValue={setSkype}/>
                {(generalError && generalError !== '') && <InputError>{generalError}</InputError>}
                <RoundedButton
                    text="Save"
                    onPress={() => onSavePress()}/>
            </View>
        </KeyboardAwareScrollView>
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
        fontFamily: fonts.mainMedium,
    },
    headerAction: {
        position: 'absolute',
        right: 0,
    },
    headerActionText: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.primary,
        fontFamily: fonts.mainMedium,
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 70/2,
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
        fontFamily: fonts.mainMedium,
        marginTop: 10,
    },
    profilePosition: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.secondaryText,
        fontFamily: fonts.mainMedium,
        marginTop: 3,
    }
})

export default ProfileScreen;