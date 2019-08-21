<template>
  <div id='app'>
    <!-- <div id='nav'>
      <router-link to='/'>Home</router-link> |
      <router-link to='/about'>About</router-link>
    </div>
    <router-view/>-->
    <div id='top-bar'>
      <img src='img/icons/logo-60x60.png' />
      <b id='name'>BitterBird</b>
      <div id='search-container'>
        <span id='search-icon' class='material-icons'>search</span>
        <input type='text' id='search' placeholder='Search Twitter users...' />
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import './style/common.scss';

html,
body {
  margin: 0;
  background: $off-white;
}

* {
  touch-action: manipulation;
}

.material-icons { user-select: none; }

#app {
  font-family: 'Source Sans Pro', 'Avenir', Helvetica, Arial, sans-serif;
  color: $text;
}

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

@Component({})
export default class App extends Vue {}
</script>