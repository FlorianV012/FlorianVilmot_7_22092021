<template>
  <div class="col-md-6 mt-4 mx-auto">
    <div class="card">
      <img class="card-img-top" :src="gifUnique.gifUrl" />
      <div class="card-block">
        <h4 class="card-title">{{ gifUnique.title }}</h4>

        <div class="card-body">
          <p class="float-left">
            <span class="icon m-2" @click="likeGif">
              {{ like }}
              <font-awesome-icon
                v-if="userLike"
                :icon="['fas', 'thumbs-up']"
                style="color: green; vertical-align: baseline"
              /><font-awesome-icon
                v-else
                :icon="['far', 'thumbs-up']"
                style="vertical-align: baseline"
              />
            </span>
            <span class="icon m-2" @click="dislikeGif">
              {{ dislike }}
              <font-awesome-icon
                v-if="userDislike"
                :icon="['fas', 'thumbs-down']"
                style="color: red; vertical-align: middle" />
              <font-awesome-icon
                v-else
                :icon="['far', 'thumbs-down']"
                style="vertical-align: middle"
            /></span>
          </p>
          <div class="float-right" v-if="isGifOwner">
            <div @click="toggleModaleUpdate" class="btn btn-info">Modifier</div>
            <div @click="toggleModaleSuppr" class="btn btn-danger ml-2">
              Supprimer
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <CommentList></CommentList>
      </div>
    </div>

    <GifUpdate
      :activeModaleUpdate="activeModaleUpdate"
      :toggleModaleUpdate="toggleModaleUpdate"
      :activeModaleSuppr="activeModaleSuppr"
      :toggleModaleSuppr="toggleModaleSuppr"
      :gifUnique="gifUnique"
      :gifId="id"
    ></GifUpdate>
  </div>
</template>

<script>
import axios from "axios";
import authHeader from "@/services/auth-header";

import GifUpdate from "@/components/GifUpdate.vue";
import CommentList from "@/components/CommentList.vue";

export default {
  name: "Gif",
  data() {
    return {
      id: this.$route.params.id,
      gifUnique: [],
      like: 0,
      dislike: 0,
      userLike: false,
      userDislike: false,
      isGifOwner: false,
      activeModaleUpdate: false,
      activeModaleSuppr: false,
    };
  },
  components: {
    GifUpdate,
    CommentList,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    // Vérifie si l’utilisateur est celui qui a publié l’image
    gifOwner() {
      const currentUser = this.$store.state.auth.user.id;
      if (this.gifUnique.userId === currentUser) {
        return (this.isGifOwner = true);
      }
    },

    // Active le champ pour modifier la publication
    toggleModaleUpdate() {
      this.activeModaleUpdate = !this.activeModaleUpdate;
    },

    // Active le champ pour supprimer la publication
    toggleModaleSuppr() {
      this.activeModaleSuppr = !this.activeModaleSuppr;
    },

    // Like la publication
    likeGif() {
      let body = {
        userId: this.currentUser.id,
      };
      axios
        .post(
          `http://localhost:3000/api/gif/${this.id}/like`,
          JSON.stringify(body),
          {
            headers: authHeader(),
          }
        )
        .then((res) => {
          console.log(res.data);
          this.likeCounter();
        });
    },

    // Dislike la publication
    dislikeGif() {
      let body = {
        userId: this.currentUser.id,
      };
      axios
        .post(
          `http://localhost:3000/api/gif/${this.id}/dislike`,
          JSON.stringify(body),
          {
            headers: authHeader(),
          }
        )
        .then((res) => {
          console.log(res.data);
          this.likeCounter();
        });
    },

    // Compte le nombre de like et dislike de la publication, vérifie si l’utilisateur a aimé ou non la publication, si oui affiche un pouce rouge ou vert
    likeCounter() {
      axios
        .get(`http://localhost:3000/api/gif/${this.id}/allLike`, {
          headers: authHeader(),
        })
        .then((res) => {
          const arrayLike = res.data;
          this.like = 0;
          this.dislike = 0;
          for (let i = 0; i < arrayLike.length; i++) {
            if (arrayLike[i].like === false) {
              this.dislike++;
            } else {
              this.like++;
            }
          }
          this.userLike = false;
          this.userDislike = false;
          const userLike = arrayLike.find(
            (userId) => userId.userId === this.currentUser.id
          );
          if (userLike && userLike.like === true) {
            return (this.userLike = true);
          } else if (userLike && userLike.like === false) {
            return (this.userDislike = true);
          }
        });
    },
  },
  mounted() {
    // Récupère les propriétés de la publication
    axios
      .get(`http://localhost:3000/api/gif/${this.id}`, {
        headers: authHeader(),
      })
      .then((res) => {
        this.gifUnique = res.data.gif;
        const currentUser = this.$store.state.auth.user.id;
        // console.log(this.gifUnique);
        this.likeCounter();

        if (this.gifUnique.userId == currentUser) {
          return (this.isGifOwner = true);
        }
      })
      .catch(() => {
        this.$router.push("/home");
      });
  },
};
</script>

<style>
.card {
  font-size: 1rem;
  overflow: hidden;
  padding: 0;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
}

.card-block {
  font-size: 1rem;
  position: relative;
  margin: 0;
  padding: 1rem;
  border: none;
  border-top: 1px solid rgba(34, 36, 38, 0.1);
  box-shadow: none;
}

.card-img-top {
  display: block;
  width: 100%;
  height: auto;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.25rem;
}

.card-body {
  clear: both;
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.68);
}
.card-body p {
  font-size: 1.8rem;
  line-height: 1.8rem;
  cursor: pointer;
}

.card-footer {
  font-size: 1rem;
  position: static;
  top: 0;
  left: 0;
  max-width: 100%;
  padding: 0.5rem 0.5rem;
  color: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
  background: #fff;
}
</style>