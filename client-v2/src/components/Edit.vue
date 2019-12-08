<template>
  <div>
    <loading
      :active.sync="isLoading"
      color="#038ba0"
      :height="185"
      :width="210"
      :can-cancel="false"
      loader="dots"
    ></loading>
    <div class="edit-article">
      <div class="transparant">
        <form action enctype="multipart/form-data" @submit.prevent="editMe" class="form-edit">
          <h2 class="label-edit">Edit Your Article</h2>
          <br>
          <input type="text" v-model="currentTitle" class="title-place" />
          <div class="tags">
            <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"></vue-tags-input>
          </div>
          <div class="pic">
            <img :src="place" alt />
          </div>
          <input type="file" id="file" ref="file" v-on:change="getImage($event)" />
          <wysiwyg v-model="currentContent" class="box-edit"></wysiwyg>
          <div>
            <br />
            <el-button type="warning" @click="editMe" size="medium" plain style="width:80px">Edit</el-button>
            <br />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import toastr from 'toastr'
import VueTagsInput from '@johmun/vue-tags-input'
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-top-center',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '2500',
  extendedTimeOut: '800',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut'
}
export default {
  name: 'EditArticle',
  components: {
    VueTagsInput
  },
  data () {
    return {
      tags: [],
      tag: '',
      currentTitle: '',
      currentContent: '',
      currentImage: '',
      currentTags: [],
      newImage: false,
      isLoading: false,
      place: '',
      baseUrl: 'http://pressina-server.ayusudi.com'
    }
  },
  props: {
    id: String
  },
  methods: {
    getImage () {
      let file = event.target.files || event.dataTransfer.files
      this.currentImage = file[0]
      this.place = URL.createObjectURL(file[0])
    },
    getData (input) {
      axios({
        method: 'GET',
        url: this.baseUrl + '/articles/' + input,
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(({ data }) => {
        this.currentTitle = data.article.title
        this.currentContent = data.article.content
        this.currentImage = data.article.featured_image
        this.currentTags = data.article.tags
        this.place = data.article.featured_image
        this.getTags()
      })
    },
    editMe () {
      this.isLoading = false
      let formdata = new FormData()
      formdata.set('featured_image', this.currentImage)
      formdata.set('title', this.currentTitle)
      formdata.set('content', this.currentContent)
      formdata.set('tags', this.currentTags)
      axios({
        method: 'PUT',
        url: this.baseUrl + '/articles/' + this.id,
        headers: {
          token: localStorage.getItem('token')
        },
        data: formdata
      })
        .then(data => {
          this.isLoading = true
          toastr.success('Success edit an article').css({
            width: '550px',
            'max-width': '600px',
            height: '18vh',
            'font-size': '30px',
            display: 'flex',
            'align-items': 'center'
          })
          this.$emit('changeToGetAll')
        })
        .catch(err => {
          for (let k in err) {
            console.log(err[k])
          }
          console.log(err)
        })
      // });
    },
    getTags () {
      let tags = []
      this.currentTags.forEach(el => {
        let vueinput = {
          text: el,
          tiClasses: ['ti-valid']
        }
        tags.push(vueinput)
      })
      this.tags = tags
      this.isLoading = false
    }
  },
  created () {
    this.isLoading = true
    this.getData(this.id)
  },
  watch: {
    tags () {
      let alltags = []
      if (this.tags.length > 0) {
        this.tags.forEach(el => {
          alltags.push(el.text)
        })
        this.currentTags = alltags
      }
    }
  }
}
</script>
<style scoped>
.pic {
  display: flex;
  justify-content: center;
  margin: 10px;
}
img {
  object-fit: contain;
  height: 200px;
  width: 450px;
}

.edit-article {
  background: url("../assets/image/white1.png");
  display: flex;
  justify-content: center;
  height: 100%;
}
.box-edit {
  background: rgb(255, 255, 255);
  height: 35vh;
  overflow: scroll;
}
form.form-edit {
  width: 75%;
  margin-top: 5%;
  min-height: 85vh;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}
.label-edit {
  color: rgb(31, 31, 39);
  text-align: center;
}

form.form-edit button {
  width: 200px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

input[type="text"] {
  padding-left: 10px;
  height: 34px;
  width: 100%;
  font-size: 21px;
  align-self: flex-start;
}

h2 {
  font-size: 50px;
}

input[type="file"] {
  font-size: 18px;
  margin: 2.5% 28% 2.5% 0;
  padding-top: 0.7%;
  padding-bottom: 0.7%;
  border-radius: 10px;
  background: rgb(247, 196, 102);
}

input[type="submit"] {
  font-size: 28px;
  width: 150px;
  padding: 0.5%;
  margin-top: 2%;
  align-self: center;
}

.tags {
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 14pt;
}

.vue-tags-input {
  max-width: none !important;
  width: 100%;
}

.transparant {
  background: rgba(180, 180, 180, 0.466);
  width: 80%;
  margin: 20px;
  padding-bottom: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
}

.editr {
  width: 700px;
  height: 250px !important;
  max-height: 250px !important;
  overflow: scroll;
}
</style>
