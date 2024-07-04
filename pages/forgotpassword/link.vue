<template>
  <v-container class="fill-height">
    <loading-progress v-if="$fetchState.pending" />
    <v-row v-else justify="center" align="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2" size="30">mdi-lock-question</v-icon>
            Ubah kata sandi
          </v-card-title>
          <v-container fluid>
            <validation-observer ref="observer">
              <form @submit.prevent="submit">
                <validation-provider
                  v-slot="{ errors }"
                  name="Kata sandi baru"
                  vid="newPassword"
                  rules="required|min:8"
                >
                  <v-text-field
                    v-model="newPassword"
                    tabindex="1"
                    prepend-inner-icon="mdi-lock"
                    :type="obscureNewPassword ? 'password' : 'text'"
                    :append-icon="
                      obscureNewPassword ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    placeholder="Kata sandi baru"
                    autocomplete
                    :error-messages="errors"
                    outlined
                    dense
                    @click:append="obscureNewPassword = !obscureNewPassword"
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="Konfirmasi kata sandi baru"
                  vid="confirmNewPassword"
                  rules="required|confirmed:newPassword"
                >
                  <v-text-field
                    v-model="confirmNewPassword"
                    tabindex="2"
                    prepend-inner-icon="mdi-lock"
                    :type="obscureConfirmNewPassword ? 'password' : 'text'"
                    :append-icon="
                      obscureConfirmNewPassword ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    placeholder="Konfirmasi kata sandi baru"
                    autocomplete
                    :error-messages="errors"
                    outlined
                    dense
                    @click:append="
                      obscureConfirmNewPassword = !obscureConfirmNewPassword
                    "
                  ></v-text-field>
                </validation-provider>

                <v-btn
                  type="submit"
                  color="success"
                  block
                  class="mb-5"
                  tabindex="3"
                  :loading="loading"
                >
                  <v-icon class="mr-2">mdi-lock-question</v-icon>
                  Ubah kata sandi
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
import { required, confirmed, min } from 'vee-validate/dist/rules'
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

extend('min', {
  ...min,
  message: '{_field_} minimal {length} karakter',
})

extend('confirmed', {
  ...confirmed,
  message: '{_field_} tidak valid.',
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      loading: false,
      newPassword: '',
      obscureNewPassword: true,
      confirmNewPassword: '',
      obscureConfirmNewPassword: true,
    }
  },
  auth: 'guest',
  async fetch() {
    try {
      await this.$axios.post('resetpassword/checkToken', {
        token: this.$route.query.token,
      })
    } catch (error) {
      this.$nuxt.error({
        statusCode: 404,
        message: 'Halaman tidak ditemukan.',
      })
    }
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true
          await this.$axios.post('/resetpassword/update', {
            token: this.$route.query.token,
            password: this.newPassword,
            password_confirm: this.confirmNewPassword,
          })

          this.$refs.dialog
            .open({
              title: 'Sukses',
              message:
                'Kata sandi berhasil diperbarui, silahkan login dengan sandi baru Anda.',
              agreeTextButton: 'Ke halaman login',
              closeButton: false,
            })
            .then((result) => this.$router.replace('/login'))
        } catch (error) {
          alert(error)
          // if (
          //   error.response &&
          //   error.response.data &&
          //   error.response.data.message
          // ) {
          //   alert(error.response.data.message)
          // } else {
          //   alert(error)
          // }
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>
