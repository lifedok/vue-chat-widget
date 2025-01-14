import * as esrever from 'esrever'

// “Hello, how are you?” -> “?uoy era woh, olleH”, “Как дела?” -> “?алед каК“
export const reverseString = (text: string): string => {
  return esrever.reverse(text) // https://github.com/mathiasbynens/esrever
}

// “Hello, how are you?” -> “olleH, woh era uoy?”, “Как дела?” -> “каК алед?“
export const transformText = (text: string): string => {
  return text
    .split(' ')
    .map((word) => {
      const symbols = [...word]
      const letters = symbols.filter((symbol) => /\p{L}/u.test(symbol))
      const reversedLetters = reverseString(letters.join('')).split('')

      return symbols
        .map((symbol) => (/\p{L}/u.test(symbol) ? reversedLetters.shift()! : symbol))
        .join('')
    })
    .join(' ')
}

export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const encodeMessage = (input: string): string => {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  return btoa(String.fromCharCode(...data));
};

export const decodeMessage = (input: string): string => {
  const decoded = atob(input);
  const data = new Uint8Array([...decoded].map(char => char.charCodeAt(0)));
  const decoder = new TextDecoder();
  return decoder.decode(data);
};

