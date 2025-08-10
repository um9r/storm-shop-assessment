export default function shortenText(input: string, maxLength: number): string {
    if (input.length <= maxLength) {
        // If the length of the input text is less than or equal to maxLength, return the original text unchanged
        return input;
    }

    // Shorten the text to maxLength characters and add ellipsis at the end
    const shortenedText = input.substring(0, maxLength) + "...";

    return shortenedText;
}