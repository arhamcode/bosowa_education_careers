<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-map-marker</v-icon>
      Alamat
    </v-card-title>
    <v-divider />
    <loading-progress v-if="$fetchState.pending" />
    <v-container v-else fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <p class="text-subtitle-1">Alamat domisili</p>
          <validation-provider
            v-slot="{ errors }"
            name="Alamat domisili"
            vid="address1"
            rules="required"
          >
            <v-textarea
              v-model="address.address1"
              :error-messages="errors"
              label="Alamat"
              rows="2"
              dense
              outlined
            >
              <template #label>
                Alamat domisili <span class="red--text">*</span>
              </template>
            </v-textarea>
          </validation-provider>
          <v-row dense>
            <v-col cols="12" md="3">
              <validation-provider
                v-slot="{ errors }"
                name="Negara"
                vid="country1"
                rules="required"
              >
                <v-autocomplete
                  v-model="address.country1"
                  :items="$store.getters['masterType/country']"
                  :error-messages="errors"
                  item-value="id"
                  item-text="name"
                  label="Negara"
                  dense
                  outlined
                />
              </validation-provider>
            </v-col>
            <v-col cols="12" md="3">
              <validation-provider
                v-slot="{ errors }"
                name="Provinsi"
                vid="state1"
                rules="required"
              >
                <v-autocomplete
                  v-model="address.state1"
                  label="Provinsi"
                  :error-messages="errors"
                  :items="$store.getters['masterType/state']"
                  item-value="name"
                  item-text="name"
                  dense
                  outlined
                />
              </validation-provider>
            </v-col>
            <v-col cols="12" md="3">
              <validation-provider
                v-slot="{ errors }"
                name="Kota/Kabupaten"
                vid="city1"
                rules="required"
              >
                <v-autocomplete
                  v-model="address.city1"
                  :items="$store.getters['masterType/city']"
                  item-text="name"
                  :error-messages="errors"
                  item-value="name"
                  label="Kota/Kabupaten"
                  dense
                  outlined
                />
              </validation-provider>
            </v-col>
            <v-col cols="12" md="3">
              <validation-provider
                v-slot="{ errors }"
                name="Kode POS"
                vid="zipcode1"
                rules="required|numeric"
              >
                <v-text-field
                  v-model="address.zipcode1"
                  label="Kode POS"
                  :error-messages="errors"
                  type="number"
                  dense
                  outlined
                ></v-text-field
              ></validation-provider>
            </v-col>
          </v-row>
          <p class="text-subtitle-1">Alamat asal (sesuai KTP)</p>
          <validation-provider
            v-slot="{ errors }"
            name="Alamat asal"
            vid="address2"
            rules="required"
          >
            <v-textarea
              v-model="address.address2"
              label="Alamat asal"
              rows="2"
              :error-messages="errors"
              dense
              outlined
            >
              <template #label>
                Alamat asal <span class="red--text">*</span>
              </template>
            </v-textarea>
          </validation-provider>
          <v-row dense>
            <v-col cols="12" md="3">
              <validation-provider
                v-slot="{ errors }"
                name="Negara"
                vid="country2"
                rules="required"
              >
                <v-autocomplete
                  v-model="address.country2"
                  :items="$store.getters['masterType/country']"
                  item-value="id"
                  item-text="name"
                  :error-messages="errors"
                  label="Negara"
                  dense
                  outlined
                />
              </validation-provider>
            </v-col>
            <v-col cols="12" md="3">
              <validation-provider
                v-slot="{ errors }"
                name="Provinsi"
                vid="state2"
                rules="required"
              >
                <v-autocomplete
                  v-model="address.state2"
                  label="Provinsi"
                  :error-messages="errors"
                  :items="$store.getters['masterType/state']"
                  item-value="name"
                  item-text="name"
                  dense
                  outlined
                />
              </validation-provider>
            </v-col>
            <v-col cols="12" md="3">
              <validation-provider
                v-slot="{ errors }"
                name="Kota/Kabupaten"
                vid="city2"
                rules="required"
              >
                <v-autocomplete
                  v-model="address.city2"
                  :items="$store.getters['masterType/city']"
                  :error-messages="errors"
                  item-text="name"
                  item-value="name"
                  label="Kota/Kabupaten"
                  dense
                  outlined
                />
              </validation-provider>
            </v-col>
            <v-col cols="12" md="3">
              <validation-provider
                v-slot="{ errors }"
                name="Kode POS"
                vid="zipcode2"
                rules="required|numeric"
              >
                <v-text-field
                  v-model="address.zipcode2"
                  label="Kode POS"
                  :error-messages="errors"
                  type="number"
                  dense
                  outlined
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-btn
            class="text-capitalize"
            color="primary"
            :loading="loading"
            type="submit"
          >
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
import { required, numeric } from 'vee-validate/dist/rules'
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

extend('numeric', {
  ...numeric,
  message: 'Mohon isi dengan karakter angka.',
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  layout: 'profile_layout',
  data() {
    return {
      loading: true,
      valid: true,
      address: null,
    }
  },
  async fetch() {
    await this.$store.dispatch('masterType/fetchCity')
    await this.$store.dispatch('masterType/fetchCountry')
    await this.$store.dispatch('masterType/fetchState')
    await this.getAddress()
  },
  head: {
    title: 'Alamat'
  },
  methods: {
    async getAddress() {
      try {
        this.loading = true
        const response = await this.$axios.get('/profile/address')
        this.address = response.data
      } catch (error) {
        alert(error)
      } finally {
        this.loading = false
      }
    },
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true
          await this.$axios.put('/profile/address', this.address)
          this.$refs.dialog.open({
            title: 'Sukses',
            message: 'Alamat berhasil diperbarui.',
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
