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
    codeFocused: boolean;
    codeRef: any;
}

const { colors } = globalStyles;



const CodeCell: React.FC<CodeCellProps> = (props) => {
    return (
        <View style={[st.codeCellContainer, { borderColor: props.codeFocused ? colors.primary : colors.border }]}>
            <TextInput
                value={props.value}
                onChangeText={props.onChangeText}
                onFocus={props.onFocus}
                maxLength={1}
                keyboardType='numeric'
                style={[st.codeCellInput]}
                ref={props.codeRef} />
        </View>
    );
}

const VerificationCodeInput: React.FC<Props> = (props) => {

    const [code, setCode] = useState(['', '', '', '']);
    const [codeFocus, setCodeFocus] = useState([false, false, false, false]);
    const codeRef = useRef([useRef(), useRef(), useRef(), useRef()]);

    useEffect(() => {
        if(!code.some(c => c === '')) {
            var codeResult = Number(code.join(''));
            props.setCode(codeResult);
        }
    }, [code]);

    const setCodeValue = (value: string, i: number) => {
        let codeCopy = [...code];
        codeCopy[i] = value.replace(/[^0-9]/g, '');
        setCode(codeCopy);
        if(codeCopy[i] === '') {
            if(i > 0) {
                codeRef.current[i-1].current.focus();
            }
        } else {
            if(i < codeRef.current.length - 1) {
                codeRef.current[i+1].current.focus();
            }
        }
    }

    const setCodeOnFocus = (i: number) => {
        let codeFocusCopy = codeFocus.map(() => false);
        codeFocusCopy[i] = true;
        setCodeFocus(codeFocusCopy);
    }

    return (
        <>
            <Text style={st.label}>{props.label}</Text>
            <View style={st.codeContainer}>
                {code.map((el, i) => {
                    return (
                        <CodeCell
                            value={code[i]}
                            onChangeText={(value) => { setCodeValue(value, i) }}
                            onFocus={() => { setCodeOnFocus(i) }}
                            codeFocused={codeFocus[i]}
                            codeRef={codeRef.current[i]}
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