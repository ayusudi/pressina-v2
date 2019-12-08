<template>
  <div id="timeline-box">
 <loading :active.sync="isLoading" color="#038ba0" :height=185 :width=210 :can-cancel=false loader="dots"></loading>
    <div class="navabar-timeline" id="box">
      <div class="serachArt">
        <div class="search-art">
          <form class="form-inline my-2 my-lg-0" @submit.prevent="searchByField">
            <div>
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              v-model="search"
            />
        <el-button circle size="small"><i data-v-66e833="" class="fas fa-search fa" aria-hidden="true"  @click="searchByField"></i></el-button>
            </div>

            <div class="settoright">
              <div class="typeSearch">
                <div>
                  <input type="radio" name="type" value="title" v-model="typeSearch"/>
                  <label for="">Title</label>
                </div>
                <div>
                  <input type="radio" name="type" value="tag" v-model="typeSearch"/>
                  <label for="">Tag</label>
                </div>
              </div>
            </div>
          </form>
          </div>

      </div>
    </div>
    <div class="articles" id="box" v.on>
      <div class="article" id="number" v-for="item in items" :key="item.id">
        <figure class="pic">
          <img v-bind:src="item.featured_image" alt />
        </figure>
        <article class="summary">
          <header>
            <h3>{{item.title}}</h3>
          </header>
          <div style="margin-left:9px">
            <button
              v-for="(tag,index) in item.tags"
              :key="index"
              name="tag"
              @click="searchTag(tag)"
            >{{tag}}</button>
          </div>
          <main v-html="item.content" style="max-height:90px; width:440px"></main>
        </article>
        <div class="action">
          <div class="action-owner">
            <i class="fas fa-book-open fa-2x" @click="toReadOne(item._id)"></i>
            <i class="fas fa-pencil-alt fa-2x" @click="toEditForm(item._id)"></i>
            <i class="fas fa-trash-alt fa-2x" @click="deleteArticle(item._id)"></i>
            <i class="fas fa-tags fa-2x" @click="searchTag(item.tags)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
  name: 'GetAll',
  data () {
    return {
      isLoading: false,
      items: [],
      search: '',
      typeSearch: 'title',
      currentTitle: '',
      currentContent: '',
      baseUrl: 'http://pressina-server.ayusudi.com'
    }
  },
  methods: {
    getMyArticle () {
      this.items = []
      axios({
        method: 'get',
        url: this.baseUrl + '/articles/mine',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(result => {
          console.log('fetch articles')
          if (result.data.articles.length > 0) {
            this.items = result.data.articles
            let user = result.data.articles[0].author
            this.$emit('userinfo', {
              name: user.name,
              image: user.image,
              email: user.email
            })
            console.log(user)
            this.isLoading = false
          } else {
            this.items = []
            this.updateLeftBar()
            this.isLoading = false
          }
          console.log(result.data.articles, '<<<<<<<<<<')
          // .
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteArticle (input) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        this.isLoading = true
        if (result.value) {
          axios({
            method: 'DELETE',
            url: this.baseUrl + '/articles/' + input,
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(data => {
              Swal.fire(
                'Deleted!',
                'Your article has been deleted.',
                'success'
              )
              let items = this.items
              for (let i = 0; i < items.length; i++) {
                if (items[i]._id === input) {
                  console.log('herree')
                  items.splice(i, 1)
                }
              }
              console.log(items)
              this.items = items
              this.isLoading = false
            })
            .catch(err => {
              console.log(err.response)
            })
        } else {
          Swal.fire('Cancel', 'We keep your article save', 'success')
        }
      })
    },
    toEditForm (input) {
      this.$emit('changeToEdit', input)
    },
    toReadOne (input) {
      this.$emit('changeToRead', input)
    },
    searchTag (input) {
      let search
      if (typeof input === 'string') {
        search = [input]
      } else {
        search = input
      }
      axios({
        method: 'post',
        url: this.baseUrl + '/articles/tag',
        data: {
          tags: search
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.items = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    searchByField () {
      if (this.typeSearch === 'tag') {
        this.searchTag(this.search)
      } else {
        axios({
          method: 'post',
          url: this.baseUrl + '/articles/search',
          data: {
            search: this.search
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            this.items = data
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    updateLeftBar () {
      axios({
        method: 'post',
        url: this.baseUrl + '/users/',
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(response => {
        // this.imageuser = response.data.image;
        // console.log(response.data)
        this.$emit('userinfo', {
          name: response.data.name,
          image: response.data.image,
          email: response.data.email
        })
        this.isLoading = false
        // this.page = "getall";
        // this.nameuser = response.data.name;
      })
    }
  },
  created () {
    console.log('createee')
    if (localStorage.getItem('token')) {
      this.isLoading = true
      this.getMyArticle()
    }
  },
  watch: {
  }
}
// @click="searchArticle"@submit.prevent="trackingSearch""
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Oswald|Poppins|Raleway|Roboto&display=swap');

#timeline-box {
  padding: 2% 6% 2% 6%;
  margin: 3% 4.2% 4.2% 5%;
  min-height: 100vh;
  background: rgba(255, 255, 255, 0.315);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 25px;
}

.navabar-timeline {
  padding: 3% 4.5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  border-radius: 25px;
  width: 58vw;
  margin: 4%;
  background: #284663;
  font-family: 'Oswald', sans-serif;
}

main {
  margin: 10px;
  height: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

button[name="tag"] {
  margin: 3px;
  padding: 4px;
  font-size: 10pt;
  border-radius: 5px;
  font-family: 'Oswald', sans-serif;
  background-color: #284663;
  color: white;
  font-weight: 400;
}

button[name="tag"]:hover {
  background-color: #16d1be;
  color: black;
}

.tags {
  margin-bottom: 10px;
}

.articles {
  padding: 20px;
    border-radius: 25px;
    min-height: 100vh;
    background: #ff9601;
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.settoright{
  display: flex;
  justify-content: flex-end;
  margin-right: 35px;
  padding-top: 5px;
}

p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
  font-family: "Heebo", sans-serif;
  font-size: 21px;
}

h3 {
  padding-top: 10px;
  padding-left: 10px;
  font-family: "Heebo", sans-serif;
  font-size: 24px;
}

input[type="search"] {
  height: 3.5vh;
  width: 25vw;
  border-radius: 15px;
  font-size: 18px;
  margin-right: 10px;
}

button[type="submit"] {
  height: 38px;
  width: 38px;
  border-radius: 50%;
  outline: none;
}

button[type="submit"]:hover {
  cursor: pointer;
  background: rgb(13, 13, 82);
  color: white;
}

.typeSearch{
  font-size: 11pt !important;
  color: white !important;
  width: 200px;
  text-align: left;
  display: flex;
  align-self: flex-end;
  justify-content: space-around;
}

.article {
  display: flex;
  width: 90%;
  margin: 10px;
  height: 180px;
}

.summary {
  background: rgb(253, 253, 253);
}

.action {
  display: flex;
  padding: 14px;
  width: 160px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 13px;
  border-bottom-right-radius: 13px;
  background: rgb(229, 232, 235);
}

input {
  outline: 0;
  padding-left: 10px;
}

input:hover {
  outline: 0;
  padding-left: 10px;
}

.action i {
  position: relative;
  color: rgb(76, 5, 104);
  padding: 4%;
  margin: 4%;
}

.action i:hover {
  cursor: pointer;
  position: relative;
  color: rgb(0, 0, 17);
  padding: 3%;
  bottom: 2.5%;
  top: 2.5%;
  font-size: 40px;
}

.action-owner {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 2%;
  width: 125px;
  height: 125px;
}
figure{
  width: 190px
}
.pic {
  background: rgb(255, 255, 255);
  display: flex;
  padding: 10px;
  width: 190px;
  align-items: center;
  justify-content: center;
  border-right: 1pt double rgb(163, 161, 161);
  border-top-left-radius: 13px;
  border-bottom-left-radius: 13px;
}

img {
  object-fit: contain;
  height: 20vh;
  width: 100%;
}

main{
  width: 300px
}
label{
  font-size: 12pt;
  font-weight: 600;
  font-family: 'Oswald', sans-serif;
}

</style>
