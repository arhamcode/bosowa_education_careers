<template>
  <v-container fluid>
    <loading-progress v-if="$fetchState.pending" />
    <div v-else>
      <v-card>
        <v-card-title>
          {{ vacancy.position_name }} [{{ vacancy.request_code }}]
        </v-card-title>
        <v-card-subtitle>
          {{ vacancy.company_name }} | Tanggal posting :
          {{ $dayjs(vacancy.required_date).format('dddd, D MMMM YYYY') }}
        </v-card-subtitle>
      </v-card>

      <v-row dense>
        <v-col>
          <v-card class="mt-2">
            <v-card-title>Spesifikasi lowongan</v-card-title>
            <v-list dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon small color="success">mdi-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  Jenis kelamin
                  {{ $store.getters['masterType/genderSpec'][vacancy.gender_id] }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="vacancy.married_id < 2">
                <v-list-item-icon>
                  <v-icon small color="success">mdi-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{
                  $store.getters['masterType/marriedSpec'][vacancy.married_id]
                }}</v-list-item-title>
              </v-list-item>
              <v-list-item v-if="vacancy.age || vacancy.ageto">
                <v-list-item-icon>
                  <v-icon small color="success">mdi-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  Umur
                  <span v-if="vacancy.age && vacancy.ageto">
                    {{ vacancy.age }} - {{ vacancy.ageto }} tahun.
                  </span>
                  <span v-else-if="vacancy.age && !vacancy.ageto">
                    minimal {{ vacancy.age }} tahun.
                  </span>
                  <span v-else-if="!vacancy.age && vacancy.ageto">
                    maksimal {{ vacancy.ageto }} tahun.
                  </span>
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="vacancy.gpa > 0">
                <v-list-item-icon>
                  <v-icon small color="success">mdi-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  IPK minimal {{ vacancy.gpa }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon small color="success">mdi-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ vacancy.worktype }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>

          <v-card v-if="vacancy.jobDesc" class="mt-2">
            <v-card-title>Deskripsi pekerjaan</v-card-title>
            <v-container>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div v-html="vacancy.jobDesc"></div>
            </v-container>
            <!--
            <template v-for="(jobS, index) in vacancy.jobSpec">
              <v-subheader :key="index">{{ index }}</v-subheader>
              <v-list :key="`${index}xxx`" dense>
                <v-list-item v-for="desc in jobS" :key="desc">
                  <v-list-item-icon>
                    <v-icon small color="success">mdi-circle</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{ desc }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </template>
            -->
          </v-card>
        </v-col>
        <v-col>
          <v-card class="mt-2">
            <v-card-title>Form lamaran</v-card-title>
            <v-container fluid>
              <validation-observer ref="observer">
                <form @submit.prevent="submit">
                  <validation-provider
                    v-slot="{ errors }"
                    vid="medium"
                    name="Sumber informasi lowongan"
                    rules="required"
                  >
                    <v-select
                      v-model="applyData.medium"
                      :items="mediums"
                      dense
                      :error-messages="errors"
                      label="Sumber informasi lowongan*"
                      outlined
                      item-text="name"
                      item-value="id"
                    />
                  </validation-provider>
                  <v-row dense> 
                    <v-col cols="12" md="6">
                      <validation-provider
                        v-slot="{ errors }"
                        name="Gaji yang diharapkan"
                        vid="expectedSalary"
                        rules="required|numeric|min_value:1"
                      >
                        <v-text-field
                          v-model="applyData.expectedSalary"
                          outlined
                          :error-messages="errors"
                          dense
                          prefix="IDR"
                          label="Gaji yang diharapkan*"
                        ></v-text-field>
                      </validation-provider>
                    </v-col>
                    <v-col cols="12" md="6">
                      <validation-provider
                        v-slot="{ errors }"
                        name="Gaji sebelumnya"
                        vid="currentSalary"
                        rules="required|numeric"
                      >
                        <v-text-field
                          v-model="applyData.currentSalary"
                          outlined
                          dense
                          :error-messages="errors"
                          prefix="IDR"
                          label="Gaji sebelumnya (jika pernah bekerja)"
                        ></v-text-field>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="12" md="6">
                      <validation-provider
                        v-slot="{ errors }"
                        name="Fasilitas yang diharapkan"
                        vid="expectedBenefit"
                        rules="required"
                      >
                        <v-text-field
                          v-model="applyData.expectedBenefit"
                          dense
                          :error-messages="errors"
                          outlined
                          label="Fasilitas yang diharapkan*"
                        ></v-text-field>
                      </validation-provider>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="applyData.currentBenefit"
                        dense
                        outlined
                        placeholder="Fasilitas sebelumnya"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Bersedia ditempatkan diseluruh wilayah Indonesia"
                    vid="appReady"
                    :rules="{ checkbox_required: { allowFalse: false } }"
                  >
                    <v-checkbox
                      v-model="applyData.appReady"
                      :error-messages="errors"
                      dense
                      class="mb-2"
                      :true-value="true"
                      :false-value="false"
                      label="Bersedia ditempatkan diseluruh wilayah Indonesia*"
                    ></v-checkbox>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Curriculum Vitae"
                    vid="cvFile"
                    rules="required_doc|size_doc:5000|mime_document:application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  >
                    <v-file-input
                      v-model="applyData.cvFile"
                      :error-messages="errors"
                      dense
                      outlined
                      label="Curriculum Vitae*"
                    ></v-file-input>
                  </validation-provider>
                  <v-btn type="submit" color="primary" :loading="loading">
                    <v-icon class="mr-2">mdi-send-circle</v-icon>
                    Ajukan lamaran
                  </v-btn>
                </form>
              </validation-observer>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <arham-dialog ref="dialog" />
  </v-container>
