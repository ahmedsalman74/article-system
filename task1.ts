function lettersToDecimalNumber(input: string): number {
    if (!input) {
        return 0;
    }

    const base = 26;
    let result = 0;

    // Convert the input to lowercase to handle uppercase letters
    const lowerInput = input.toLowerCase();

    for (let i = 0; i < lowerInput.length; i++) {
        const char = lowerInput[i];
        const charCode = char.charCodeAt(0);

        if (charCode < 97 || charCode > 122) { 
            throw new Error(`Invalid character '${input[i]}' at position ${i}. Only letters a-z or A-Z are allowed.`);
        }

        const value = charCode - 97;
        result = result * base + value;
    }

    return result;
}


const numberExamples = ["ba","ZCZ", "aa"];
numberExamples.forEach(example => {
    try {
        console.log(`"${example}" = ${lettersToDecimalNumber(example)}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error processing "${example}": ${error.message}`);
        } else {
            console.error(`Unknown error processing "${example}".`);
        }
    }
});