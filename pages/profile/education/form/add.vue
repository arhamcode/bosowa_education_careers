<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-school</v-icon>
      Tambah riwayat pendidikan
    </v-card-title>
    <v-divider></v-divider>
    <loading-progress v-if="$fetchState.pending" />
    <v-container v-else fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <v-row dense>
            <v-col cols="12" md="3">
              <validation-provider
                v-slot="{ errors }"
                name="Tingkat pendidikan"
                vid="edutype_id"
                rules="required"
              >
                <v-select
                  v-model="educationHistory.edutype_id"
                  :error-messages="errors"
                  label="Tingkat pendidikan"
                  :items="$store.getters['masterType/educationType']"
                  item-text="name"
                  item-value="id"
                  dense
                  outlined
                ></v-select>
              </validation-provider>
            </v-col>
            <v-col cols="12" md="3">
              <validation-provider
                v-slot="{ errors }"
                name="Institusi"
                vid="edu_name"
                rules="required"
              >
                <v-combobox
                  v-model="educationHistory.edu_name"
                  :items="$store.getters['masterType/educationInstitution']"
                  :error-messages="errors"
                  label="Institusi"
                  item-text="name"
                  item-value="name"
                  :return-object="false"
                  dense
                  outlined
                ></v-combobox>
              </validation-provider>
            </v-col>
            <v-col cols="12" md="3">
              <validation-provider
                v-slot="{ errors }"
                name="Fakultas"
                vid="faculty"
                rules="required"
              >
                <v-combobox
                  v-model="educationHistory.faculty"
                  :items="$store.getters['masterType/faculty']"
                  :error-messages="errors"
                  item-text="name"
                  item-value="name"
                  :return-object="false"
                  label="Fakultas"
                  dense
                  outlined
                ></v-combobox>
              </validation-provider>
            </v-col>
            <v-col cols="12" md="3">
              <validation-provider
                v-slot="{ errors }"
                name="Jurusan"
                vid="major"
                rules="required"
              >
                <v-combobox
                  v-model="educationHistory.major"
                  :items="$store.getters['masterType/major']"
                  :error-messages="errors"
                  label="Jurusan"
                  item-text="name"
                  item-value="name"
                  :return-object="false"
                  dense
                  outlined
                ></v-combobox>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-select
                v-model="educationHistory.start_year"
                :items="getYearList"
                dense
                outlined
                label="Tahun mulai"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="educationHistory.end_year"
                :items="getYearList"
                dense
                outlined
                label="Tahun selesai"
              ></v-select>
            </v-col>
          </v-row>
          <v-text-field
            v-model="educationHistory.gpa"
            label="IPK"
            dense
            outlined
          ></v-text-field>
          <validation-provider
            v-slot="{ errors }"
            name="Ijazah atau SKL"
            vid="docFile"
            :rules="{
              mimes: 'application/pdf',
              size: 5000,
            }"
          >
            <v-file-input
              v-model="docFile"
              prepend-icon=""
              prepend-inner-icon="mdi-file"
              :error-messages="errors"
              label="Ijazah atau SKL"
              dense
              outlined
            ></v-file-input>
          </validation-provider>

          <v-row dense>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Nomor Ijazah"
                vid="certificate_no"
                :rules="{
                  required: docFile != null,
                }"
              >
                <v-text-field
                  v-model="educationHistory.certificate_no"
                  :error-messages="errors"
                  label="Nomor Ijazah"
                  dense
                  outlined
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col>
              <v-dialog
                ref="dialog"
                v-model="modalDate"
                :return-value.sync="educationHistory.certificate_date"
                persistent
                width="290px"
              >
                <template #activator="{ on, attrs }">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Tanggal ijazah"
                    vid="certificate_date"
                    :rules="{
                      required: docFile != null,
                    }"
                  >
                    <v-text-field
                      v-model="educationHistory.certificate_date"
                      prepend-inner-icon="mdi-calendar"
                      label="Tanggal ijazah"
                      :error-messages="errors"
                      readonly
                      dense
                      outlined
                      v-bind="attrs"
                      v-on="on"
                    >
                    </v-text-field>
                  </validation-provider>
                </template>
                <v-date-picker
                  v-model="educationHistory.certificate_date"
                  :max="$dayjs().format('YYYY-MM-DD')"
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modalDate = false">
                    Tutup
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="
                      $refs.dialog.save(educationHistory.certificate_date)
                    "
                  >
                    Terapkan
                  </v-btn>
                </v-date-picker>
              </v-dialog>
              <!-- <validation-provider
                v-slot="{ errors }"
                name="Tanggal ijazah"
                vid="certificate_date"
                :rules="{
                  required: docFile != null,
                }"
              >
                <v-text-field
                  v-model="educationHistory.certificate_date"
                  :error-messages="errors"
                  label="Tanggal ijazah"
                  dense
                  outlined
                ></v-text-field>
              </validation-provider> -->
            </v-col>
          </v-row>
          <v-checkbox
            v-model="educationHistory.is_default"
            true-value="1"
            false-value="0"
            dense
            label="Pendidikan terakhir"
          ></v-checkbox>
          <v-btn color="primary" type="submit">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Tambah
          </v-btn>
          <v-btn color="success" @click="$router.back()">Kembali</v-btn>
        </form>
      </validation-observer>
    </v-container>
  </v-card>
</template>

<script>
import { required, size, mimes } from 'vee-validate/dist/rules'
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

extend('size', {
  ...size,
  message: 'Ukuran file maksimal {size}KB.',
})

extend('mimes', {
  ...mimes,
  message: 'Format file tidak didukung. Scan Ijazah atau SKL dalam bentuk PDF.',
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  layout: 'profile_layout',
  data() {
    return {
      modalDate: false,
      educationHistory: {
        edutype_id: null,
        edu_name: null,
        faculty: '-',
        major: '-',
        start_year: new Date().getFullYear(),
        end_year: new Date().getFullYear(),
        gpa: 0,
        certificate_no: '',
        certificate_date: '',
        is_default: '0',
      },
      docFile: null,
    }
  },
  async fetch() {
    await this.$store.dispatch('masterType/fetchEducationType')
    await this.$store.dispatch('masterType/fetchEducationInstitution')
    await this.$store.dispatch('masterType/fetchFaculty')
    await this.$store.dispatch('masterType/fetchMajor')
  },
  computed: {
    getYearList() {
      const yearList = []
      for (let i = new Date().getFullYear(); i >= 1950; i--) {
        yearList.push(i)
      }
      return yearList
    },
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        const formData = new FormData()

        for (const property in this.educationHistory) {
          formData.append(`${property}`, this.educationHistory[`${property}`])
        }

        if (this.docFile) {
          formData.append('doc_file', this.docFile)
        }

        await this.$axios.post('/profile/education', formData)
        this.$router.back()
      }
    },
  },
}
</script>
