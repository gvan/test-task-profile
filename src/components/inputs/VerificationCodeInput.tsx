import { StyleSheet, Text, TextInput, View } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import { useEffect, useReducer, useRef, useState } from "react";

export interface Props {
    label: string;
    setCode: any;
}

interface CodeCellProps {
    value: string;
    onChangeText: any;
    onFocus: any;
    onBackspacePress: any;
    codeFocused: boolean;
    codeRef: any;
}

interface Code {
    code: string;
    focused: boolean;
    ref: any;
}

const { colors } = globalStyles;



const CodeCell: React.FC<CodeCellProps> = (props) => {

    const onKeyPress = ({ nativeEvent }) => {
        if (nativeEvent.key === 'Backspace') {
            props.onBackspacePress();
        }
    }

    return (
        <View style={[st.codeCellContainer, { borderColor: props.codeFocused ? colors.primary : colors.border }]}>
            <TextInput
                value={props.value}
                onChangeText={props.onChangeText}
                onFocus={props.onFocus}
                onKeyPress={onKeyPress}
                maxLength={1}
                keyboardType='numeric'
                style={[st.codeCellInput]}
                ref={props.codeRef} />
        </View>
    );
}

const VerificationCodeInput: React.FC<Props> = (props) => {

    const [code, setCode] = useState(Array.from({ length: 4 }, () => ({
        code: '',
        focused: false,
        ref: useRef()
    })));

    useEffect(() => {
        if (!code.some(c => c.code === '')) {
            var codeResult = Number(code.map(c => c.code).join(''));
            props.setCode(codeResult);
        }
    }, [code]);

    const setCodeValue = (value: string, i: number) => {
        let codeCopy = [...code];
        codeCopy[i].code = value.replace(/[^0-9]/g, '');
        setCode(codeCopy);

        if (codeCopy[i].code === '') {
            if (i > 0) {
                codeCopy[i - 1].ref.current.focus();
            }
        } else {
            if (i < codeCopy.length - 1) {
                codeCopy[i + 1].ref.current.focus();
            }
        }
    }

    const setCodeOnFocus = (i: number) => {
        let codeCopy = [...code];
        codeCopy.forEach(c => { c.focused = false; return c; });
        codeCopy[i].focused = true;
        setCode(codeCopy);
    }

    const onBackspacePress = (i: number) => {
        if (i > 0) {
            code[i - 1].ref.current.focus();
        }
    }

    return (
        <>
            <Text style={st.label}>{props.label}</Text>
            <View style={st.codeContainer}>
                {code.map((el, i) => {
                    return (
                        <CodeCell
                            value={el.code}
                            onChangeText={(value) => { setCodeValue(value, i) }}
                            onFocus={() => { setCodeOnFocus(i) }}
                            onBackspacePress={() => { onBackspacePress(i) }}
                            codeFocused={el.focused}
                            codeRef={el.ref}
                        />
                    );
                })}
            </View>
        </>
    );
}

const st = StyleSheet.create({
    label: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.secondaryText,
        marginTop: 40,
    },
    codeContainer: {
        flexDirection: 'row',
        marginTop: 15,
    },
    codeCellContainer: {
        width: 48,
        height: 48,
        marginEnd: 25,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    codeCellInput: {
        width: '100%',
        height: '100%',
        fontSize: 16,
        color: colors.mainText,
        textAlign: 'center',
    }
});

export default VerificationCodeInput;