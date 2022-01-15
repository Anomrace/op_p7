<template>
  <section class="commentsForm">
    <h1>Form Comments</h1>
    <form @submit.prevent="handleSubmit(postID)" method="post">
      <input type="text" required placeholder="Titre" v-model="form.title" />
      <input
        type="text"
        required
        placeholder="Contenu"
        v-model="form.content"
      />
      <button type="submit" @click="reloadPage">Publier</button>
    </form>
  </section>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
export default {
  name: "CommentsForm",
  props: ["postID"],
  setup() {
    let form = reactive({
      title: "",
      content: "",
    });

    let handleSubmit = async (postID) => {
      form.postID = postID;
      const token = localStorage.getItem("token");
      await axios
        .post("http://localhost:8082/api/comments", form, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch((error) => console.error(error.response.data));
    };

    return {
      form,
      handleSubmit,
    };
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.content form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>