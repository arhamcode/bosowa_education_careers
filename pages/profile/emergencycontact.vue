<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-human-greeting-proximity</v-icon>
      Kontak darurat
    </v-card-title>
    <v-divider></v-divider>
    <loading-progress v-if="$fetchState.pending" />
    <v-container v-else fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Nama"
            vid="emergency_contact_name"
            rules="required"
          >
            <v-text-field
              v-model="emergencyContact.emergency_contact_name"
              label="Nama"
              :error-messages="errors"
              dense
              outlined
            ></v-text-field>
          </validation-provider>
          <v-select
            v-model="emergencyContact.emergency_contact_relationship"
            :items="$store.getters['masterType/familyRelationship']"
            item-text="name"
            item-value="id"
            label="Hubungan"
            dense
            outlined
          ></v-select>
          <validation-provider
            v-slot="{ errors }"
            name="Nomor telepon"
            vid="emergency_contact_phone"
            rules="required"
          >
            <v-text-field
              v-model="emergencyContact.emergency_contact_phone"
              label="Nomor telepon"
              :error-messages="errors"
              type="number"
              dense
              outlined
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Alamat"
            vid="emergency_contact_address"
            rules="required"
          >
            <v-textarea
              v-model="emergencyContact.emergency_contact_address"
              :error-messages="errors"
              label="Alamat"
              rows="2"
              dense
              outlined
            />
          </validation-provider>

          <v-row dense>
            <v-col cols="12" md="6" lg="3">
              <v-autocomplete
                v-model="emergencyContact.emergency_contact_country"
                label="Negara"
                :items="$store.getters['masterType/country']"
                item-value="id"
                item-text="name"
                dense
                outlined
              />
            </v-col>
            <v-col cols="12" md="6" lg="3">
              <v-autocomplete
                v-model="emergencyContact.emergency_contact_state"
                :items="$store.getters['masterType/state']"
                item-text="name"
                item-value="name"
                label="Provinsi"
                dense
                outlined
              />
            </v-col>
            <v-col cols="12" md="6" lg="3">
              <v-autocomplete
                v-model="emergencyContact.emergency_contact_city"
                label="Kota/Kabupaten"
                :items="$store.getters['masterType/city']"
                item-text="name"
                item-value="name"
                dense
                outlined
              />
            </v-col>
            <v-col cols="12" md="6" lg="3">
              <v-text-field
                v-model="emergencyContact.emergency_contact_zipcode"
                label="Kode POS"
                type="number"
                dense
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn color="primary" class="text-capitalize" type="submit">
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
      valid: true,
      emergencyContact: {
        emergency_contact_address: '',
        emergency_contact_city: '',
        emergency_contact_country: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        emergency_contact_relationship: 0,
        emergency_contact_state: '',
        emergency_contact_zipcode: '',
      },
    }
  },
  async fetch() {
    await this.$store.dispatch('masterType/fetchFamilyRelationship')
    await this.$store.dispatch('masterType/fetchCity')
    await this.$store.dispatch('masterType/fetchCountry')
    await this.$store.dispatch('masterType/fetchState')
    await this.getEmergencyContact()
  },
  head: {
    title: 'Kontak darurat',
  },
  methods: {
    async getEmergencyContact() {
      const response = await this.$axios.get('/profile/emergencycontact')
      this.emergencyContact = response.data
    },
    async submit() {
      if (await this.$refs.observer.validate()) {
        const response = await this.$axios.put(
          '/profile/emergencycontact',
          this.emergencyContact
        )
        this.emergencyContact = response.data
        this.$refs.dialog.open({
          title: 'Sukses',
          message: 'Kontak darurat berhasil diperbarui.',
          closeButton: false,
        })
      }
    },
  },
}
</script>
