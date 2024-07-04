<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-human-male-female-child</v-icon>
      Ubah Keluarga &amp; tanggungan
    </v-card-title>
    <v-divider></v-divider>
    <loading-progress v-if="$fetchState.pending" />
    <v-container v-else fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Nama lengkap"
            vid="appfamily_name"
            rules="required"
          >
            <v-text-field
              v-model="familyDependant.appfamily_name"
              dense
              :error-messages="errors"
              outlined
            >
              <template #label>
                Nama lengkap <span class="red--text">*</span>
              </template>
            </v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Hubungan"
            vid="appfamily_relationship_id"
            rules="required"
          >
            <v-select
              v-model="familyDependant.appfamily_relationship_id"
              :items="$store.getters['masterType/familyRelationship']"
              :error-messages="errors"
              item-text="name"
              item-value="id"
              dense
              outlined
              label="Hubungan"
            />
          </validation-provider>
          <validation-provider
            v-if="
              [3, 4].some(
                (el) => el == familyDependant.appfamily_relationship_id
              )
            "
            v-slot="{ errors }"
            name="Anak ke-"
            vid="child_order"
            rules="required_if:appfamily_relationship_id,3|required_if:appfamily_relationship_id,4"
          >
            <v-text-field
              v-model="familyDependant.child_order"
              type="number"
              :error-messages="errors"
              dense
              outlined
            >
              <template #label>
                Anak ke- <span class="red--text">*</span>
              </template>
            </v-text-field>
          </validation-provider>
          <v-row>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Tempat lahir"
                vid="appfamily_birthplace"
                rules="required"
              >
                <v-autocomplete
                  v-model="familyDependant.appfamily_birthplace"
                  :items="$store.getters['masterType/city']"
                  item-value="name"
                  :error-messages="errors"
                  item-text="name"
                  outlined
                  dense
                >
                  <template #label>
                    Tempat lahir <span class="red--text">*</span>
                  </template>
                </v-autocomplete>
              </validation-provider>
            </v-col>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Tanggal lahir"
                vid="appfamily_dob"
                rules="required"
              >
                <fields-birth-date
                  v-model="familyDependant.appfamily_dob"
                  :max-date="$dayjs().format('YYYY-MM-DD')"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Jenis kelamin"
                vid="appfamily_gender"
                rules="required"
              >
                <v-select
                  v-model="familyDependant.appfamily_gender"
                  :items="$store.getters['masterType/gender']"
                  :error-messages="errors"
                  label="Jenis kelamin"
                  outlined
                  dense
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-select
            v-model="familyDependant.appfamily_occupation"
            label="Pekerjaan"
            :items="$store.getters['masterType/occupation']"
            item-text="name"
            item-value="id"
            dense
            outlined
          ></v-select>
          <validation-provider
            v-slot="{ errors }"
            name="Status pernikahan"
            vid="appfamily_marital_status"
            rules="required"
          >
            <v-select
              v-model="familyDependant.appfamily_marital_status"
              :error-messages="errors"
              :items="$store.getters['masterType/maritalStatus']"
              item-text="text_id"
              item-value="code"
              label="Status pernikahan"
              outlined
              dense
            />
          </validation-provider>
          <v-text-field
            v-model="familyDependant.appfamily_phone"
            dense
            outlined
            label="Nomor telepon"
          ></v-text-field>
          <v-select
            v-model="familyDependant.appfamily_lasteducation"
            label="Tingkat pendidikan terakhir"
            :items="$store.getters['masterType/educationType']"
            item-text="name"
            item-value="id"
            dense
            outlined
          ></v-select>
          <v-textarea
            v-model="familyDependant.appfamily_address"
            dense
            rows="2"
            outlined
            label="Alamat"
          ></v-textarea>
          <v-checkbox
            v-model="familyDependant.appfamily_dependentsts"
            :true-value="1"
            :false-value="0"
            label="Tanggungan"
            dense
          ></v-checkbox>
          <v-checkbox
            v-model="familyDependant.alive_status"
            :true-value="0"
            :false-value="1"
            label="Meninggal dunia"
            dense
          ></v-checkbox>
          <v-btn
            :loading="loading"
            type="submit"
            color="primary"
            class="text-capitalize"
          >
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Simpan
          </v-btn>
          <v-btn color="red" dark @click="deleteFamily">
            <v-icon class="mr-2">mdi-delete</v-icon>
            Hapus
          </v-btn>
          <v-btn color="success" @click="$router.back()">Kembali</v-btn>
        </form>
      </validation-observer>
    </v-container>
  </v-card>
</template>

<script>
// eslint-disable-next-line camelcase
import { required, required_if } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} harus diisi.',
})

extend('required_if', {
  // eslint-disable-next-line camelcase
  ...required_if,
  message: 'Anak ke ?',
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
      familyDependant: {
        alive_status: 1,
        appfamily_name: '',
        appfamily_address: '',
        appfamily_relationship_id: 1,
        appfamily_birthplace: '',
        appfamily_gender: 1,
        appfamily_phone: '',
        appfamily_occupation: 'OTH',
        appfamily_lasteducation: 1,
        appfamily_lasteducation_status: 0,
        appfamily_documentdate: new Date().toISOString().substr(0, 10),
        appfamily_marital_status: 0,
        appfamily_dob: new Date().toISOString().substr(0, 10),
        appfamily_document_id: null,
      },
    }
  },
  async fetch() {
    await this.$store.dispatch('masterType/fetchFamilyRelationship')
    await this.$store.dispatch('masterType/fetchCity')
    await this.$store.dispatch('masterType/fetchOccupation')
    await this.$store.dispatch('masterType/fetchMaritalStatus')
    await this.$store.dispatch('masterType/fetchEducationType')
    await this.getFamily()
  },
  methods: {
    async getFamily() {
      const response = await this.$axios.get(
        '/profile/family?id=' + this.$route.params.edit
      )
      this.familyDependant = response.data
      if (typeof response.data.appfamily_gender === 'string') {
        this.familyDependant.appfamily_gender = parseInt(
          response.data.appfamily_gender
        )
      }
      if (typeof response.data.appfamily_marital_status === 'string') {
        this.familyDependant.appfamily_marital_status = parseInt(
          response.data.appfamily_marital_status
        )
      }
    },
    async deleteFamily() {
      if (confirm(`Hapus data ${this.familyDependant.appfamily_name}`) === true) {
        try {
          await this.$axios.delete(
            '/profile/family?id=' + this.$route.params.edit
          )
          this.$router.back()
        } catch (error) {
          alert(error)
        }
      }
    },
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true
          const formData = new FormData()

          for (const key in this.familyDependant) {
            if (key === 'appfamily_document_id') {
              if (this.familyDependant[key] == null) {
                continue
              }
            }
            formData.append(key, this.familyDependant[key])
          }

          await this.$axios.put('/profile/family', this.familyDependant)
          this.$router.back()
        } catch (error) {
          alert(error)
        }
      }
    },
  },
}
</script>