</template>

<script>
import {
  required,
  numeric,
  // eslint-disable-next-line camelcase
  min_value,
  mimes,
  size,
} from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'

setInteractionMode('eager')

extend('size_doc', {
  ...size,
  message: 'Ukuran dokumen {_field_} maksimal {size}KB.',
})

extend('mime_document', {
  ...mimes,
  message: 'Format file yang didukung hanya PDF dan DOCX',
})

extend('checkbox_required', {
  ...required,
  message: 'Persetujuan diatas dibutuhkan untuk pengajuan lamaran.',
})

extend('required', {
  ...required,
  message: '{_field_} harus terisi.',
})

extend('required_doc', {
  ...required,
  message: '{_field_} dibutuhkan untuk pengajuan lamaran.',
})

extend('numeric', {
  ...numeric,
  message: 'Mohon isi dengan karakter angka (numerik).',
})

extend('min_value', {
  // eslint-disable-next-line camelcase
  ...min_value,
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
      vacancy: {
        position_name: ''
      },
      // marriedSpec: ['Belum menikah', 'Menikah'],
      // genderSpec: ['pria', 'wanita', 'pria/wanita'],
      mediums: [],
      applyData: {
        medium: null,
        expectedSalary: 0,
        currentSalary: 0,
        expectedBenefit: '',
        currentBenefit: '',
        cvFile: null,
        appReady: false,
      },
    }
  },
  async fetch() {
    // Get medium type
    try {
      const response = await this.$axios.get('/type/medium')
      this.mediums = response.data
    } catch (error) {
      this.$nuxt.error({
        statusCode: 400,
        message: 'Tidak dapat memuat medium.',
      })
    }

    // Get vacancy
    try {
      const response = await this.$axios.get(
        `/vacancy?request_code=${this.$route.query.id}`
      )

      if (!Array.isArray(response.data)) {
        this.vacancy = response.data
      } else {
        this.$nuxt.error({
          statusCode: 404,
          message: 'Halaman tidak ditemukan.',
        })
      }
    } catch (error) {
      this.$nuxt.error({
        statusCode: 404,
        message: 'Halaman tidak ditemukan.',
      })
    }
  },
  head() {
    return {
      title: this.vacancy.position_name
    }
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true

          const formData = new FormData()
          for (const data in this.applyData) {
            formData.append(data, this.applyData[data])
          }
          formData.append('requestCode', this.$route.query.id)

          const response = await this.$axios.post('/historyapply', formData)

          if (response.data.status) {
            this.$refs.dialog
              .open({
                title: 'Sukses',
                message: 'Pengajuan lamaran berhasil.',
                closeButton: false,
              })
              .then((result) => this.$router.replace('/vacancy/history'))
          } else {
            alert(response.data)
          }
        } catch (error) {
          if (error.response && error.response.data.errorCode) {
            switch (error.response.data.errorCode) {
              case 'EMAIL_CONFIRM':
              case 'HAS_ACTIVE_HISTORY':
                this.$refs.dialog.open({
                  title: 'Gagal',
                  message: error.response.data.message,
                  closeButton: false,
                  type: 'warning',
                })
                break
              default:
                this.$refs.dialog.open({
                  title: 'Gagal',
                  message: error.response.data.message,
                  closeButton: false,
                  type: 'warning',
                })
                break
            }
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
