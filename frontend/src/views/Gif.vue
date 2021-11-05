<template>
  <div class="col-sm-6 mt-4 mx-auto">
    <div class="card">
      <img class="card-img-top" :src="gifUnique.gifUrl" />
      <div class="card-block">
        <h4 class="card-title">{{ gifUnique.title }}</h4>

        <div class="card-text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          reiciendis optio non fugiat voluptatibus veniam quidem quas, nemo
          eligendi nihil!
        </div>
      </div>
      <div class="card-footer">
        <small class="float-left">Last updated 3 mins ago</small>
        <button class="btn btn-secondary float-right btn-sm">show</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import authHeader from "@/services/auth-header";

export default {
  name: "Gif",
  data() {
    return {
      id: this.$route.params.id,
      gifUnique: [],
    };
  },
  mounted() {
    axios
      .get(`http://localhost:3000/api/gif/${this.id}`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res);
        this.gifUnique = res.data.gif;
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

.card-text {
  clear: both;
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.68);
}

.card-footer {
  font-size: 1rem;
  position: static;
  top: 0;
  left: 0;
  max-width: 100%;
  padding: 0.5rem 0.8rem;
  color: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
  background: #fff;
}
</style>