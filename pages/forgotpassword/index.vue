<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" md="5">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-lock-question</v-icon>
            Reset kata sandi
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
                    tabindex="2"
                    autocomplete="username"
                    prepend-inner-icon="mdi-email"
                    label="Email"
                    :error-messages="errors"
                    outlined
                    dense
                  ></v-text-field>
                </validation-provider>
                <v-btn
                  type="submit"
                  color="success"
                  block
                  class="mb-5"
                  tabindex="6"
                  :loading="loading"
                >
                  <v-icon class="mr-2">mdi-lock-question</v-icon>
                  Reset kata sandi
                </v-btn>
                <v-btn color="primary" text block to="/login">
                  <v-icon class="mr-2">mdi-login-variant</v-icon>
                  Sudah punya akun. Login disini
                </v-btn>
              </form>
            </validation-observer>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <arham-dialog ref="dialog" />
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
  message: 'Alamat email tidak valid.',
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  auth: 'guest',
  data() {
    return {
      loading: false,
      email: '',
    }
  },
  head: {
    title: 'Lupa kata sandi',
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true
          await this.$axios.post('/resetpassword/sendemail', {
            email: this.email,
          })
          this.$refs.dialog
            .open({
              title: 'Sukses',
              message:
                'Email reset kata sandi berhasil terkirim, periksa inbox atau spam box Anda.',
              cancelButton: false,
            })
            .then((result) => this.$router.replace('/login'))
        } catch (error) {
          if (error.response.data.errorCode === 'EMAIL_NOT_EXISTS') {
            this.$refs.observer.setErrors({
              email: [error.response.data.message],
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
