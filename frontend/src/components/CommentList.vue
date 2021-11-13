<template>
  <div class="container">
    <form class="form-group">
      <textarea
        name="postComment"
        cols="45"
        rows="3"
        class="form-control"
        required
        placeholder="Publier un commentaire"
        v-model="postComment"
      ></textarea>
      <button
        @click="commentGif"
        class="btn btn-secondary float-right btn-sm mb-3 mt-2"
      >
        Publier
      </button>
    </form>

    <Comment
      ref="commentComponent"
      @edit-comment="getEditComment"
      v-for="comment in allComment"
      :key="comment.id"
      :comment="comment"
      :deleteComment="deleteComment"
      :gifId="gifId"
      :currentUser="currentUser"
      :modifyComment="modifyComment"
    ></Comment>
  </div>
</template>

<script>
import axios from "axios";
import authHeader from "@/services/auth-header";

import Comment from "@/components/Comment.vue";

export default {
  name: "CommentList",
  components: {
    Comment,
  },
  data() {
    return {
      gifId: this.$route.params.id,
      postComment: "",
      allComment: [],
      editComment: "",
      toggle: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    getEditComment(payload) {
      this.editComment = payload.comment;
    },

    commentGif() {
      let commentBody = {
        userId: this.currentUser.id,
        comment: this.postComment,
      };

      axios
        .post(
          `http://localhost:3000/api/gif/${this.gifId}/comment`,
          JSON.stringify(commentBody),
          {
            headers: authHeader(),
          }
        )
        .then((res) => {
          console.log(res.data);
          this.postComment = "";
        });
    },
    getComment() {
      axios
        .get(`http://localhost:3000/api/gif/${this.gifId}/comment`, {
          headers: authHeader(),
        })
        .then((res) => {
          console.log(res.data);
          this.allComment = res.data;
        });
    },
    modifyComment(commentId) {
      let commentBody = {
        userId: this.currentUser.id,
        comment: this.editComment,
      };

      axios
        .put(
          `http://localhost:3000/api/gif/${this.gifId}/comment/${commentId}`,
          JSON.stringify(commentBody),
          {
            headers: authHeader(),
          }
        )
        .then((res) => {
          console.log(res.data);
          this.getComment();
          this.$refs.commentComponent.toggleEditComment();
        });
    },
    deleteComment(commentId) {
      axios
        .delete(
          `http://localhost:3000/api/gif/${this.gifId}/comment/${commentId}`,
          {
            headers: authHeader(),
          }
        )
        .then((res) => {
          console.log(res.data);
          this.getComment();
        });
    },
  },
  beforeMount() {
    this.getComment();
  },
};
</script>

<style scoped>
.card-body p {
  font-size: 1.1rem;
  line-height: 1.3rem;
  text-align: left;
  font-family: Helvetica;
}
</style>
