<template>
  <div class='profile'>
    <div v-if='response' class='card-container'>
      <div class='card basic-profile-info'>
        <h3>Profile Info</h3>
        <img :src='response.basicProfileInfo.profilePictureURL' class='profile-pic'/>
        <div class='username-and-handle'>
          <b>{{ response.basicProfileInfo.name }}</b>&nbsp;<wbr/>(<a :href='`https://twitter.com/${response.basicProfileInfo.handle}`'>@{{ response.basicProfileInfo.handle }}</a>)
        </div>
        <span class='material-icons verified-user' v-if='response.basicProfileInfo.verified'>verified_user</span>
        <br/>
        <Chip>{{ response.basicProfileInfo.followers.toLocaleString() }} followers</Chip>
        <Chip>{{ response.basicProfileInfo.following.toLocaleString() }} following</Chip>
        <Chip icon='my_location' v-if='response.basicProfileInfo.location'>{{ response.basicProfileInfo.location}}</Chip>
        <Chip icon='link' v-if='response.basicProfileInfo.url'><a :href='response.basicProfileInfo.url'>{{ response.basicProfileInfo.url }}</a></Chip>
        <Chip icon='date_range'>Joined {{ response.basicProfileInfo.yearJoined }}</Chip>
        <br/>
        <span v-if='response.basicProfileInfo.description'>Description: {{ response.basicProfileInfo.description }}</span>
      </div>
      <GraphCard :graph='response.latestTweetData' type='scatter' title='Basic tweet data'/>
      <GraphCard :graph='[{term: "Tweets", points: response.tweetsPerMonth}]' type='bar' title='Monthly tweets'/>
      <GraphCard :graph='response.mostUsedHashtags' title='Hashtag uses'/>
      <GraphCard :graph='response.mostMentionedPeople' title='Mentioned people'/>
      <GraphCard :graph='response.mostRetweetedPeople' title='Retweeted people'/>
      <GraphCard :graph='response.mostUsedWords' title='Most used words'/>
      <div class='small-2x2-card-container'>
        <div class='small card'>
          <h3>Average tweet length</h3>
          <div class='data'><b>{{ response.averageTweetLength }}</b> characters</div>
        </div>
        <div class='small card'>
          <h3>Writing level</h3>
          <div class='data'>Grade <b>{{ response.writingGradeLevel }}</b></div>
        </div>
        <div class='small card'>
          <h3>Sentiment</h3>
          <div class='data'><b>{{ getSentimentDescription(response.sentiment) }}</b> ({{ (response.sentiment > 0 ? '+' : '') + response.sentiment.toFixed(2) }})</div>
        </div>
        <div class='small card'>
          <h3>Average entity density</h3>
          <div class='data'><b>{{ response.averageEntities.toFixed(1) }}</b> hashtags, mentions, or URLs per tweet</div>
        </div>
      </div>
    </div>
    <div class='loading-container' v-else>
      <img :class='{"loading-icon": true, "bouncing": !errorMessage}' src='/img/icons/logo-60x60.png'/>
      <div v-if='!errorMessage'>Fetching data from Twitter...</div>
      <div v-else class='error'>{{ errorMessage }}</div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
@import '@/style/common.scss';

.card /deep/ h3 {
  margin-bottom: 8px;
}

.small.card div.data {
  text-align: center;
}

.basic-profile-info {
  .profile-pic {
    float: left;
    margin-right: 18px;
    width: 48px;
    height: 48px;
    border-radius: 8px;
  }

  .username-and-handle {
    display: inline-block;
    margin-bottom: 8px;
  }

  .verified-user {
    float: right;
    font-size: 18px;
    line-height: 18px;
    color: $gray;
  }
}

@keyframes load {
  from {
    transform: translateY(-10px);
  }
  to {
    transform: translateY(0px);
  }
}

.loading-container {
  margin-top: 112px;
  text-align: center;
  .loading-icon {
    width: 60px;
    height: 60px;
    &.bouncing {
      animation: load 0.3s cubic-bezier(0.55, 0.06, 0.75, 0.54) alternate infinite;
    }
  }
  & > div {
    max-width: 300px;
    margin: 8px auto;
  }
  .error {
    color: #ff0077;
    font-weight: bold;
  }
}
</style>

<script lang='ts'>
import Vue from 'vue';
import { UserDataResponse, MultiLineGraph } from '@/api-common';
import { Component, Watch } from 'vue-property-decorator';
import Chip from '@/components/Chip.vue';
import GraphCard from '@/components/GraphCard.vue';
import Chart from 'chart.js';

@Component({
  components: {Chip, GraphCard},
})
export default class Profile extends Vue {
  public errorMessage?: string | null = null;
  public response?: UserDataResponse | null = null;

  private created() {
    this.loadUserData();
  }

  @Watch('$route.path')
  private routeChanged(path: string) {
    this.loadUserData();
  }

  private async loadUserData() {
    this.errorMessage = null;
    this.response = null;
    const port = process.env.NODE_ENV == 'production' ? location.port : 81;
    const apiOrigin = location.protocol + '//' + location.hostname + ':' + port;
    try {
      const resp = await fetch(`${apiOrigin}/api/user-info?handle=${this.$route.params.handle}`);
      if (resp.ok) {
        this.response = await resp.json();
      } else {
        this.errorMessage = await resp.text();
      }
    } catch (err) {
      console.error('Error occurred while fetching:', err);
      this.errorMessage = 'No connection';
    }
  }

  private leadingSign(n: number) {
    return (n > 0 ? '+' : '') + n;
  }

  private getSentimentDescription(sentiment: number) {
    // Sentiments tend to be skewed positive
    console.log('getSentimentDescription of', sentiment);
    if (sentiment > 0.1) {
      return 'Very positive';
    } else if (sentiment > 0.05) {
      return 'Mostly positive';
    } else if (sentiment > -0.03) {
      return 'Mostly neutral';
    } else if (sentiment > -0.05) {
      return 'Mostly negative';
    } else {
      return 'Very negative';
    }
  }
}
</script>