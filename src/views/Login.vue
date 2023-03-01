<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    ...mapActions(['login']),
    async submitForm() {
      try {
        await this.login({
          Login: this.username,
          Senha: this.password,
        })
        this.$router.push('/')
      } catch (error) {
        alert(error.response.data.error)
      }
    },
  },
}
</script>

<template>
  <main class="container">
    <form @submit.prevent="submitForm">
      <h1>SisVF</h1>
      <label for="username">Usuário</label>
      <input type="text" id="username" name="username" v-model="username" required>
      <label for="password">Senha</label>
      <input type="password" id="password" name="password" v-model="password" required>
      <button type="submit">Login</button>
    </form>
    <div class="image-wrapper"></div>
  </main>
</template>

<style lang="less" scoped>
@import "node_modules/nord/src/lesscss/nord.less";

.container {
  display: flex;
  flex-direction: row;
  align-items: center;

  font-family: Arial, sans-serif;
  background-color: @nord2;
  border-radius: 5px;
  color: @nord4;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  width: 300px;
  height: 500px;
}

.image-wrapper {
  border-radius: 5px;
  width: 300px;
  height: 500px;
  padding: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/ccb_bras.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left;
  filter: grayscale(50%);
  transition: filter 2s;
}

.image-wrapper:hover {
  filter: grayscale(0);
  transition: filter 2s;
}

h1 {
  color: @nord4;
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: @nord4;
  text-align: left;
}

input[type="text"],
input[type="password"] {
  box-sizing: border-box;
  text-align: left;
  display: block;
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  background-color: @nord4;
  color: @nord0;
}

button[type="submit"] {
  background-color: @nord10;
  color: @nord6;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  height: 40px;
  font-weight: bold;
  transition: all 100ms linear;
}

button[type="submit"]:hover {
  background-color: @nord9;
  transition: all 50ms linear;
}
</style>
