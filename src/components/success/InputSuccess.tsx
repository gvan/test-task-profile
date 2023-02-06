import { StyleSheet, Text } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";

const {colors, fonts} = globalStyles;

const InputSuccess = (props) => {
    return (<Text style={st.inputSuccess}>{props.children}</Text>);
}

const st = StyleSheet.create({
    inputSuccess: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.successText,
        marginTop: 4,
        fontFamily: fonts.mainMedium,
    }
});

export default InputSuccess;