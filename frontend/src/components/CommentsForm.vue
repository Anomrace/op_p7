<template>
  <section class="comments-form">
    <form @submit.prevent="handleSubmit(postID)" method="post">
      <input
        type="text"
        required
        placeholder="votre commentaire"
        v-model="form.content"
      />
      <!-- <button type="submit" @click="reloadPage">Publier</button> -->
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
      content: "",
    });

    let handleSubmit = async (postID) => {
      form.postID = postID;
      const token = localStorage.getItem("token");
      await axios
        .post("http://localhost:3000/api/comments", form, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(function (response) {
          console.log(response);
          window.location.reload();
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
.comments-form {
  border-radius: 20px;
  padding: 1em;
  /* box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2); */
}
</style>