<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-account-circle</v-icon>
      Informasi personal
    </v-card-title>
    <v-divider />
    <loading-progress v-if="$fetchState.pending" />
    <v-container v-else fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <v-row dense>
            <v-col cols="12" md="9">
              <v-text-field
                :value="personalData.register_number"
                label="ID Pelamar"
                readonly
                dense
                outlined
              />
              <validation-provider
                v-slot="{ errors }"
                name="Nama lengkap"
                vid="fullName"
                rules="required"
              >
                <v-text-field
                  v-model="fullName"
                  :error-messages="errors"
                  outlined
                  dense
                >
                  <template #label>
                    Nama lengkap <span class="red--text">*</span>
                  </template>
                </v-text-field>
              </validation-provider>
              <v-text-field
                :value="personalData.email"
                label="Email"
                readonly
                outlined
                dense
              />
              <validation-provider
                v-slot="{ errors }"
                name="Nomor telepon / WhatsApp"
                vid="mobile_phone"
                rules="required|phone_numeric"
              >
                <v-text-field
                  v-model="personalData.mobile_phone"
                  type="number"
                  :error-messages="errors"
                  dense
                  outlined
                >
                  <template #label>
                    Nomor telepon / WhatsApp <span class="red--text">*</span>
                  </template>
                </v-text-field>
              </validation-provider>
              <v-row dense>
                <v-col cols="12" md="4">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Tempat lahir"
                    vid="birth_place"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="personalData.birth_place"
                      :items="$store.getters['masterType/city']"
                      :error-messages="errors"
                      item-text="name"
                      item-value="name"
                      outlined
                      dense
                    >
                      <template #label>
                        Tempat lahir <span class="red--text">*</span>
                      </template>
                    </v-autocomplete>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="4">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Tanggal lahir"
                    vid="birth_date"
                    rules="required"
                  >
                    <fields-birth-date
                      v-model="personalData.birth_date"
                      :max-date="
                        $dayjs().subtract(20, 'year').format('YYYY-MM-DD')
                      "
                      :min-date="
                        $dayjs().subtract(60, 'year').format('YYYY-MM-DD')
                      "
                      :error-messages="errors"
                    />
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="4">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Jenis kelamin"
                    vid="gender"
                    rules="required"
                  >
                    <v-select
                      v-model="personalData.gender"
                      :items="$store.getters['masterType/gender']"
                      :error-messages="errors"
                      outlined
                      dense
                    >
                      <template #label>
                        Jenis kelamin <span class="red--text">*</span>
                      </template>
                    </v-select>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12" md="4">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Kewarganegaraan"
                    vid="nationality_id"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="personalData.nationality_id"
                      :items="$store.getters['masterType/country']"
                      :error-messages="errors"
                      item-text="name"
                      item-value="id"
                      outlined
                      dense
                    >
                      <template #label>
                        Kewarganegaraan <span class="red--text">*</span>
                      </template>
                    </v-autocomplete>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="4">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Agama"
                    vid="religion_id"
                    rules="required"
                  >
                    <v-select
                      v-model="personalData.religion_id"
                      :items="$store.getters['masterType/religion']"
                      item-text="name"
                      item-value="name"
                      outlined
                      dense
                      :error-messages="errors"
                    >
                      <template #label>
                        Agama <span class="red--text">*</span>
                      </template>
                    </v-select>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="4">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Status pernikahan"
                    vid="marital_status"
                    rules="required"
                  >
                    <v-select
                      v-model="personalData.marital_status"
                      :error-messages="errors"
                      :items="$store.getters['masterType/maritalStatus']"
                      item-text="text_id"
                      item-value="code"
                      outlined
                      dense
                    >
                      <template #label>
                        Status pernikahan <span class="red--text">*</span>
                      </template>
                    </v-select>
                  </validation-provider>
                </v-col>
              </v-row>
              <validation-provider
                v-slot="{ errors }"
                name="Nomor KTP"
                vid="nric"
                :rules="{
                  required: true,
                  regex_nric: $store.getters['masterType/regexKTP'],
                }"
              >
                <v-text-field
                  v-model="personalData.nric"
                  :error-messages="errors"
                  persistent-hint
                  outlined
                  dense
                >
                  <template #label>
                    Nomor KTP <span class="red--text">*</span>
                    <span>
                      (Optional: Upload salinan KTP
                      <nuxt-link to="/profile/document">disini</nuxt-link>)
                    </span>
                  </template>
                </v-text-field>
              </validation-provider>
              <v-row dense>
                <v-col cols="12" md="4">
                  <v-text-field v-model="personalData.npwp" outlined dense>
                    <template #label>
                      NPWP
                      <span>
                        (Optional: Upload salinan NPWP
                        <nuxt-link to="/profile/document">disini</nuxt-link>)
                      </span>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="personalData.jamsostek_num"
                    outlined
                    dense
                    label="BPJSTk"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="personalData.driver_license"
                    :items="$store.getters['masterType/driverLicense']"
                    outlined
                    dense
                    label="SIM"
                  />
                </v-col>
              </v-row>
              <validation-provider
                v-slot="{ errors }"
                name="Tentang saya"
                vid="additional_info"
                rules="required"
              >
                <v-textarea
                  v-model="personalData.additional_info"
                  :error-messages="errors"
                  outlined
                  rows="2"
                  dense
                >
                  <template #label>
                    Tentang saya <span class="red--text">*</span>
                  </template>
                </v-textarea>
              </validation-provider>
            </v-col>
            <v-col cols="12" md="3">
              <fields-personal-avatar-preview
                :image-file="imageFile"
                :image-link="personalData.image_file"
              />
              <validation-provider
                v-slot="{ errors }"
                name="Foto"
                vid="imageFile"
                :rules="{
                  required_file: personalData.image_file.length == 0,
                  mimes: 'image/*',
                  size: 2000,
                }"
              >
                <v-file-input
                  v-model="imageFile"
                  prepend-icon=""
                  :error-messages="errors"
                  prepend-inner-icon="mdi-account-box"
                  dense
                  outlined
                >
                  <template #label>
                    Foto <span class="red--text">*</span>
                  </template>
                </v-file-input>
              </validation-provider>

              <fields-personal-social-link
                v-model="personalData.linkedin_link"
                social-site="linkedin"
              />
              <fields-personal-social-link
                v-model="personalData.facebook_link"
                social-site="facebook"
              />
              <fields-personal-social-link
                v-model="personalData.twitter_link"
                social-site="twitter"
              />
              <fields-personal-social-link
                v-model="personalData.instagram_link"
                social-site="instagram"
              />
              <v-checkbox
                v-model="personalData.spectacled"
                dense
                label="Saya menggunakan kacamata"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-btn type="submit" :loading="loading" color="primary">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Simpan
          </v-btn>
        </form>
      </validation-observer>
    </v-container>
    <arham-dialog ref="dialog" />
  </v-card>
