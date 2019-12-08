<template>
  <div>
    <div class="navbar">
        <div class="logo">
            <img src="../assets/image/clip.png" alt="" srcset="" height="150px" width="225px">
        </div>
        <div class="acc">
            <el-button type="text" @click="outerVisible = true">
                <h3>SIGN IN</h3></el-button>
            <el-button type="text" @click="dialogTableVisible = true">
                <h3>REGISTER</h3></el-button>
        </div>
    </div>

    <!-- MODAL REGISTER -->
    <el-dialog :visible.sync="dialogTableVisible" width="450px">
        <form action class="formRegister" @submit.prevent="registMe">
            <h2>Register</h2>
            <br>
            <label for>Name :</label>
            <input type="text" name="nameRegist" id="nameRegist" v-model="registerName" />
            <label for>Email :</label>
            <input type="email" name="emailRegist" id="emailRegist" v-model="registerEmail" />
            <label for>Password</label>
            <div style="width:350px;">

                <el-input show-password name="passwordRegist" id="passwordRegister" v-model="registerPassword"></el-input>
            </div>
            <br>
            <br>
            <el-button type="success" round @click="registMe">Submit</el-button>
        </form>
        <br>
        <div style="margin: 0 auto">

            <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google <i class="fab fa-google" /></button>
          </div>
    </el-dialog>

    <!-- MODAL SIGN IN -->
    <el-dialog :visible.sync="outerVisible"  width="450px">
        <form action class="formSign" @submit.prevent="signinMe">
              <h2>Sign In</h2>
              <label for>Email :</label>
              <input type="email" v-model="signEmail" />
              <label for>Password</label>
              <div style="width:350px">

            <el-input v-model="signPassword" show-password ></el-input>
              </div>
              <br><br>
            <el-button type="success" round @click="signinMe">Submit</el-button>
            <br>
              <!-- <div id="google-signin-button" class="g-signin2" data-onsuccess="onSignIn"></div> -->

            </form>
              <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google <i class="fab fa-google" /></button>

      <!-- FORGOT PASSWORD -->
        <el-dialog width="30%" :visible.sync="innerVisible" append-to-body >
        <h2 class="pass">Forgot Password</h2>
        <br>
          <div v-if="gotCode">
            <div v-if="correctCode" class="chg height-fp">
              <form @submit.prevent="changeToDefault" class="ps">
                  <br>
                <label for="password" style="padding-top:8px">New Password</label>
                <input type="password" name="password" id="inputPassword" v-model="newPass" class="input"/>
                <p>{{label}}</p>
                <br>
                <label for="confrim">Confrim Password</label>
                <input type="password" name="match" id="match" v-model="confrimNewPass" class="input"/>
                  <p>{{labeldown}}</p>
                  <div style="">
                    <br><br>
                    <el-button type="success" round @click="changeToDefault">Confrim</el-button>
                  </div>
              </form>
            </div>

            <!-- CEK CODE INPUT FROM EMAIL -->
            <div v-else class="height-fp">
              <form @submit.prevent="cekCode" class="ps">
                <br />
                <h3>We Send Code To</h3>
                <h4>{{emailcodepass}}</h4>
                <br /><br>
                <input type="text" v-model="inputCode" placeholder="Code" />
                <br/><br>
                <el-button type="success" round @click="cekCode">Submit</el-button>
              </form>
            </div>
          </div>

          <!-- EDIT PASS -->
          <div v-else class="height-fp">
            <form @submit.prevent="formPass" class="flexin">
              <label>Submit your email</label>
              <input type="email" name="emailpass" id="emailpass" v-model="emailcodepass">
              <br><br>
              <el-button type="success" round @click="formPass">Submit</el-button>
            </form>
          </div>
      </el-dialog>

      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">Cancel</el-button>
        <el-button type="primary" @click="innerVisible = true">Forgot password?</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import GoogleSignInButton from 'vue-google-signin-button-directive'
