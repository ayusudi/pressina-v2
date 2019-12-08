<template>
    <div class="background-curve">

      <div class="aboutus">
        <h1>PRESSINA</h1>
        <br>
        <h2> <b> KEEP NOTED WITHOUT PAPER <br> MEANS SAVE EARTH </b></h2>
      </div>
      <img src="../assets/image/logoo.png" alt="" width="510px" height="510px">
      <div class="footer">
      <div class="minibox">
        <div class="boxya" style="background-color:#135fb5">
          <div class="icon" style="background-color:#1156A6">
            <i class="far fa-lightbulb fa-2x"></i>
          </div>
          <p>INCREASE CREATIVITY</p>
        </div>
        <div class="boxya" style="background-color:#1056a7">
          <div class="icon" style="background-color:#0c4d97">
            <i class="fas fa-book fa-2x"></i>
          </div>
          <p>TIDY NOTE</p>
        </div>
        <div class="boxya" style="background-color:#0c4d97">
          <div class="icon" style="background-color:#135fb5">
            <i class="fas fa-globe-asia fa-2x"></i>
          </div>
          <p>SAVE EARTH</p>
        </div>
      </div>

      </div>
    </div>

</template>

<script>
export default {
  name: 'Home',
  data () {
    return {}
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Oswald|Poppins|Raleway|Roboto&display=swap');
body{
  background: url("../assets/image/white.png") !important
}

img.undraw{
  align-self: flex-start;
  margin-top: 5%;
  margin-left: 5%;
  position: absolute;
  height: 70vh;
}
img.curve{
  width: 90vw;
  height: 80vh;
}
p{
  margin-left: 10px;
  color: azure;
  font-family: 'Oswald', sans-serif;
}
.aboutus{
  margin: 10%;
  left: 10%;
  position: absolute;
  align-self: flex-start;
  animation: reveal 2s forwards;
}

h1{
  color: #114F94;
  font-family: 'Oswald', sans-serif;
  font-size: 68px;
}

h2{
  font-family: 'Oswald', sans-serif;
  font-weight: bolder;
  font-size: 30px;
  color: rgb(247, 146, 14)
}
i{
  color: #fac61b
}
@keyframes reveal {
  from {
    clip-path: inset(0 0 0 100%);
    }
  to {
    clip-path: inset(0 0 0 0);
  }
}

.background-curve{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100vw;
  background: url("../assets/image/white1.png");
  background-position-x: 70%
}
.footer{
  margin-top: 85px;
  align-self: flex-end;
  height: 18vh;
  width: 100vw;
  background: #0e4686
}
.minibox{
  align-self: flex-end;
  height: 17vh;
  width: 900px;
  background:  #0c4d97;
  margin-top: -50px;
  margin-left: 20%;
  display: flex;

}
img{
  margin-right: 18%
}
.boxya{
  width: 300px;
  height: 17vh;
  display: flex;
  align-items: center
}
.icon{
  margin-left: 25px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: aliceblue
}
</style>
