<template>
  <div class="cointainer">
    <loading
      :active.sync="isLoading"
      color="#E95E08"
      :height="185"
      :width="210"
      :can-cancel="false"
      loader="dots"
    ></loading>
    <div class="box">
      <h1>Setting</h1>
      <hr />
      <form @submit.prevent="changeProfile">
        <h2>Profile</h2>
        <br />
        <div class="landscape">
          <div style="width:140px; margin-left:15px">
            <div id="preview" style="margin-top:5px">
              <img v-if="url" :src="url" height="100px" style="border-radius:50%" width="100px" />
            </div>
            <input type="file" name @change="onFileChange" id />
          </div>
          <div style="display:flex; flex-direction:column; width:300px; margin-left:10px">
            <label for="name">Name</label>
            <input type="text" name="name" id="inputName" v-model="name" />
            <label for="email">Email</label>
            <label for="email"></label>
            <input type="email" name="email" id="inputEmail" v-model="email" />
            <br />
            <div style="align-self:flex-end">
              <el-button type="warning" round @click="changeProfile" size="mini">Save</el-button>
            </div>
          </div>
        </div>
      </form>
      <hr />
      <h2 class="pass">Change Password</h2>
      <div v-if="gotCode">
        <div v-if="correctCode" class="chg">
          <form
            @submit.prevent="changeToDefault"
            class="ps"
            style="display:flex; justify-content:space-between; width:200px"
          >
            <br />
            <div style="height: 125px;">
              <label for="password" style="padding-top:8px">New Password</label>
              <input
                type="password"
                name="password"
                id="inputPassword"
                v-model="newPass"
                class="input"
              />
              <p>{{label}}</p>
              <label for="confrim">Confrim Password</label>
              <input type="password" name="match" id="match" v-model="confrimNewPass" class="input" />
              <p>{{labeldown}}</p>
            </div>
            <div style>
              <el-button type="primary" size="mini" @click="changeToDefault">Confrim</el-button>
            </div>
          </form>
        </div>
        <div v-else>
          <form @submit.prevent="cekCode" class="ps">
            <br />
            <h3>We Send Code To</h3>
            <h4>{{email}}</h4>
            <br />
            <input type="text" v-model="inputCode" placeholder="Code" />
            <br />
            <div>
              <el-button type="success" @click="cekCode" size="small">Submit</el-button>
            </div>
          </form>
        </div>
      </div>
      <div v-else>
        <el-button
          @click="formPass"
          type="primary"
          style="padding:5px; height:38px"
          class="mybutton mg"
        >Reset Password</el-button>
      </div>
      <div style="position:fixed; top:660px; width:100%">
        <hr />
        <h2 class="article">Article</h2>
        <el-button
          type="danger"
          class="mybutton custom"

          style="padding:5px; height:45px; "
          @click="deleteAll"
        >
          <b>Delete All Articles</b>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'EditProfile',
  props: ['propname', 'propimg', 'propemail'],
  data () {
    return {
      gotCode: false,
      correctCode: false,
      isLoading: false,
      label: '',
      labeldown: '',
      legalCode: '',
      confrimNewPass: '',
      newPass: '',
      inputCode: '',
      emailnotedit: '',
      name: '',
      email: '',
      image: false,
      baseUrl: 'http://pressina-server.ayusudi.com',
      url: 'https://img.pngio.com/blank-avatarpng-avatar-png-486_489.png'
    }
  },
  methods: {
    onFileChange (e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)
      this.image = file
    },
    formPass () {
      this.gotCode = true
      this.codeToEmail()
    },
    cekCode () {
      if (this.legalCode === this.inputCode) {
        this.correctCode = true
      }
    },
    changeToDefault () {
      if (this.newPass.length > 5 && this.newPass === this.confrimNewPass) {
        this.gotCode = false
        this.correctCode = false
        this.inputCode = ''
        this.changePass()
        this.confrimNewPass = ''
      }
    },
    changePass () {
      axios({
        method: 'patch',
        url: `${this.baseUrl}/users`,
        data: {
          password: this.newPass
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.newPass = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    codeToEmail () {
      let code = ''
      let variable = 'ABCEDFG123456'
      for (let i = 0; i < 6; i++) {
        let charc = variable[Math.floor(Math.random() * variable.length)]
        code += charc
      }
      this.legalCode = code
      let html = `
      <div style="height: 240px; width: 240px; background-color: rgb(6, 171, 154); border-radius: 10pt;padding:30px">
        <div style="height: 225px; width: 225px; background-color: white; border-radius: 10pt;padding:10px">
          <div style=" padding-left:62px;">
            <div style="height: 100px; width: 100px; background: url(&quot;https://storage.googleapis.com/upload-image-miniwp/1570855991328untitled.jpg&quot;) 0% 0% / 100%;">
            </div>
          </div>
             <div>
                <h2 style="margin: 2px;text-align:center">Pressina</h2>
             </div>
          <div>
            <p style="font-size: 10pt; margin: 3px;text-align:center">Input this code for reset your password</p>
          </div>
          
          <div style="background-color: rgb(40, 70, 100); color: white; width: 120px; height: 40px; border-radius: 10px; margin:0 auto;">
            <h2 style="text-align: center; font-size: 14pt;text-align:center; padding:5px">${code}</h2>
          </div>
        </div>
      </div>
      `
      axios({
        method: 'post',
        url: `${this.baseUrl}/users/forgotps`,
        data: {
          html,
          email: this.emailnotedit
        }
      })
        .then(({ data }) => {
        })
        .catch(err => {
          let errors = err.response.data
          console.log(errors)
        })
    },
    changeProfile () {
      this.isLoading = true
      let formdata = new FormData()
      formdata.set('image', this.image)
      formdata.set('name', this.name)
      formdata.set('email', this.email)
      axios({
        method: 'put',
        url: `${this.baseUrl}/users`,
        data: formdata,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$emit('updateProfile')
          // this.getIdentity();
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteAll () {
      Swal.fire({
        title: 'Are you sure to delete all articles?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete All Articles'
      }).then(result => {
        if (result.value) {
          axios({
            method: 'delete',
            url: this.baseUrl + '/articles',
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(() => {
              Swal.fire('Success', 'Delete all your article', 'success')
              this.$emit('updateProfile')
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          Swal.fire('Cancel', 'We keep your articles save', 'success')
        }
      })
    }
  },
  created () {
    let temp = this.propname
    let temp2 = this.propimg
    let temp3 = this.propemail
    this.name = temp
    this.image = temp2
    this.url = temp2
    this.email = temp3
    this.emailnotedit = temp3
  },
  watch: {
    newPass () {
      if (this.newPass.length < 6) {
        this.label = 'password minimum length is 6'
      } else {
        this.label = ''
      }
    },
    confrimNewPass () {
      if (this.newPass !== this.confrimNewPass) {
        this.labeldown = 'confrimation password not match'
      } else {
        this.labeldown = ''
      }
    },
    propname (value) {
      let temp = this.propname
      this.name = temp
    }
  },
  destroyed () {
    this.name = ''
    this.email = ''
  }
}
</script>

<style scoped>
.box {
  height: calc(100vh - 131px);
  padding-top: 2%;
  width: 94%;
  margin-top: 30px;
  margin-left: 65px;
  border-top-left-radius: 35px;
  background-color: rgba(185, 189, 187, 0.445);
}

h1 {
  margin-right: 18px;
  margin-bottom: 10px;
  font-size: 30pt;
}
form {
  display: flex;
  flex-direction: column;
  width: 20vw;
  padding: 10px;
  margin: 30px;
  margin-top: 10px;
}
.ps {
  width: 15vw;
}
input {
  height: 15pt;
  margin: 2px;
}
button[type="submit"] {
  height: 25px;
  width: 75px;
  font-size: 12pt;
}
h2.pass {
  margin-left: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.mybutton {
  padding: 5px;
  font-size: 10pt;
  margin-left: 30px;
}
.article {
  margin-left: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
}
h2.pass {
  margin-top: 14px;
  margin-bottom: -2px;
}
form.ps {
  margin-left: 25px;
  margin-top: 0px;
  padding-top: 0px;
  margin-bottom: 20px;
}
.mg {
  margin-top: 10px;
  margin-bottom: 20px;
}
h1 {
  margin-left: 32px;
}
label {
  margin-top: 1px;
  padding-left: 4px;
}
.landscape {
  display: flex;
  flex-direction: row;
  width: 600px;
}
p {
  color: red;
  font-size: 9pt;
}

.input {
  width: 180px;
}
.custom{
  background: #942222;
  border: 1pt solid #942222
}
.custom:hover{
  background:#af4d4d;
  border: 1pt solid #af4d4d
}
#inputName{
  height: 20pt;
  font-size: 12pt
}
#inputEmail{
  height: 20pt;
  font-size: 12pt
}

</style>
