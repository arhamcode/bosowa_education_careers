<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-login-variant</v-icon>
            Login
          </v-card-title>
          <v-container fluid>
            <validation-observer ref="observer">
              <form @submit.prevent="submit">
                <validation-provider
                  v-slot="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="email"
                    tabindex="1"
                    prepend-inner-icon="mdi-email"
                    placeholder="Email"
                    :error-messages="errors"
                    outlined
                    dense
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="Kata sandi"
                  vid="password"
                  rules="required"
                >
                  <v-text-field
                    v-model="password"
                    tabindex="2"
                    prepend-inner-icon="mdi-lock"
                    :type="obscurePassword ? 'password' : 'text'"
                    :append-icon="obscurePassword ? 'mdi-eye-off' : 'mdi-eye'"
                    placeholder="Kata sandi"
                    autocomplete
                    :error-messages="errors"
                    outlined
                    dense
                    @click:append="obscurePassword = !obscurePassword"
                  ></v-text-field>
                </validation-provider>

                <v-btn
                  type="submit"
                  color="primary"
                  block
                  class="mb-5"
                  tabindex="3"
                  :loading="loading"
                >
                  <v-icon class="mr-2">mdi-login-variant</v-icon>
                  Masuk
                </v-btn>
                <v-btn color="success" block class="mb-5" to="/register">
                  <v-icon class="mr-2">mdi-account-plus-outline</v-icon>
                  Daftar
                </v-btn>
                <v-btn text color="primary" block to="/forgotpassword">
                  <v-icon class="mr-2">mdi-lock-question</v-icon>
                  Lupa kata sandi?
                </v-btn>
              </form>
            </validation-observer>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, email } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} harus terisi.',
})

extend('email', {
  ...email,
  message: '{_field_} tidak valid.',
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      email: '',
      password: '',
      obscurePassword: true,
      loading: false,
    }
  },
  head: {
    title: 'Login',
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password,
            },
          })
          if (this.$route.query.request_code) {
            this.$router.replace('/vacancy?id='+this.$route.query.request_code)
          }
        } catch (err) {
          if (err.response.data.errorCode === 'EMAIL_NOT_FOUND') {
            this.$refs.observer.setErrors({
              email: [err.response.data.message],
            })
          }
          if (err.response.data.errorCode === 'PASSWORD_INVALID') {
            this.$refs.observer.setErrors({
              password: [err.response.data.message],
            })
          }
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>
