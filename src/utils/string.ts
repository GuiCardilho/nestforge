export const capitalize = (str: string): string => {
    const camelCase = str.replace(/-./g, (match) =>
        match.charAt(1).toUpperCase()
    );

    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

export const lowerCapitalize = (str: string): string => {
    const camelCase = str.replace(/-./g, (match) =>
        match.charAt(1).toUpperCase()
    );

    return camelCase.charAt(0).toLowerCase() + camelCase.slice(1);
};
