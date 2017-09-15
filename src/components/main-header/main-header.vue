<template>
  <header class="main-header">
    <div class="header-logo">
      <a class="header-link" href="#">Teamy</a>
      <span class="fly fly-a nav_animation"></span>
      <span class="fly fly-b nav_animation"></span>
      <span class="fly fly-c nav_animation"></span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'main-header'
}
</script>

<style lang="scss">
.main-header {
  background-color: $black-2;
  height: $header-height;
  max-height: 100px;

  .header-logo {
    position: relative;
    display: inline-block;
    height: 100%;
    padding: 15px 20px;
    background-color: $main-black;
  }

  .header-link {
    display: block;
    color: $white;
  }
  // TODO create separate component for logo
  .nav_animation {
    position:absolute;
    top:0px;
    left:-2px;
    height:100%;
    width:100%;
    opacity:0;
  }

  .fly {
    background-image:  linear-gradient(90deg, #2187e7 25%, #a0eaff);
    display:block;
    position:absolute;
    top:0;
    left:1px;
    z-index:100;
    width: 3px;
    height: 3px;
    border-radius: 100%;
    box-shadow: 0 0 5px #00c6ff;
  }

  .fly-a {
    animation: particle-a 7s linear 0s infinite ;
    
  }	
  .fly-b {
    animation: particle-b 6s linear 0s infinite ;
  }	
  .fly-c {
    animation: particle-c 4s linear 0s infinite ;
  }
}
</style>

