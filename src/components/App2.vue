
<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container fluid="true" grid-list-xl text-xs-center class="mt-1 pt-5">
          <v-layout row wrap>
            <v-flex xs6 offset-xs3>
              <v-card color="white" class="ma-5 pa-1">
                <img src="http://via.placeholder.com/300x100/FFFFFF">
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="login"
                  class="ma-4 pa-2"
                >
                  <v-text-field
                    v-model="username"
                    name="username"
                    :rules="[rules.required]"
                    placeholder
                    label="Username"
                    required
                    :append-icon="'person'"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    name="password"
                    :rules="[rules.required]"
                    placeholder
                    label="Password"
                    required
                    :append-icon="show ? 'visibility' : 'visibility_off'"
                    :type="show ? 'text' : 'password'"
                    class="input-group--focused"
                    @click:append="show = !show"
                  ></v-text-field>
                  <v-btn type="submit" color="info" large block class="mt-5">Login</v-btn>
                </v-form>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
new Vue({
  el: "#app",
  // == Name
  name: "Login",
  // == Components
  // == Filters
  // == Data
  data() {
    return {
      username: "",
      password: "",
      account: "",
      valid: true,
      show: false,
      rules: {
        required: value => !!value || "Field required",
        min: value => value.length >= 4 || "Minimum 4 characters"
      }
    };
  },
  // == Computed
  // == Watch
  // == Lifecycle
  // == Methods
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        let token = btoa(this.username + ":" + this.password);
        console.log(token);
        // do something
      }
    }
  }
});
</script>