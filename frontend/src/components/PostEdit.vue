<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header"> Editer votre post </slot>
        <button type="button" class="btn-close" @click="close">x</button>
      </header>

      <section class="modal-body">
        <form
          @submit.prevent="handleSubmit(post.id, post.image)"
          method="post"
          enctype="multipart/form-data"
        >
          <input ref="title" type="text" v-model="title" />
          <input ref="content" type="text" v-model="content" />
          <img :src="post.image" alt="img" />
          <input
            type="file"
            placeholder="ta photo de profil"
            ref="file"
            @change="handleChange"
          />
          <button type="submit" @click="reloadPage">Publier</button>
        </form>
      </section>

      <button type="button" class="btn-green" @click="close">
        Close Modal
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Modal",
  props: ["post"],
  data(props) {
    return {
      title: props.post.title,
      content: props.post.content,
      image: props.post.image,
    };
  },

  // const handleChange = () => {
  //   console.log(this.$refs);
  //   const file = this.$refs.file.files[0];
  //   this.file = file;
  //   console.log(this.file);
  // };

  methods: {
    handleChange() {
      let file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file);
    },
    handleSubmit(id) {
      const myformData = new FormData();

      myformData.append("title", this.title);
      myformData.append("content", this.content);
      myformData.append("image", this.file);

      console.log(myformData.get("image"));

      const token = localStorage.getItem("token");

      axios

        .put("http://localhost:8082/api/posts/" + id, myformData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
          // this.close();
          // this.reloadPage();
        })
        .catch((error) => console.error(error.response));
    },
    close() {
      this.$emit("close");
    },
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
img {
  width: 7em;
}
</style>