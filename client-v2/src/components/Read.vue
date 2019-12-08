<template>
  <div class="read-article">
    <div class="box">
      <h2 class="label-artcle">{{title}}</h2>
      <div class="pic">
        <img v-bind:src="image" alt />
      </div>
      <div v-html="content" class="oke">
      </div>
       <el-button type="primary" @click="backToHome" plain>Close</el-button>
       <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Read',
  data () {
    return {
      title: '',
      content: '',
      image: '',
      baseUrl: 'http://pressina-server.ayusudi.com'
    }
  },
  methods: {
    backToHome () {
      this.$emit('changeToGetAll')
    }
  },
  props: {
    readOne: String
  },
  created () {
    axios({
      method: 'GET',
      url: this.baseUrl + '/articles/' + this.readOne,
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(({ data }) => {
      this.title = data.article.title
      this.content = data.article.content
      this.image = data.article.featured_image
    })
  }
}
</script>
<style scoped>

.read-article {
  background:url("../assets/image/blue.jpg");
  background-size: 30%;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.box{
margin : 6%;
background: white;
min-height: 350px;
width: 75%;
display: flex;
flex-direction: column;
align-items:  center;
border-radius: 10px
}

h2{
    font-size: 45px;
    margin-top: 58px
}
p{
    font-family :'Heebo', sans-serif;
    margin-top : 6vh;
    font-size: 13pt;
    width : 800px;
    margin-left: 40px;
    margin-right: 40px
}
input{
    margin : 5%;
    height: 4vh;
    font-size: 21pt
}
img {
  object-fit: contain;
  height: 350px;
  width: 580px;
}

.pic {
  width: 580px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right : 6px;
  padding-left: 6px;
  background: rgb(216, 209, 209);
  margin: 28px 20px 20px 20px;
}
.oke{
  padding: 45px
}
</style>
