<template>
  <div class="navbar-dash">
    <div class="logo">
      <div class="reader" id="icon-bar" @click="backToHome">Pressina</div>
      <div class="logout" id="icon-bar" @click="signOutMe">Logout</div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
let gapi
export default {
  name: 'NavUser',
  data () {
    return {}
  },
  methods: {
    signOutMe () {
      Swal.fire({
        title: 'Are you sure to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Log Out'
      }).then(result => {
        if (result.value) {
          localStorage.clear()
          if (gapi.auth2) {
            var auth2 = gapi.auth2.getAuthInstance()
            auth2.signOut().then(function () {
            })
            this.$emit('signOut')
          } else {
            this.$emit('signOut')
          }
        } else {
          Swal.fire('Cancel', 'You still online here..', 'success')
        }
      })
    },
    backToHome () {
      this.$emit('changeToGetAll')
    },
    getWriteForm () {
      this.$emit('changeToWrite')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Oswald|Poppins|Raleway|Roboto&display=swap');
* {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  font-weight:normal;
}

.navbar-dash {
  width: 100%;
  height: 10vh;
  position: sticky;
  top: 0;
  background: #fdb838;
  font-size: 3vh;
  color: #112c46;
  z-index: 10;
}

.logo {
  box-shadow: 0 -10px 10px -10px black inset;
  padding-left: 18px;
  background: #E95E08;
  font-family: 'Oswald', sans-serif;
  height: 62px;
  display: flex;
  justify-content: space-between;
}

#icon-bar {
  margin-right: 2.5%;
  margin-top: 2px;
  font-size: 35px;
  font-family: 'Poppins', sans-serif;
  font-weight: bolder;
}

#icon-bar:hover {
  color: rgb(247, 213, 26);
  cursor: pointer;
}
</style>>
