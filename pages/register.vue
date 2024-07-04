<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-account-plus-outline</v-icon>
            Daftar
          </v-card-title>
          <v-container fluid>
            <validation-observer ref="observer">
              <form @submit.prevent="submit">
                <validation-provider
                  v-slot="{ errors }"
                  name="Nama lengkap"
                  vid="fullname"
                  rules="required"
                >
                  <v-text-field
                    v-model="fullName"
                    tabindex="1"
                    prepend-inner-icon="mdi-account-circle"
                    label="Nama lengkap"
                    :error-messages="errors"
                    outlined
                    dense
                  ></v-text-field>
                </validation-provider>
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
                <validation-provider
                  v-slot="{ errors }"
                  name="Nomor telepon"
                  vid="phone"
                  rules="required|numeric"
                >
                  <v-text-field
                    v-model="phone"
                    tabindex="3"
                    prepend-inner-icon="mdi-phone"
                    label="Nomor telepon"
                    :error-messages="errors"
                    outlined
                    dense
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Kata sandi"
                  vid="password"
                  rules="required|minPassword:8"
                >
                  <v-text-field
                    v-model="password"
                    tabindex="4"
                    autocomplete="new-password"
                    prepend-inner-icon="mdi-lock"
                    :type="obscurePassword ? 'password' : 'text'"
                    :append-icon="obscurePassword ? 'mdi-eye-off' : 'mdi-eye'"
                    label="Kata sandi"
                    :error-messages="errors"
                    outlined
                    dense
                    @click:append="obscurePassword = !obscurePassword"
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Konfirmasi kata sandi"
                  vid="confirmPassword"
                  rules="required|confirmPassword:password"
                >
                  <v-text-field
                    v-model="confirmPassword"
                    tabindex="5"
                    autocomplete="new-password"
                    prepend-inner-icon="mdi-lock"
                    :type="obscureConfirmPassword ? 'password' : 'text'"
                    :append-icon="
                      obscureConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    label="Konfirmasi kata sandi"
                    :error-messages="errors"
                    outlined
                    dense
                    @click:append="
                      obscureConfirmPassword = !obscureConfirmPassword
                    "
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
                  <v-icon class="mr-2">mdi-account-plus-outline</v-icon>
                  Daftar
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
  </v-container>
</template>

<script>
import {
  required,
  email,
  confirmed,
  min,
  numeric,
} from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'

setInteractionMode('eager')

extend('numeric', {
  ...numeric,
  message: '{_field_} tidak valid',
})

extend('required', {
  ...required,
  message: '{_field_} harus terisi.',
})

extend('minPassword', {
  ...min,
  message: '{_field_} minimal {length} karakter.',
})

extend('email', {
  ...email,
  message: '{_field_} tidak valid.',
})

extend('confirmPassword', {
  ...confirmed,
  message: '{_field_} tidak valid.',
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  auth: 'guest',
  data() {
    return {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      obscurePassword: true,
      obscureConfirmPassword: true,
      loading: false,
    }
  },
  head: {
    title: 'Daftar',
  },
  methods: {
    async submit() {
      const fullNameArray = this.fullName.trim().split(' ')
      const firstName = fullNameArray[0]
      const middleName = fullNameArray.length > 1 ? fullNameArray[1] : ''
      let lastName = ''
      if (fullNameArray.length > 2) {
        const tempLastNameArray = fullNameArray.slice(2, fullNameArray.length)
        lastName = tempLastNameArray.join(' ')
      }

      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true
          const response = await this.$axios.post('/auth/register', {
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            email: this.email,
            mobile_phone: this.phone,
            password: this.password,
            confirm_password: this.confirmPassword,
          })
          await this.$auth.setUserToken(response.data.token)
        } catch (error) {
          switch (error.response.data.errorCode) {
            case 'NAME_EMPTY':
              this.$refs.observer.setErrors({
                fullname: [error.response.data.message],
              })
              break
            case 'EMAIL_EMPTY':
            case 'EMAIL_EXISTS':
              this.$refs.observer.setErrors({
                email: [error.response.data.message],
              })
              break
            case 'PHONE_EMPTY':
              this.$refs.observer.setErrors({
                phone: [error.response.data.message],
              })
              break
            case 'PASSWORD_MINCHAR':
              this.$refs.observer.setErrors({
                password: [error.response.data.message],
              })
              break
            case 'PASSWORD_MISMATCH':
              this.$refs.observer.setErrors({
                confirmPassword: [error.response.data.message],
              })
              break
          }
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>
