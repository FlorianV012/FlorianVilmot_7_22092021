<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg">
      <a href="/home" class="navbar-brand">
        <img
          id="logo"
          :src="require('./assets/logos/icon-left-font-resize.png')"
          alt="logo Groupomania"
        />
      </a>

      <div class="navbar-nav mr-auto">
        <router-link to="/home" class="nav-link">Home</router-link>
        <router-link to="/gif" class="nav-link">Ajouter une image</router-link>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <router-link to="/signup" class="nav-link">Sign Up</router-link>
        <router-link to="/login" class="nav-link">Login</router-link>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <router-link to="/profile" class="nav-link"
          >{{ currentUser.username }}
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
html {
  font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#logo {
  max-width: 300px;
}
.nav-link {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2c3e50;
}

.nav-link:hover {
  color: #2c3e50;
  cursor: pointer;
}

.nav-link.router-link-exact-active {
  color: #fd2d01;
}

.card {
  background-color: #f7f7f7;
  padding: 1.25rem 1.6rem 30px;
  margin: 0 auto 1.6rem;
  margin-top: 3rem;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>
