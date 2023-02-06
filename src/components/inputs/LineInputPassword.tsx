import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import { useState } from "react";
import { EyeClose, EyeOpen } from "../../assets/icons";

export interface Props {
    label: string;
    placeholder: string;
    value: string;
    setValue: any;
    error: string;
    returnKeyType: string;
    inputRef: any;
    onSubmitEditing: any;
    blurOnSubmit: boolean;
}

const {colors, fonts} = globalStyles;

const LineInputPassword: React.FC<Props> = (props) => {

    const [secureText, setSecureText] = useState(true);

    const onShowPasswordPress = () => {
        setSecureText(!secureText)
    }

    return (<>
        <Text style={[st.inputLabel]}>{props.label}</Text>
        <View style={st.inputContainer}>
            <TextInput
                placeholder={props.placeholder}
                placeholderTextColor={colors.mainText}
                secureTextEntry={secureText}
                autoCapitalize="none"
                returnKeyType={props.returnKeyType}
                blurOnSubmit={props.blurOnSubmit !== undefined ? props.blurOnSubmit : true}
                ref={props.inputRef}
                style={st.input}
                value={props.value}
                onChangeText={props.setValue}
                onSubmitEditing={props.onSubmitEditing} />
            <TouchableOpacity onPress={onShowPasswordPress}>
                {secureText ? <EyeOpen /> : <EyeClose />}
            </TouchableOpacity>
        </View>
        {(props.error && props.error !== '') && <Text style={st.inputError}>{props.error}</Text>}
    </>);
}

const st = StyleSheet.create({
    inputContainer: {
        flex: 1,
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    input: {
        flex: 1,
        color: colors.mainText,
        fontSize: 16,
        lineHeight: 24,
        fontFamily: fonts.mainMedium,
    },
    inputLabel: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.secondaryText,
        marginTop: 40,
        fontFamily: fonts.mainMedium,
    },
    inputError: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.errorText,
        fontFamily: fonts.mainMedium,
    }
});

export default LineInputPassword;