import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import { useEffect, useState } from "react";
import { ChevronDown } from "../../assets/icons";
import { CountryPicker } from "react-native-country-codes-picker";
import InputError from "../errors/InputError";

export interface Props {
    label: string;
    setPhone: any;
    returnKeyType: string;
    inputRef: any;
    onSubmitEditing: any;
    blurOnSubmit: boolean;
    error: string;
}

const { colors, fonts } = globalStyles;

const PhoneNumberInput: React.FC<Props> = (props) => {

    const [code, setCode] = useState('+1');
    const [showCodePicker, setShowCodePicker] = useState(false);
    const [codeWasSelected, setCodeWasSelected] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneFormated, setPhoneFormated] = useState('');

    useEffect(() => {
        if(phone && phone !== '') {
            props.setPhone(`${code}${phone}`);
        }
    }, [codeWasSelected, phone]);

    const onPhoneChange = (text) => {
        const cleaned = ('' + text).replace(/\D/g, '')
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/)
        if (match && !text.includes('-')) {
            setPhone(text);
            
            let number = match[1] + ' ' + match[2] + '-' + match[3] + '-' + match[4];
            setPhoneFormated(number);
        } else {
            setPhoneFormated(text);
        }
    }

    const onCodePress = () => {
        setShowCodePicker(true);
    }

    const onCodePicked = (country) => {
        setCode(country.dial_code);
        setCodeWasSelected(true);
        setShowCodePicker(false);
    }

    return (<>
        <Text style={st.inputLabel}>{props.label}</Text>
        <View style={st.inputContainer}>
            <View style={[st.borderedContainer, st.codeContainer]}>
                <TouchableOpacity onPress={onCodePress}>
                    <View style={st.codeContainerTouchable}>
                        <Text
                            style={[st.codeText, { color: codeWasSelected ? colors.mainText : colors.secondaryText }]}>
                            {code}
                        </Text>
                        <ChevronDown />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={[st.borderedContainer, st.phoneContainer]}>
                <TextInput
                    placeholder="345 567-23-56"
                    placeholderTextColor={colors.secondaryText}
                    style={[st.phoneInput, {marginTop: Platform.OS === 'android' ? 5 : 0}]}
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    dataDetectorTypes='phoneNumber'
                    maxLength={13}
                    value={phoneFormated}
                    onChangeText={onPhoneChange}
                    ref={props.inputRef}
                    returnKeyType={props.returnKeyType ? props.returnKeyType : 'default'}
                    blurOnSubmit={props.blurOnSubmit !== undefined ? props.blurOnSubmit : true}
                    onSubmitEditing={props.onSubmitEditing} />
            </View>
        </View>
        {(props.error && props.error !== '') && <InputError>{props.error}</InputError>}
        <CountryPicker
            show={showCodePicker}
            style={{
                modal: {
                    height: 400,
                }
            }}
            pickerButtonOnPress={onCodePicked} />
    </>);
}

const st = StyleSheet.create({
    inputLabel: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.secondaryText,
        marginTop: 40,
        fontFamily: fonts.mainMedium,
    },
    inputContainer: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 15,
    },
    borderedContainer: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center'
    },
    codeContainer: {
        marginEnd: 25,
        width: 70,
        height: 48,
    },
    codeContainerTouchable: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    codeText: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.secondaryText,
        marginEnd: 4,
        fontFamily: fonts.mainMedium,
    },
    phoneContainer: {
        flex: 1,
        height: 48,
        paddingStart: 15,
        paddingEnd: 15,
    },
    phoneInput: {
        width: '100%',
        height: '100%',
        fontSize: 16,
        lineHeight: 24,
        color: colors.mainText,
        fontFamily: fonts.mainMedium,
    },
});

export default PhoneNumberInput;