import toastr from 'toastr'
let gapi
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
  name: 'NavHome',
  directives: {
    GoogleSignInButton
  },
  component: {
    GoogleSignInButton
  },
  data () {
    return {
      outerVisible: false,
      innerVisible: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '100px',
      registerName: '',
      registerEmail: '',
      registerPassword: '',
      signEmail: '',
      signPassword: '',
      baseUrl: 'http://pressina-server.ayusudi.com',
      clientId: '1019659831406-3q54k18jqonijucsvv6t93fjhfp1mi2b.apps.googleusercontent.com',
      gotCode: false,
      correctCode: false,
      label: '',
      labeldown: '',
      legalCode: '',
      confrimNewPass: '',
      inputCode: '',
      newPass: '',
      emailcodepass: ''
    }
  },
  mounted () {
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
  },
  methods: {
    OnGoogleAuthSuccess (idToken) {
      axios({
        method: 'POST',
        url: this.baseUrl + '/users/signGoogle',
        data: {
          googleToken: idToken
        }
      })
        .then(data => {
          localStorage.setItem('token', data.data.token)
          this.$emit('doneSignG')
        })
        .catch(err => {
          console.log(err)
        })
    },

    OnGoogleAuthFail (error) {
      console.log(error)
    },

    signinMe () {
      let email = this.signEmail
      let password = this.signPassword
      axios({
        method: 'POST',
        url: this.baseUrl + '/users/login',
        data: {
          email,
          password
        }
      })
        .then(response => {
          localStorage.setItem('token', response.data.token)
          this.$emit('doneSignIn')
        })
        .catch(err => {
          let error = err.response.data.errMsg
          toastr.error(error).css({
            width: '500px',
            'max-width': '600px',
            height: '18vh',
            'font-size': '28px',
            display: 'flex',
            'align-items': 'center'
          })
        })
        .finally(() => {
          this.clearInput()
        })
    },
    registMe () {
      let name = this.registerName
      let email = this.registerEmail
      let password = this.registerPassword
      axios({
        method: 'POST',
        url: this.baseUrl + '/users/create',
        data: {
          name,
          email,
          password
        }
      })
        .then(response => {
          toastr.success('Success create an account').css({
            width: '500px',
            'max-width': '600px',
            height: '18vh',
            'font-size': '28px',
            display: 'flex',
            'align-items': 'center'
          })
        })
        .catch(err => {
          let error = err.response.data.errMsg.join('<br>')
          toastr.error(error).css({
            width: '500px',
            'max-width': '600px',
            height: '18vh',
            'font-size': '28px',
            display: 'flex',
            'align-items': 'center'
          })
        })
        .finally(() => {
          this.clearInput()
        })
    },
    clearInput () {
      this.registerName = ''
      this.registerEmail = ''
      this.registerPassword = ''
      this.signEmail = ''
      this.signPassword = ''
      this.label = ''
      this.labeldown = ''
      this.legalCode = ''
      this.confrimNewPass = ''
      this.inputCode = ''
      this.newPass = ''
      this.emailcodepass = ''
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
        this.innerVisible = false
      }
    },
    changePass () {
      axios({
        method: 'patch',
        url: `${this.baseUrl}/users/forgotps`,
        data: {
          email: this.emailcodepass,
          password: this.newPass
        }
      })
        .then(({ data }) => {
          this.newPass = ''
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.clearInput()
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
          email: this.emailcodepass
        }
      })
        .then(({ data }) => {
        })
        .catch(err => {
          this.gotCode = false
          this.correctCode = false
          let errors = err.response.data
          console.log(errors)
        })
    }
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
    }
  }
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Oswald|Poppins|Raleway|Roboto&display=swap");
* {
  margin: 0;
  padding: 0;
}
.navbar {
  display: flex;
  align-items: center;
  background: rgb(255, 193, 21);
  overflow: hidden;
  height: 9vh;
  width: 100vw;
}

.logo {
  align-self: flex-start;
  margin-left: 20%;
  height: 150px;
  width: 150px;
  position: absolute;
  z-index: 999;
}

h3 {
  font-size: 28px;
  margin-right: 25px;
  color: white;
  font-family: "Oswald", sans-serif;
}
h3:hover {
  color: #205fa7;
}
h2 {
  font-family: "Poppins", sans-serif;
  font-size: 30px;
  color: rgb(58, 58, 58);
}

.dropdown {
  float: right;
  overflow: hidden;
}

.dropdown .dropbtn {
  height: 8vh;
  font-size: 28px;
  border: none;
  outline: none;
  color: white;
  background-color: inherit;
  font-family: inherit;
  margin-right: 20px;
}

input {
  font-size: 18px;
  width: 83%;
  height: 3.5vh;
  margin-top: 1px;
  border: rgb(214, 214, 214) solid 0.3pt;
}

label {
  margin-top: 8px;
  font-size: 18px;
  font-family: "Poppins", sans-serif;
}

.formSign {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.formRegister {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.google-signin-button {
  color: rgb(0, 0, 0);
  background-color: rgb(255, 187, 0);
  height: 45px;
  font-size: 14px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 15px;
  margin-left: 32px;
}

.buttonGoogle p {
  margin-top: 12px;
  margin-left: 10px;
  font-size: 13pt;
}

.buttonGoogle {
  margin-left: 10%;
  color: aliceblue;
  align-self: flex-start;
  background: rgb(15, 15, 48);
  height: 50px;
  width: 250px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 0;
  margin-bottom: 55px;
}

.height-fp {
  height: 290px !important;
}
div.g-signin2 {
  align-self: flex-start;
  min-height: 60px;
  margin-left: 45px;
}

.flexin {
  display: flex;
  flex-direction: column;
}

.acc {
  width: 85vw;
  display: flex;
  justify-content: flex-end;
}
</style>