</template>

<script>
import { required, size, mimes, regex, numeric } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'

setInteractionMode('eager')

extend('phone_numeric', {
  ...numeric,
  message: 'Nomor telepon hanya dapat diisi dengan karakter angka/numerik.',
})

extend('regex_nric', {
  ...regex,
  message: 'Nomor KTP tidak valid.',
})

extend('required_file', {
  ...required,
  message: 'Mohon upload {_field_}.',
})

extend('required', {
  ...required,
  message: 'Mohon isi {_field_}.',
})

extend('size', {
  ...size,
  message: 'Ukuran file maksimal {size}KB.',
})

extend('mimes', {
  ...mimes,
  message: 'Format file tidak didukung.',
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  layout: 'profile_layout',
  data() {
    return {
      loading: false,
      imageFile: null,
      personalData: null,
    }
  },
  async fetch() {
    try {
      await this.$store.dispatch('masterType/fetchCity')
      await this.$store.dispatch('masterType/fetchCountry')
      await this.$store.dispatch('masterType/fetchReligion')
      await this.$store.dispatch('masterType/fetchMaritalStatus')
      await this.getPersonalData()
    } catch (error) {
      this.$nuxt.error({
        statusCode: 404,
        message: 'Failed to get personal data.',
      })
    }
  },
  head: {
    title: 'Informasi personal',
  },
  computed: {
    fullName: {
      get() {
        let fullName = this.personalData.first_name
        if (this.personalData.middle_name) {
          fullName = fullName + ' ' + this.personalData.middle_name
        }
        if (this.personalData.last_name) {
          fullName = fullName + ' ' + this.personalData.last_name
        }
        return fullName
      },
      set(newValue) {
        const fullNameArray = newValue.split(' ')
        this.personalData.first_name = fullNameArray[0]
        this.personalData.middle_name = fullNameArray[1] || ''
        this.personalData.last_name = fullNameArray.slice(2).join(' ') || ''
      },
    },
  },
  methods: {
    async getPersonalData() {
      const response = await this.$axios.get('/profile/personal')
      this.personalData = response.data
    },
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true

          const formData = new FormData()
          for (const key in this.personalData) {
            if (key === 'image_file') {
              if (this.imageFile) {
                formData.append('image_file', this.imageFile)
              }
            } else {
              formData.append(key, this.personalData[key])
            }
          }

          const response = await this.$axios.post('/profile/personal', formData)
          this.personalData = response.data
          await this.$auth.fetchUser()
          this.$refs.dialog.open({
            title: 'Sukses',
            message: 'Informasi personal berhasil diperbarui.',
            closeButton: false,
          })
        } catch (error) {
          alert(error)
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>
