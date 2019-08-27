<template>
  <div id='app'>
    <div id='top-bar'>
      <router-link to='/' id='main-page-link'>
        <img src='/img/icons/logo-60x60.png'/>
        <b id='name'>BitterBird</b>
      </router-link>
      <div id='search-container'>
        <span id='search-icon' class='material-icons'>search</span>
        <input type='text' id='search' v-model='query' placeholder='Enter a Twitter handle or link to a profile...' ref='searchBar' @keydown.enter='search()'/>
      </div>
    </div>
    <router-view @search='focusSearch()'/>
  </div>
</template>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import './style/common.scss';

#top-bar {
  max-width: 100%;
  color: $text;
  background: white;
  box-shadow: 0 0 9px rgba(0, 0, 0, 0.1);
  height: 60px;
  display: flex;
  align-items: center;
  padding: 12px;
  box-sizing: border-box;
  #main-page-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }
  img {
    width: 36px;
    height: 36px;
    image-rendering: optimizeQuality;
  }
  b#name {
    margin-left: 12px;
    font-size: 18px;
    user-select: none;
  }
  #search-container {
    position: relative;
    margin-left: 24px;
    flex-basis: 400px;
    display: flex;
  }
  #search {
    flex: 1;
    border: none;
    appearance: none;
    font-family: inherit;
    font-size: inherit;
    background: $off-white;
    padding: 8px;
    transition: background 0.2s;
    border-radius: 999px;
    padding-left: 48px;
    &::placeholder {
      color: $gray;
      opacity: 1;
    }
    &:focus {
      background: $light-gray;
    }
  }
  #search-icon {
    position: absolute;
    color: $gray;
    top: 50%;
    transform: translateY(-50%);
    left: 12px;
  }
}

@media screen and (max-width: 430px) {
  b#name {
    display: none;
  }
  #top-bar #search-container {
    margin-left: 12px;
  }
}
</style>

<script lang='ts'>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import GraphCard from './components/GraphCard.vue';

@Component({
  components: {GraphCard},
})
export default class App extends Vue {

  private query: string = '';

  private focusSearch() {
    (this.$refs.searchBar as HTMLElement).focus();
  }

  private search() {
    function stripUsernameFromURL(query: string) {
      try {
        const url = new URL(query);
        if (url.hostname === 'twitter.com') {
          return url.pathname.replace('/', '');
        }
      } catch (err) {
        if (err instanceof TypeError) { // invalid URL
          return query;
        } else {
          throw err;
        }
      }
      return query;
    }
    const removeAtSign = (handle: string) => handle.startsWith('@') ? handle.slice(1) : handle;
    if (this.query) {
      this.query = removeAtSign(stripUsernameFromURL(this.query));
      this.viewProfile(this.query);
    }
  }

  private viewProfile(handle: string) {
    this.$router.push(`/profile/${handle}`);
  }
}
</script>