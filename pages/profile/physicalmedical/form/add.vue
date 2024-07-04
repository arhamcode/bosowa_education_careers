<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-medical-bag</v-icon>
      Tambah riwayat kesehatan
    </v-card-title>
    <v-divider></v-divider>
    <loading-progress v-if="$fetchState.pending"></loading-progress>
    <v-container v-else fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <v-row dense>
            <v-col>
              <arham-datepicker
                v-model="medicalHistory.start_date"
                label="Tanggal mulai"
                :max="medicalHistory.end_date"
              ></arham-datepicker>
            </v-col>
            <v-col>
              <arham-datepicker
                v-model="medicalHistory.end_date"
                label="Tanggal selesai"
                :min="medicalHistory.start_date"
                :max="$dayjs().format('YYYY-MM-DD')"
              ></arham-datepicker>
            </v-col>
          </v-row>
          <v-autocomplete
            v-model="medicalHistory.hospital_code"
            :items="$store.getters['masterType/hospital']"
            item-text="name"
            item-value="id"
            label="Rumah Sakit / Puskesmas / Klinik / Lab / Lokasi vaksinasi"
            dense
            outlined
          ></v-autocomplete>
          <v-select
            v-model="medicalHistory.doctor_code"
            :items="$store.getters['masterType/doctor']"
            label="Dokter"
            item-text="name"
            item-value="id"
            dense
            outlined
          ></v-select>
          <v-select
            v-model="medicalHistory.disease"
            label="Penyakit / Langkah Medis"
            :items="$store.getters['masterType/disease']"
            item-text="name"
            item-value="id"
            dense
            outlined
          ></v-select>
          <v-row v-if="medicalHistory.disease === 'VAC'">
            <v-col>
              <v-select
                v-model="medicalHistory.medical_action_type"
                :items="$store.getters['masterType/vaccineType']"
                item-text="name"
                item-value="id"
                label="Jenis Vaksin"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="medicalHistory.medical_action_phase"
                type="number"
                :items="[1, 2, 3]"
                label="Fase vaksinasi"
                dense
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-select
            v-model="medicalHistory.medical_category"
            label="Hasil pemeriksaan"
            dense
            outlined
            :items="$store.getters['masterType/healthLevel']"
            item-text="name"
            item-value="id"
          ></v-select>
          <validation-provider
            v-slot="{ errors }"
            name="Dokumen"
            vid="docfile"
            rules="required"
          >
            <v-file-input
              v-model="docfile"
              accept="application/pdf"
              :error-messages="errors"
              label="Dokumen"
              dense
              outlined
            ></v-file-input>
          </validation-provider>
          <v-btn :loading="loading" color="primary" type="submit">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Simpan
          </v-btn>
          <v-btn color="success" @click="$router.back()">Kembali</v-btn>
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
      medicalHistory: {
        start_date: this.$dayjs().format('YYYY-MM-DD'),
        end_date: this.$dayjs().format('YYYY-MM-DD'),
        // hospital_code: null,
        // doctor_code: null,
        // disease: null,
        // lab_code: null,
        // lab_conclusion: null,
        // medicalresult_code: null,
        // medical_category: null,
        // medical_action_type: null,
        // medical_action_phase: null,
      },
      docfile: null,
    }
  },
  async fetch() {
    await this.$store.dispatch('masterType/fetchHospital')
    await this.$store.dispatch('masterType/fetchDoctor')
    await this.$store.dispatch('masterType/fetchDisease')
    await this.$store.dispatch('masterType/fetchVaccineType')
    await this.$store.dispatch('masterType/fetchHealthLevel')
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true
          const formData = new FormData()
          for (const key in this.medicalHistory) {
            formData.append(key, this.medicalHistory[key])
          }
          if (this.docfile) {
            formData.append('medical_docfile', this.docfile)
          }
          await this.$axios.post('/profile/medical', formData)
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
