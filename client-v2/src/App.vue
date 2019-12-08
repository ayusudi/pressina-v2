<template>
  <div class="beforeSign">
      <div v-if="!login">
        <NavHome @doneSignIn="passSign" @doneSignG="passSign" />
        <Home v-if="page==='home'"></Home>
      </div>
      <div v-else>
        <NavUser @signOut="falseSign" @changeToGetAll="toGetAll" @changeToWrite="toWrite" />
        <!-- </NavUser> -->
        <div class="wrapper">
          <div class="background-left">
            <LeftBar @changeToGetAll="toGetAll" @changeToWrite="toWrite" @changeToSetting="toSetting" >
            <img :src="imageuser" alt="Avatar" height="168px" width="168px" />
            <h2>{{nameuser}}</h2>
            </LeftBar>
          </div>
          <div class="timeline">
    <transition name="slide-fade">
            <GetAll v-if="page==='getall'"  @changeToEdit="toEdit" @changeToRead="toRead"  @getNewList="toGetAll" @userinfo="userinfo"/>
            <Write v-else-if="page==='write'" @backToHome="toGetAll"></Write>
            <Edit v-else-if="page==='edit'" v-bind:id="editThis" @changeToGetAll="toGetAll" ></Edit>
            <Read v-else-if="page==='read'" v-bind:readOne="readOne" @changeToGetAll="toGetAll"></Read>
            <EditProfile v-else-if="page==='editprofile'" @updateProfile="toGetAll" :propname="nameuser" :propemail="emailuser" :propimg="imageuser"></EditProfile>
    </transition>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Home from '../src/components/Home.vue'
import NavHome from '../src/components/Navbar.vue'
import NavUser from '../src/components/NavUser.vue'
import LeftBar from '../src/components/LeftBar.vue'
import GetAll from '../src/components/GetAll.vue'
import Write from '../src/components/Write.vue'
import Edit from '../src/components/Edit.vue'
import Read from '../src/components/Read.vue'
import EditProfile from '../src/components/EditProfile.vue'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      baseUrl: 'http://pressina-server.ayusudi.com',
      login: false,
      page: 'home',
      editThis: '',
      readOne: '',
      imageuser: '',
      nameuser: '',
      emailuser: ''
    }
  },
  components: {
    NavHome,
    Home,
    NavUser,
    LeftBar,
    GetAll,
    Write,
    Edit,
    Read,
    EditProfile
  },
  methods: {
    passSign () {
      this.login = true
      this.toGetAll()
    },
    falseSign () {
      this.nameuser = ''
      this.imageuser = ''
      this.login = false
      this.page = 'home'
      Swal.fire('See you again', 'Success to log out', 'success')
    },
    toGetAll () {
      this.page = 'getall'
    },
    toWrite (id) {
      this.page = 'write'
      this.editThis = id
    },
    toEdit (input) {
      this.editThis = input
      this.page = 'edit'
    },
    toRead (input) {
      this.readOne = input
      this.page = 'read'
    },
    toSetting () {
      this.page = 'editprofile'
    },
    userinfo (payload) {
      this.nameuser = payload.name
      this.imageuser = payload.image
      this.emailuser = payload.email
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.login = true
      // this.page = "getall";
      this.toGetAll()
    } else {
      this.login = false
      this.page = 'home'
      this.nameuser = ''
      this.imageuser = ''
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.beforeSign {
  height: 100vh;
  width: 100vw;
}
.afterSign {
  height: 100vh;
  width: 100vw;
}
.wrapper {
  min-height: calc(100vh - 79px);
  color: rgb(46, 29, 29);
  display: grid;
  grid-template-columns: 1.5fr 5.5fr;
  grid-auto-rows: minmax(50px, auto);
}
.timeline {
  background: url("./assets/image/white.png");
}

.background-left {
  background: #284663;
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
.slide-fade-enter-active {
  animation: zoomInDown 1s;
}
.slide-fade-leave-active {
  animation: zoomInDown 0.6s reverse;
}

</style>
