<template>
  <div class='jumbotron'>
    <h1>Analyze Twitter Profiles at a Glance.</h1>
    <div class='card-container'>
      <div class='card'>
        <h3>
          <div class='material-icons'>forum</div>Rhetoric
        </h3>
        <p>BitterBird analyzes profiles and shows you how positive or negative their tweets are, what words they use most, how long their tweets are, and the readability level of their tweets.</p>
      </div>
      <div class='card'>
        <h3>
          <div class='material-icons'>alternate_email</div>Hashtags and Mentions
        </h3>
        <p>BitterBird displays a user's most used hashtags, people they mention most often and whose tweets they most often retweet.</p>
      </div>
      <div class='card'>
        <h3>
          <div class='material-icons'>trending_up</div>Trends
        </h3>
        <p>BitterBird graphs statistics such as the number of likes and reshares of someone's tweets, their uses of hashtags and mentions, and how many of their last 200 tweets they sent each month.</p>
      </div>
    </div>
    <div class='cta'><button id='try-it' @click='$emit("search")'>Try it</button></div>
  </div>
</template>

<style lang='scss' scoped>
@import '@/style/common.scss';

h1 {
  margin-top: 48px;
  margin: 48px 24px 24px 24px;
  text-align: center;
}

div.material-icons {
  float: right;
  // text-align: center;
  font-size: 24px;
  color: $blue;
}

#try-it {
  margin-bottom: 24px;
}

.cta {
  text-align: center;
}
</style>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {}
</script>
