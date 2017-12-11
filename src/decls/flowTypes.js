/*
    global
        User,
        ThemeType,
        StylesType
*/
declare type User = {
    name: string,
    id: string
};

declare type ThemeType = {
    spacing: {
        unit: number
    }
};

declare type StylesType = {
    root: {
        marginTop: number,
        width: string
    },
    flex: {
        flex: number
    },
    menuButton: {
        marginLeft: number,
        marginRight: number
    }
};
