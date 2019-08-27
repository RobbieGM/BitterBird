declare module 'flesch-kincaid' {
  const fleschKincaid: (options: {
    word: number,
    sentence: number,
    syllable: number,
  }) => number;
  export = fleschKincaid 
}