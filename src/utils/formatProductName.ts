const formatProductName = (name: string): string => {
    const splitted = name.split("(");
    splitted.pop();
    const result = splitted
        .join()
        .trim()
        .toUpperCase();

    return result;
};

export default formatProductName;
