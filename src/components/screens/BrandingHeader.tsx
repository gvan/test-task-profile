import { StyleSheet, Text, View } from "react-native";
import { Logo } from "../../assets/icons";
import globalStyles from "../../assets/styles/globalStyles";

const {colors} = globalStyles;

interface Props {
    title: string;
}

const BrandingHeader: React.FC<Props> = ({title}) => {
    return (<View style={st.topContainer}>
        <Logo style={st.logo} />
        <Text style={st.title}>{title}</Text>
    </View>);
}

const st = StyleSheet.create({
    topContainer: {
        alignItems: 'center'
    },
    logo: {
        marginTop: 50,
    },
    title: {
        marginTop: 110,
        fontSize: 24,
        color: colors.mainText,
        lineHeight: 36,
    },
});

export default BrandingHeader;