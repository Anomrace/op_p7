<template>
  <section class="content">
    <form
      @submit.prevent="handleSubmit"
      method="post"
      enctype="multipart/form-data"
    >
      <input type="text" required placeholder="Titre" v-model="title" />
      <input type="text" required placeholder="Contenu" v-model="content" />
      <input
        type="file"
        placeholder="ta photo de profil"
        ref="file"
        @change="handleChange"
      />
      <button type="submit" @click="reloadPage">Publier</button>
    </form>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "PostForm",
  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    handleChange() {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },

    handleSubmit() {
      console.log(this.title, this.content);
      const myformData = new FormData();
      myformData.append("title", this.title);
      myformData.append("content", this.content);
      myformData.append("image", this.file);

      console.log(myformData.get("image"));

      const token = localStorage.getItem("token");

      axios
        .post("http://localhost:8082/api/posts", myformData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch((error) => console.error(error.response));
    },
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