import { StyleSheet, Text, TextInput, View } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";

export interface Props {
    label: string;
    placeholder: string;
    value: string;
    setValue: any;
    labelStyle: any;
    error: string;
    returnKeyType: string;
    keyboardType: string;
    autoCapitalize: string;
    inputRef: any;
    onSubmitEditing: any;
    blurOnSubmit: boolean;
}

const { colors } = globalStyles;

const LineInput: React.FC<Props> = (props) => {
    return (<>
        <Text style={[st.inputLabel, props.labelStyle]}>{props.label}</Text>
        <View style={st.inputContainer}>
            <TextInput
                placeholder={props.placeholder}
                placeholderTextColor={colors.mainText}
                autoCapitalize={props.autoCapitalize ? props.autoCapitalize : 'sentences'}
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                returnKeyType={props.returnKeyType ? props.returnKeyType : 'default'}
                blurOnSubmit={props.blurOnSubmit !== undefined ? props.blurOnSubmit : true}
                ref={props.inputRef}
                style={st.input}
                value={props.value}
                onChangeText={props.setValue}
                onSubmitEditing={props.onSubmitEditing} />
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
    },
    inputLabel: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.secondaryText,
        marginTop: 40,
    },
    inputError: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.errorText,
    }
});

export default LineInput;