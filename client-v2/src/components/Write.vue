<template>
  <div class="create-article">
    <div class="transparant">
      <form ction enctype="multipart/form-data" class="form-create" @submit.prevent="createArticle">
        <h2 class="label-create">Write Your Article</h2>
        <br />
        <input type="text" placeholder="Title" v-model="title" class="title-place" />
        <div class="tags">
          <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"></vue-tags-input>
        </div>
        <div class="pic">
          <img :src="place" alt="No Image" />
        </div>
        <input v-on:change="getImage($event)" type="file" />
        <wysiwyg v-model="content" class="box-create"></wysiwyg>
        <div></div>
        <div>
          <br />
          <el-button
            type="primary"
            @click="createArticle"
            size="medium"
            plain
            style="width:120px"
          >Create Article</el-button>
          <br />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueTagsInput from '@johmun/vue-tags-input'
import Swal from 'sweetalert2'
import toastr from 'toastr'
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
  name: 'Write',
  components: {
    VueTagsInput
  },
  data () {
    return {
      tag: '',
      tags: [],
      title: '',
      content: '',
      baseUrl: 'http://pressina-server.ayusudi.com',
      image: false,
      place:
        'https://storage.googleapis.com/upload-image-miniwp/1570944466443untitled%20(6).png'
    }
  },
  methods: {
    getImage () {
      let file = event.target.files || event.dataTransfer.files
      this.image = file[0]
      this.place = URL.createObjectURL(file[0])
    },
    createArticle () {
      let formdata = new FormData()
      let pic
      if (this.image) {
        formdata.set('image', this.image)
        axios({
          method: 'POST',
          url: this.baseUrl + '/articles/upload',
          data: formdata,
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(result => {
          pic = result.data.link
        })
      }

      axios({
        method: 'POST',
        url: this.baseUrl + '/articles/',
        data: {
          title: this.title,
          content: this.content,
          featured_image: pic,
          tags: this.inputtags
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          Swal.fire(
            'Success create new article!',
            'Your article has been created.',
            'success'
          )
          this.$emit('backToHome')
        })
        .catch(err => {
          let error = err.response.data.errMsg.join('<br>')
          toastr.warning(error).css({
            width: '550px',
            'max-width': '600px',
            height: '18vh',
            'font-size': '30px',
            display: 'flex',
            'align-items': 'center'
          })
        })
        .catch(() => {
          // console.log(err)
          toastr.warning('Image is required and Image type is JPG').css({
            width: '550px',
            'max-width': '600px',
            height: '18vh',
            'font-size': '30px',
            display: 'flex',
            'align-items': 'center'
          })
        })
    }
  },
  computed: {
    inputtags () {
      let alltags = []
      if (this.tags.length > 0) {
        this.tags.forEach(el => {
          alltags.push(el.text)
        })
      }
      return alltags
    }
  }
}
</script>
<style scoped>
.create-article {
  background: url("../assets/image/white1.png");
  display: flex;
  justify-content: center;
  height: 100%;
}
.box-create {
  background: rgb(255, 255, 255);
}
form.form-create {
  width: 75%;
  margin-top: 5%;
  min-height: 85vh;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}
.label-create {
  color: rgb(31, 31, 39);
  text-align: center;
}

form.form-create button {
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
</style>
