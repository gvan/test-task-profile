import { StyleSheet, Text, TextInput, View } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";

export interface Props {
    label: string;
    placeholder: string;
    value: string;
    setValue: any;
    labelStyle: any;
}

const { colors } = globalStyles;

const LineInput: React.FC<Props> = (props) => {
    return (<>
        <Text style={[st.inputLabel, props.labelStyle]}>{props.label}</Text>
        <View style={st.inputContainer}>
            <TextInput
                placeholder={props.placeholder}
                placeholderTextColor={colors.mainText}
                autoCapitalize="none"
                keyboardType="email-address"
                style={st.input}
                value={props.value}
                onChangeText={props.setValue} />
        </View>
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
});

export default LineInput;