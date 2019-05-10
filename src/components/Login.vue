<template>
  <v-app>
    <v-layout row wrap justify-center align-center>
      <div class="login">
        <div v-if="loggingIn" class="container-loading">
          <img src="../assets/loader.gif" alt="Loading Icon" class="logo">
        </div>
        <v-layout column align-center class="mb-3">
          <img src="../assets/gavagai.png" class="logo">
          <h1>Chatbot Tool</h1>
          <h2 v-show="loginError">{{ loginError }}</h2>
          <h2 v-show="loginSuccessful">Login Successful.</h2>
        </v-layout>
        <v-form v-if="!loginSuccessful" ref="form" lazy-validation @submit.prevent="loginSubmit">
          <v-text-field
            autofocus
            class="ma-2"
            prepend-icon="fa-user"
            v-model="username"
            label="Username"
            required
            :rules="[rules.required]"
          ></v-text-field>

          <v-text-field
            class="ma-2"
            prepend-icon="fa-lock"
            v-model="password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-layout column align-center>
            <v-btn
              dark
              class="button"
              :disabled="!username.length>0 || !password.length>0"
              v-show="!loginSuccessful"
              type="submit"
              @click="validate"
            >Login</v-btn>
          </v-layout>
        </v-form>

        <v-layout column align-center>
          <v-btn dark v-show="loginSuccessful" @click="removeToken">Log Out</v-btn>

          <button
            @click="alert = true"
            v-if="!alert"
            class="forgotBtn"
            depressed
            color="white"
          >Forgot password?</button>

          <v-alert v-model="alert" dismissible type="warning">
            <p>Please try harder to remember your password</p>
          </v-alert>
        </v-layout>
      </div>
    </v-layout>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      show1: false,
      alert: false,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  computed: {
    ...mapState(["loggingIn", "loginError", "loginSuccessful"])
  },
  methods: {
    ...mapActions(["doLogin", "removeToken"]),
    loginSubmit() {
      this.doLogin({
        username: this.username,
        password: this.password
      });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  }
};
</script>

<style>
h1 {
  opacity: 0.5;
  font-size: 23px;
}
.login {
  box-shadow: 1px 1px 3px 1px #888888;
  padding: 1.5rem;
  width: 300px;
  position: relative;
  overflow: hidden;
  color: #000000;
  font-family: Avenir;
  background-color: white;
}
.container-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.forgotBtn {
  color: black;
  font-size: 12px;
  background-color: white;
}
.logo {
  width: 80%;
}

button {
  padding: 0.5rem;
  width: 60%;
  background-color: #000000;
  color: white;
}
</style>