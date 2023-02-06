import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";

export interface Props {
    text: string;
    buttonText: string;
    onPress:() => void;
}

const {colors, fonts} = globalStyles;

const TextWithButton: React.FC<Props> = (props) => {
    return (<View style={st.textWithButton}>
        <Text style={st.secondaryLabel}>{`${props.text} `}</Text>
        <TouchableOpacity onPress={props.onPress}>
            <Text style={st.primaryLabel}>{props.buttonText}</Text>
        </TouchableOpacity>
    </View>);
}

const st = StyleSheet.create({
    textWithButton: {
        marginTop: 35,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    secondaryLabel: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.secondaryText,
        fontFamily: fonts.mainMedium,
    },
    primaryLabel: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.primary,
        fontFamily: fonts.mainMedium,
    }
});

export default TextWithButton;