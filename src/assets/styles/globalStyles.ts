export interface GlobalStyles {
    colors: GlobalColors;
    fonts: GlobalFonts;
}

export interface GlobalColors {
    primary: string;
    background: string;
    mainText: string;
    secondaryText: string;
    errorText: string;
    successText: string;
    border: string;
}

export interface GlobalFonts {
    mainMedium: string;
}

const colors = {
    primary: '#ffc612',
    background: '#fff',
    mainTextColor: '#1f1d1d',
    secondaryText: '#9795a4',
    errorText: '#ed4337',
    successText: '#198754',
    border: '#d7d7d7',
} as GlobalColors;

const fonts = {
    mainMedium: 'Poppins-Medium',
} as GlobalFonts;

const globalStyles = {
    colors: colors,
    fonts: fonts,
} as GlobalStyles;

export default globalStyles;