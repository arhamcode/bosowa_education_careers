<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-lock</v-icon>
            Ubah kata sandi
          </v-card-title>
          <v-container fluid>
            <validation-observer ref="observer">
              <form @submit.prevent="submit">
                <validation-provider
                  v-slot="{ errors }"
                  name="Kata sandi saat ini"
                  vid="currentPassword"
                  rules="required"
                >
                  <v-text-field
                    v-model="currentPassword"
                    tabindex="1"
                    prepend-inner-icon="mdi-lock"
                    autocomplete="current-password"
                    placeholder="Kata sandi saat ini"
                    outlined
                    :error-messages="errors"
                    dense
                    :type="obscureCurrentPassword ? 'password' : 'text'"
                    :append-icon="
                      obscureCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    @click:append="
                      obscureCurrentPassword = !obscureCurrentPassword
                    "
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Kata sandi baru"
                  vid="newPassword"
                  rules="required|minpass:8"
                >
                  <v-text-field
                    v-model="newPassword"
                    prepend-inner-icon="mdi-lock"
                    tabindex="2"
                    autocomplete="new-password"
                    :error-messages="errors"
                    placeholder="Kata sandi baru"
                    outlined
                    dense
                    :type="obscureNewPassword ? 'password' : 'text'"
                    :append-icon="
                      obscureNewPassword ? 'mdi-eye-off' : 'mdi-eye'
                    "
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
                    prepend-inner-icon="mdi-lock"
                    :error-messages="errors"
                    placeholder="Konfirmasi kata sandi baru"
                    tabindex="3"
                    autocomplete="new-password"
                    outlined
                    dense
                    :type="obscureConfirmNewPassword ? 'password' : 'text'"
                    :append-icon="
                      obscureConfirmNewPassword ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    @click:append="
                      obscureConfirmNewPassword = !obscureConfirmNewPassword
                    "
                  ></v-text-field>
                </validation-provider>
                <v-btn
                  type="submit"
                  color="primary"
                  tabindex="4"
                  :loading="loading"
                >
                  <v-icon class="mr-2">mdi-content-save</v-icon>
                  Simpan
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

extend('confirmed', {
  ...confirmed,
  message: '{_field_} tidak valid.',
})

extend('minpass', {
  ...min,
  message: '{_field_} minimal {length} karakter',
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      loading: false,
      currentPassword: '',
      obscureCurrentPassword: true,
      newPassword: '',
      obscureNewPassword: true,
      confirmNewPassword: '',
      obscureConfirmNewPassword: true,
    }
  },
  head: {
    title: 'Ubah kata sandi',
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true
          await this.$axios.post('/updatepassword', {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
            confirmNewPassword: this.confirmNewPassword,
          })

          this.$refs.dialog.open({
            title: 'Sukses',
            message: 'Kata sandi berhasil diperbarui.',
            closeButton: false,
          })
        } catch (error) {
          if (error.response && error.response.data.errorCode) {
            this.$refs.observer.setErrors({
              currentPassword: [error.response.data.message],
            })
          } else {
            alert(error)
          }
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>
