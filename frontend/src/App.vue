<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand">
      <a href="/" class="navbar-brand">
        <img
          id="logo"
          :src="require('./assets/logos/icon-left-font-resize.png')"
          alt="logo Groupomania"
        />
      </a>
      <div class="navbar-nav mr-auto">
        <router-link to="/home" class="nav-link">Home</router-link>
        <router-link v-if="currentUser" to="/user" class="nav-link"
          >User</router-link
        >
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <router-link to="/signup" class="nav-link">Sign Up</router-link>
        <router-link to="/login" class="nav-link">Login</router-link>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <router-link to="/profile" class="nav-link">{{ currentUser.username }}
        </router-link>

        <a class="nav-link" @click.prevent="logOut">LogOut</a>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },    
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#logo {
  max-width: 300px;
}
.nav-link{
  font-size: 20px;
  font-weight: bold;
    color: #2c3e50;
}

.nav-link.router-link-exact-active {
      color: #FD2D01;}
</style>
