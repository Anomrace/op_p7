<template>
  <section class="postform">
    <div class="postform-header">
      <img :src="userImage" alt="" />
      <h2>Quoi de neuf, {{ userName }} ?</h2>
    </div>
    <br />
    <form
      @submit.prevent="handleSubmit"
      method="post"
      enctype="multipart/form-data"
    >
      <input type="text" required placeholder="Titre" v-model="title" />
      <input
        class="input-contenu"
        type="text"
        required
        placeholder="Contenu"
        v-model="content"
      />

      <input
        id="vraiBouton"
        type="file"
        placeholder="ta photo de profil"
        ref="file"
        @change="handleChange"
        hidden
      />
      <br /><br />
      <label for="vraiBouton">Ajouter une image</label>
      <br /><br />
      <span>{{ filename }}</span>
      <br />
      <br />

      <button type="submit">Publier</button>
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
      userName: localStorage.getItem("username"),
      userImage: localStorage.getItem("userImage"),
      filename: "",
    };
  },
  methods: {
    handleChange() {
      const file = this.$refs.file.files[0];
      this.file = file;
      this.filename = this.$refs.file.files[0].name;
      // let fichierChoisi = this.file.name;
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
      for (var pair of myformData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      axios
        .post("http://localhost:3000/api/posts", myformData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => console.error(error.response));
    },
    reloadPage() {
      window.location.reload();
    },
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/auth/findUser", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.userImage = response.data.image;
        this.userName = response.data.username;
      })
      .catch((error) => console.error(error.response.data));
  },
};
</script>

<style scoped>
.postform {
  background: white;
  padding: 1em;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}

.input-contenu {
  padding-bottom: 4em;
}

img {
  width: 2em;
  height: 2em;
  border-radius: 20px;
}

.postform-header {
  display: flex;
  justify-content: space-around;
}

h2 {
  font-size: 1.2em;
}
</style>