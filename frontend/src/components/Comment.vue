<template>
  <div class="my-2">
    <div v-if="!toggle">
      <div class="card card-body">
        <p>
          {{ comment.comment }}
        </p>
      </div>

      <small class="float-left mb-3"
        >publié {{ timeFromNow(comment.updatedAt) }}</small
      >

      <div
        class="float-right mt-0 mb-3"
        v-if="comment.userId === this.$store.state.auth.user.id"
      >
        <div @click="toggleEditComment" class="btn btn-info btn-sm">
          Modifier
        </div>
        <div
          @click="deleteComment(comment.id)"
          class="btn btn-danger btn-sm ml-2"
        >
          Supprimer
        </div>
      </div>
    </div>

    <form class="form-group" v-if="toggle">
      <textarea
        name="editComment"
        cols="45"
        rows="2"
        class="form-control"
        required
        v-model="textEditComment"
        @change="emitComment"
      ></textarea>

      <div class="float-right mt-2 mb-3">
        <div @click="modifyComment(comment.id)" class="btn btn-info btn-sm">
          Modifier
        </div>
        <button
          @click="toggleEditComment"
          class="btn btn-secondary btn-sm ml-2"
        >
          Annuler
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import formatDateMixin from "../mixins/formatDateMixin.js";

export default {
  name: "Comment",
  props: ["comment", "deleteComment", "gifId", "modifyComment"],
  data() {
    return {
      toggle: false,
      textEditComment: this.comment.comment,
    };
  },
  mixins: [formatDateMixin],
  methods: {
    // Affiche soit le commentaire soit le formulaire pour modifier celui-ci
    toggleEditComment() {
      this.toggle = !this.toggle;
    },

    // Envoie le commentaire modifié au composant parent "CommentList.vue"
    emitComment() {
      this.$emit("edit-comment", { comment: this.textEditComment });
    },
  },
};
</script>

<style scoped>
.card {
  margin: 0 auto 0.5rem;
  padding: 0;
}
.card-body p {
  margin: 0;
  padding: 0.7rem 0.5rem;
  font-size: 1rem;
  line-height: 1.3rem;
  text-align: left;
  font-family: Helvetica;
}
</style>
