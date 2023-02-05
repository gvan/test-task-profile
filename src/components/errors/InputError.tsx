import { StyleSheet, Text } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";

const {colors} = globalStyles;

const InputError = (props) => {
    return (<Text style={st.inputError}>{props.children}</Text>);
}

const st = StyleSheet.create({
    inputError: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.errorText,
        marginTop: 4,
    }
});

export default InputError;