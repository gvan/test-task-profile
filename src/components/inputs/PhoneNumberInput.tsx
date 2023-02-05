import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import { useEffect, useState } from "react";
import { ChevronDown } from "../../assets/icons";
import { CountryPicker } from "react-native-country-codes-picker";

export interface Props {
    label: string;
    setPhone: any;
    returnKeyType: string;
    inputRef: any;
    onSubmitEditing: any;
    blurOnSubmit: boolean;
}

const { colors } = globalStyles;

const PhoneNumberInput: React.FC<Props> = (props) => {

    const [code, setCode] = useState('+1');
    const [showCodePicker, setShowCodePicker] = useState(false);
    const [codeWasSelected, setCodeWasSelected] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneFormated, setPhoneFormated] = useState('');

    useEffect(() => {
        if(codeWasSelected && phone && phone !== '') {
            props.setPhone(`${code}${phone}`);
        }
    }, [codeWasSelected, phone]);

    const onPhoneChange = (text) => {

        const cleaned = ('' + text).replace(/\D/g, '')
        const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{2})(\d{2})$/)
        if (match) {
            setPhone(text);
            
            let intlCode = (match[1] ? '+1 ' : ''),
                number = [intlCode, match[2], ' ', match[3], '-', match[4], '-', match[5]].join('');
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
                    style={st.phoneInput}
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    dataDetectorTypes='phoneNumber'
                    maxLength={10}
                    value={phoneFormated}
                    onChangeText={onPhoneChange}
                    ref={props.inputRef}
                    returnKeyType={props.returnKeyType ? props.returnKeyType : 'default'}
                    blurOnSubmit={props.blurOnSubmit !== undefined ? props.blurOnSubmit : true}
                    onSubmitEditing={props.onSubmitEditing} />
            </View>
        </View>
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
        marginTop: 40
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
        marginEnd: 4
    },
    phoneContainer: {
        flex: 1,
        height: 48,
        paddingStart: 15,
        paddingEnd: 15,
    },
    phoneInput: {
        width: '100%',
        fontSize: 16
    },
});

export default PhoneNumberInput;