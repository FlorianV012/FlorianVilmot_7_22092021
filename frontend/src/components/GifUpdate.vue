<template>
  <div class="bloc-modale" v-if="activeModale">
    <div class="overlay" @click="toggleModale"></div>
    <div class="card card-container">
      <div class="btn-modale btn btn-danger" @click="toggleModale">X</div>
      <form @submit="gifPost">
        <div class="form-group">
          <label for="title">Titre</label>
          <input
            name="title"
            type="text"
            class="form-control"
            v-model="title"
            :placeholder="gifUnique.title"
          />
        </div>
        <div class="form-group">
          <label for="file">Fichier</label>
          <input
            name="file"
            type="file"
            id="file"
            ref="file"
            class="form-control-file"
            @change="handleFileUpload"
          />
        </div>

        <div class="form-group">
          <button class="btn btn-primary" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Publier</span>
          </button>
        </div>

        <div class="form-group">
          <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
          >
            {{ message }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import authHeader from "@/services/auth-header";

export default {
  name: "GifUpdate",
  props: ["toggleModale", "activeModale", "gifUnique"],
  data() {
    return {
      message: "",
      loading: false,
      title: "",
      FILE: null,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    handleFileUpload(event) {
      this.FILE = event.target.files[0];
    },

    gifPost() {
      this.loading = true;
      let id = this.gifUnique.id;
      let gifBody = {
        title: this.title,
        userId: this.currentUser.id,
      };
      if (gifBody.title == "") {
        gifBody.title = this.gifUnique.title;
      }

      let formData = new FormData();
      if (this.FILE !== null) {
        formData.append("image", this.FILE, this.FILE.name);
      } else {
        formData.append("image", "");
      }
      formData.append("gif", JSON.stringify(gifBody));

      axios
        .put(`http://localhost:3000/api/gif/${id}`, formData, {
          headers: authHeader(),
        })
        .then((res) => {
          console.log(res.message);
          this.message = res.message;
          this.successful = true;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err.message);
          this.message = err.message;
          this.successful = false;
          this.loading = false;
        });
      this.$router.push(`/gif/${id}`);
    },
  },
};
</script>

<style scoped>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 400px !important;
  padding: 40px;
  position: fixed;
  bottom: 40%;
}

.btn-modale {
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>