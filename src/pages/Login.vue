<template>
  <div class="center-screen">
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
  </div>
</template>

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

<style lang="less" scoped>
@import "node_modules/nord/src/lesscss/nord.less";

.center-screen {
  width: 100%;
  height: 100vh;
  display: flex
}

.container {
  width: fit-content;
  margin: auto;
  display: flex;
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
  text-align: center;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: @nord4;
  text-align: left;
}
</style>
