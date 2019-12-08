<template>
  <div class="left-bar">
    <div class="account">
      <div class="avatarImg">
      <slot></slot>
      </div>
    </div>
    <div class="media">
      <p class="newArticle">
        <i class="fas fa-plus-square" type="button" @click="getFormArticle"></i> Create Article
      </p>
      <p class="userArticle">
        <i class="fas fa-newspaper" type="button" @click="showDashboard"></i> My Article
      </p>
      <p>
        <i class="fas fa-tools" type="button" @click="toSetting"></i> Setting
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LeftBar',
  data () {
    return {
    }
  },
  methods: {
    getFormArticle () {
      this.$emit('changeToWrite')
    },
    showDashboard () {
      this.$emit('changeToGetAll')
    },
    toSetting () {
      this.$emit('changeToSetting')
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Heebo|Merriweather|Montserrat|Patua+One&display=swap");

.left-bar {
  min-height: calc(100vh - 79px);
  background: #284663;
  box-shadow: -10px 0 10px -10px rgb(61, 57, 57) inset;
}

.account {
  color: aliceblue;
  height: 36vh;
  background: linear-gradient(180deg, rgb(7, 184, 166), rgb(2, 126, 113));
  box-shadow: -10px 0 10px -10px rgb(44, 40, 40) inset;
}

h2{
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  font-size: 30;
}

.avatarImg {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

div.avatarImg img {
  margin: 20px;
  width: 10vw;
  border-radius: 50%;
}

.media {
  font-family: 'Heebo', sans-serif;
  font-size: 18px;
  font-weight: bold;
  padding: 9%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background:#284663;
  box-shadow: -10px 0 10px -10px rgb(44, 40, 40) inset;
}

.media p{
  margin: 15px;
  color: white
}

.media p:hover {
  color: rgb(32, 209, 32);
  font-size: 21px;
  cursor: pointer;
}

</style>
