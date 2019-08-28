declare module 'sentiment' {
  interface SentimentResult {
    score: number;
    comparative: number;
    calculation: {
      [word: string]: number;
    }
    tokens: string[];
    words: string[];
    positive: string[];
    negative: string[];
  }
  export default class Sentiment {
    constructor();
    analyze(text: string): SentimentResult;
  }
}