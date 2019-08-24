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
  /**
   * Very long bar graph (up to 200 bars) or line graph where each bar represents a tweet and its height represents how many likes it has.
   */
  latestTweetLikes: Graph;
  /**
   * Like latestTweetLikes but with reshares, not likes.
   */
  latestTweetRetweets: Graph;
  mostUsedHashtags: MultiLineGraph;
  mostMentionedPeople: TermOccurrenceList;
  mostRetweetedPeople: TermOccurrenceList;
  // sentiment: Graph;
  // mostUsedWords: MultiLineGraph;
  // averageTweetLength: number;
  // readingGradeLevel: number;
}

type TermOccurrenceList = Array<{
  term: string;
  occurrences: number;
}>;

type MultiLineGraph = Array<{
  term: string;
  points: Graph;
}>;

type Graph = GraphPoint[];

interface GraphPoint {
  date: number;
  value: number;
}
