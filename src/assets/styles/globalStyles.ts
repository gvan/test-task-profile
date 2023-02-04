export interface GlobalStyles {
    colors: GlobalColors;
}

export interface GlobalColors {
    primary: string;
    background: string;
    mainText: string;
    secondaryText: string;
    border: string;
}

const colors = {
    primary: '#ffc612',
    background: '#fff',
    mainTextColor: '#1f1d1d',
    secondaryText: '#9795a4',
    border: '#d7d7d7',
} as GlobalColors;

const globalStyles = {
    colors: colors,
} as GlobalStyles;

export default globalStyles;