<template>
  <div class="col-md-12">
    <div class="card card-container">
      <form @submit="gifPost">
        <div class="form-group">
          <label for="title">Titre</label>
          <input
            name="title"
            type="text"
            class="form-control"
            v-model="title"
            required
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
            required
          />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
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
  name: "GifPost",
  data() {
    return {
      message: "",
      successful: false,
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

    gifPostReq: async function () {
      this.loading = true;

      let gifBody = {
        title: this.title,
        userId: this.currentUser.id,
      };

      let formData = new FormData();
      formData.append("image", this.FILE, this.FILE.name);
      formData.append("gif", JSON.stringify(gifBody));

      await axios
        .post("http://localhost:3000/api/gif", formData, {
          headers: authHeader(),
        })
        .then((res) => {
          this.message = res.data.message;
          this.successful = true;
          this.loading = false;
        })
        .catch((err) => {
          this.message = err.data.message;
          this.successful = false;
          this.loading = false;
        });
    },

    // Publie l’image
    gifPost() {
      this.gifPostReq();
      // this.$router.push("/home")
    },
  },
};
</script>

<style>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 400px !important;
  padding: 40px;
}

.error-feedback {
  color: red;
}
</style>