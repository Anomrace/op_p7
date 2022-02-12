<template>
  <nav class="navbar">
    <img src="@/assets/images/icon.svg" alt="" />
    <ul>
      <li>
        <img :src="userImage" />
        <router-link class="username" to="/profile">{{ userName }}</router-link>
      </li>
      <li>
        <router-link to="/home"><fa icon="house" /> </router-link>
      </li>
      <li v-if="userStatus === '1'">
        <router-link to="/administration"><fa icon="gear" /></router-link>
      </li>
      <li>
        <router-link to="/" @click="deleteStorage()"
          ><fa icon="arrow-right-from-bracket"
        /></router-link>
      </li>
    </ul>
  </nav>
</template>


<script>
import axios from "axios";
export default {
  name: "Nav",
  data() {
    return {
      userImage: "",
      userName: "",
      userStatus: localStorage.getItem("userStatus"),
    };
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
  methods: {
    deleteStorage() {
      localStorage.clear();
    },
  },
};
</script>

<style scoped>
img {
  width: 2em;
  height: 2em;
}

nav {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}
</style>