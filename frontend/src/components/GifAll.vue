<template>
  <div class="col-md-6 mt-4 mx-auto">
    <div v-if="allGif.length < 1">
      <h3>Aucun contenu n’a été publié pour le moment.</h3>
    </div>
    <div class="card" v-for="(gif, index) in allGif" :key="index">
      <router-link
        style="text-decoration: none; color: inherit"
        :to="`/gif/${gif.id}`"
      >
        <img class="card-img-top" :src="gif.gifUrl" alt="" />
        <div class="card-block">
          <h4 class="card-title">{{ gif.title }}</h4>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import authHeader from "@/services/auth-header";

export default {
  name: "GifAlll",
  data() {
    return {
      allGif: [],
    };
  },
  beforeMount() {
    // Récupère toutes les publications et les affiches par id décroisante
    axios
      .get("http://localhost:3000/api/gif", { headers: authHeader() })
      .then((res) => {
        for (const gifPost of res.data) {
          this.allGif.push(gifPost);
        }
        this.allGif.reverse();
      });
  },
};
</script>

<style>
</style>