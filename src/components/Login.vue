

<template>
  <v-app>
    <div class="login">
      <div v-if="loggingIn" class="container-loading">
        <img src="../assets/loader.gif" alt="Loading Icon" class="logo">
      </div>
      <img src="../assets/gavagai.png" class="logo">
      <h2>Chatbot Tool</h2>
      <h3 v-if="loginError">{{ loginError }}</h3>
      <h3 v-if="loginSuccessful">Login Successful</h3>
      <v-form class="form" ref="form" lazy-validation @submit.prevent="loginSubmit">
        <v-container>
          <v-layout row wrap>
            <v-flex>
              <v-text-field
                autofocus
                class="ma-2 pa-0"
                prepend-icon="fa-user"
                v-model="username"
                label="Username"
                required
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                class="ma-2 pa-0"
                prepend-icon="fa-lock"
                v-model="password"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required]"
                :type="show1 ? 'text' : 'password'"
                label="Password"
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-btn color="#000000" type="submit" @click="validate">Login</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>

      <div>
        <div class="text-xs-center">
          <button
            @click="alert = true"
            v-if="!alert"
            class="forgotBtn"
            depressed
            color="white"
          >Forgot password?</button>
        </div>
        <v-alert v-model="alert" dismissible type="warning">
          <p>Please try harder to remember your password</p>
        </v-alert>
      </div>
    </div>
  </v-app>
</template>


<style scoped lang="scss">
.login {
  border: 1px solid black;
  border-radius: 5px;
  padding: 1.5rem;
  width: 300px;
  position: relative;
  overflow: hidden;
  color: #000000;
  font-family: Avenir;
  margin: 20%;
  background-color: white;
  // height: 350px;

  .container-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    img {
      width: 10rem;
      height: 10rem;
    }
  }
  .forgotBtn {
    color: black;
    font-size: 12px;
    background-color: white;
  }
  .logo {
    width: 80%;
  }
  .form {
    display: flex;
    flex-flow: column;
    *:not(:last-child) {
      margin-bottom: 1rem;
    }
    input {
      padding: 0.5rem;
    }
    button {
      padding: 0.5rem;
      background-color: #000000;
      border: 1px solid white;
      color: white;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        background-color: lightslategray;
      }
    }
  }
}
</style>

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
    ...mapActions(["doLogin"]),
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
