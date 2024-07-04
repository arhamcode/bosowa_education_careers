<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-sitemap-outline</v-icon>
      Tambah pengalaman organisasi
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Nama organisasi"
            vid="org_name"
            rules="required"
          >
            <v-text-field
              v-model="organizationActivity.org_name"
              :error-messages="errors"
              dense
              outlined
            >
              <template #label>
                Nama organisasi <span class="red--text">*</span>
              </template>
            </v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Jenis organisasi"
            vid="org_type"
            rules="required"
          >
            <v-text-field
              v-model="organizationActivity.org_type"
              :error-messages="errors"
              dense
              outlined
            >
              <template #label>
                Jenis organisasi <span class="red--text">*</span>
              </template>
            </v-text-field>
          </validation-provider>
          <v-row dense>
            <v-col>
              <v-text-field
                v-model="organizationActivity.start_year"
                label="Tahun awal aktif"
                dense
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="organizationActivity.end_year"
                label="Aktif hingga tahun"
                dense
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <validation-provider
            v-slot="{ errors }"
            name="Posisi"
            vid="position"
            rules="required"
          >
            <v-text-field
              v-model="organizationActivity.position"
              :error-messages="errors"
              dense
              outlined
            >
              <template #label>
                Posisi <span class="red--text">*</span>
              </template>
            </v-text-field>
          </validation-provider>
          <v-textarea
            v-model="organizationActivity.position_desc"
            label="Deskripsi pekerjaan"
            rows="2"
            dense
            outlined
          ></v-textarea>
          <v-row dense>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Negara"
                vid="country_name"
                rules="required"
              >
                <v-select
                  v-model="organizationActivity.country_name"
                  :error-messages="errors"
                  :items="$store.getters['masterType/country']"
                  item-text="name"
                  item-value="id"
                  dense
                  outlined
                >
                  <template #label>
                    Negara <span class="red--text">*</span>
                  </template>
                </v-select>
              </validation-provider>
            </v-col>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Provinsi"
                vid="state_name"
                rules="required"
              >
                <v-select
                  v-model="organizationActivity.state_name"
                  :error-messages="errors"
                  :items="$store.getters['masterType/state']"
                  item-text="name"
                  item-value="name"
                  dense
                  outlined
                >
                  <template #label>
                    Provinsi <span class="red--text">*</span>
                  </template>
                </v-select>
              </validation-provider>
            </v-col>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Kota"
                vid="city_name"
                rules="required"
              >
                <v-select
                  v-model="organizationActivity.city_name"
                  :error-messages="errors"
                  :items="$store.getters['masterType/city']"
                  item-text="name"
                  item-value="name"
                  dense
                  outlined
                >
                  <template #label
                    >Kota <span class="red--text">*</span>
                  </template>
                </v-select>
              </validation-provider>
            </v-col>
          </v-row>
          <v-btn :loading="loading" type="submit" color="primary">
            <v-icon>mdi-content-save</v-icon>
            Simpan
          </v-btn>
          <v-btn color="success" @click="$router.back()"> Kembali </v-btn>
        </form>
      </validation-observer>
    </v-container>
  </v-card>
</template>

<script>
import { required } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'Mohon isi {_field_}.',
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
      organizationActivity: {
        org_name: '',
        org_type: '',
        position: '',
        position_desc: '',
        start_year: 2022,
        end_year: 2022,
        country_name: '',
        state_name: '',
        city_name: '',
      },
    }
  },
  async fetch() {
    await this.$store.dispatch('masterType/fetchCountry')
    await this.$store.dispatch('masterType/fetchState')
    await this.$store.dispatch('masterType/fetchCity')
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true
          this.$axios.post(
            '/profile/organizationactivity',
            this.organizationActivity
          )
          this.$router.back()
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
