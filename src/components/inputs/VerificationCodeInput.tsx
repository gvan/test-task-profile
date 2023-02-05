import { StyleSheet, Text, TextInput, View } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import { useEffect, useReducer, useRef, useState } from "react";
import InputError from "../errors/InputError";

export interface Props {
    label: string;
    setCode: any;
    returnKeyType: string;
    inputRef: any;
    onSubmitEditing: any;
    blurOnSubmit: boolean;
    error: string;
}

interface CodeCellProps {
    value: string;
    onChangeText: any;
    onFocus: any;
    onBackspacePress: any;
    codeFocused: boolean;
    codeRef: any;
    onSubmitEditing: any;
    index: number;
    returnKeyType: string;
    blurOnSubmit: string;
}

interface Code {
    code: string;
    focused: boolean;
    ref: any;
}

const CODE_LENGTH = 4;
const { colors } = globalStyles;

const CodeCell: React.FC<CodeCellProps> = (props) => {

    const onKeyPress = ({ nativeEvent }) => {
        if (nativeEvent.key === 'Backspace') {
            props.onBackspacePress();
        }
    }

    const getReturnKeyType = () => {
        if(props.index < CODE_LENGTH - 1) {
            return "next";
        } else {
            return props.returnKeyType ? props.returnKeyType : "default";
        }
    }

    const getBlurOnSubmit = () => {
        if(props.index < CODE_LENGTH - 1) {
            return false;
        } else {
            return props.blurOnSubmit !== undefined ? props.blurOnSubmit : true;
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
                ref={props.codeRef}
                returnKeyType={getReturnKeyType()}
                onSubmitEditing={props.onSubmitEditing}
                blurOnSubmit={getBlurOnSubmit()}/>
        </View>
    );
}

const VerificationCodeInput: React.FC<Props> = (props) => {

    const [code, setCode] = useState(Array.from({ length: CODE_LENGTH }, (e, i) => ({
        code: '',
        focused: false,
        ref: (i === 0 && props.inputRef) ? props.inputRef : useRef(),
        onSubmitEditing: (i === CODE_LENGTH -1) ? () => {
            if(props.onSubmitEditing) props.onSubmitEditing();
            clearCodesFocus();
        } : () => {
            code[i+1].ref.current.focus();
        },
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

    const clearCodesFocus = () => {
        let codeCopy = [...code];
        codeCopy.forEach(c => {c.focused = false; return c;})
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
                            key={i.toString()}
                            value={el.code}
                            onChangeText={(value) => { setCodeValue(value, i) }}
                            onFocus={() => { setCodeOnFocus(i) }}
                            onBackspacePress={() => { onBackspacePress(i) }}
                            codeFocused={el.focused}
                            codeRef={el.ref}
                            index={i}
                            returnKeyType={props.returnKeyType}
                            onSubmitEditing={el.onSubmitEditing}
                            blurOnSubmit={props.blurOnSubmit}
                        />
                    );
                })}
            </View>
            {(props.error && props.error !== '') && <InputError>{props.error}</InputError>}
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