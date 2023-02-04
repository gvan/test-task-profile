import { StyleSheet, Text, TouchableOpacity } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";

export interface Props {
    text: string;
    onPress(): void;
}

const {colors} = globalStyles;

const RoundedButton: React.FC<Props> = ({text, onPress}) => {
    return (<TouchableOpacity 
        style={st.button}
        onPress={onPress}>
        <Text style={st.buttonLabel}>{text}</Text>
    </TouchableOpacity>);
}

const st = StyleSheet.create({
    button: {
        width: '100%',
        height: 62,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: 20,
        marginTop: 50,
    },
    buttonLabel: {
        fontSize: 18,
        color: colors.mainText
    },
});

export default RoundedButton;