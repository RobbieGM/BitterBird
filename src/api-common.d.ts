export interface UserDataResponse {
  basicProfileInfo: {
    followers: number;
    following: number;
    profilePictureURL: string;
    verified: boolean;
    description?: string;
    name: string;
    handle: string;
    location?: string;
    url?: string;
    yearJoined: number;
  }
  /**
   * Bar graph for each month showing number of tweets posted.
   */
  tweetsPerMonth: Graph;
  latestTweetData: MultiLineGraph;
  mostUsedHashtags: MultiLineGraph;
  mostMentionedPeople: MultiLineGraph;
  mostRetweetedPeople: MultiLineGraph;
  // sentiment: Graph;
  mostUsedWords: MultiLineGraph;
  averageTweetLength: number;
  readingGradeLevel: number;
}

interface TermOccurrenceList extends Array<Term> {}

interface Term {
  term: string;
  occurrences: number;
}

interface MultiLineGraph extends Array<LabeledGraph> {}

interface LabeledGraph {
  term: string;
  points: Graph;
}

type Graph = GraphPoint[];

interface GraphPoint {
  date: number;
  value: number;
}
