declare module 'wink-nlp-utils' {
  interface Token {
    value: string;
    tag: string;
  }
  namespace nlp {
    namespace string {
      function tokenize(text: string, detailed: boolean): Token[];
      function sentences(text: string): string[];
    }
  }
  export = nlp
}