<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-text-box-multiple-outline</v-icon>
      Tambah dokumen personal
    </v-card-title>
    <v-container fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Jenis dokumen"
            vid="checklist_no"
          >
            <v-select
              v-model="document.checklist_no"
              label="Jenis dokumen"
              :error-messages="errors"
              :items="$store.getters['masterType/documentType']"
              item-text="name"
              item-value="id"
              dense
              outlined
            ></v-select>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="File"
            vid="docFile"
            rules="required|size:2000|mimes:application/pdf"
          >
            <v-file-input
              v-model="docFile"
              :error-messages="errors"
              hint="File PDF maksimal 2MB"
              dense
              outlined
            >
              <template #label>
                File <span class="red--text">*</span>
              </template>
            </v-file-input>
          </validation-provider>

          <arham-datepicker
            v-model="document.document_date"
            label="Tanggal dokumen"
            :max="$dayjs().format('YYYY-MM-DD')"
          />

          <v-textarea
            v-model="document.document_remark"
            label="Deskripsi"
            rows="2"
            dense
            outlined
          ></v-textarea>
          <v-btn :loading="loading" color="primary" type="submit">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Simpan
          </v-btn>
          <v-btn color="success" @click="$router.back()"> Kembali </v-btn>
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
  message: 'Maksimal ukuran file {_size_}MB.',
})

extend('mimes', {
  ...mimes,
  message: 'Jenis file yang didukung hanya PDF.',
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
      docFile: null,
      document: {
        checklist_no: 7,
        document_date: this.$dayjs().format('YYYY-MM-DD'),
        document_remark: '',
      },
    }
  },
  async fetch() {
    await this.$store.dispatch('masterType/fetchDocumentType')
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        const formData = new FormData()

        formData.append('mode', 'insert')

        for (const i in this.document) {
          formData.append(i, this.document[i])
        }
        formData.append('document_file', this.docFile)

        try {
          this.loading = true
          await this.$axios.post('/profile/document', formData)
          this.$router.back()
        } catch (error) {
          if (error.response && error.response.data) {
            if (error.response.data.errorCode === 'DOC_EXISTS') {
              this.$refs.observer.setErrors({
                checklist_no: [error.response.data.message],
              })
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
