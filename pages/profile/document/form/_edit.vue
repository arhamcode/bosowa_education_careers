<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-text-box-multiple-outline</v-icon>
      Ubah dokumen personal
    </v-card-title>
    <loading-progress v-if="$fetchState.pending" />
    <v-container v-else fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <v-select
            v-model="document.checklist_no"
            label="Jenis dokumen"
            :items="$store.getters['masterType/documentType']"
            item-text="name"
            item-value="id"
            readonly
            dense
            outlined
          ></v-select>
          <validation-provider
            v-slot="{ errors }"
            name="File"
            vid="docFile"
            rules="size:2000|mimes:application/pdf"
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
          <v-btn
            v-if="document.file_name"
            color="primary"
            class="mb-5"
            small
            :href="`http://hris.bosowa.co.id/rest_api_jova/file/document?filename=${document.file_name}`"
            target="_blank"
          >
            Lihat file
          </v-btn>

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
          <v-btn color="red" dark @click="deleteDocument">
            <v-icon class="mr-2">mdi-delete</v-icon>
            Hapus
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
        document_date: null,
        document_remark: '',
      },
    }
  },
  async fetch() {
    await this.$store.dispatch('masterType/fetchDocumentType')
    await this.getDocument()
  },
  methods: {
    async getDocument() {
      const response = await this.$axios.get(
        '/profile/document?id=' + this.$route.params.edit
      )
      this.document = response.data
    },
    async deleteDocument() {
      const documentTypeName = this.$store.getters[
        'masterType/documentType'
      ].find((element) => element.id === this.document.checklist_no).name

      if (confirm('Hapus ' + documentTypeName) === true) {
        await this.$axios.delete(
          '/profile/document?id=' + this.$route.params.edit
        )
        this.$router.back()
      }
    },
    async submit() {
      if (await this.$refs.observer.validate()) {
        const formData = new FormData()

        formData.append('mode', 'update')

        for (const i in this.document) {
          formData.append(i, this.document[i])
        }
        if (this.docFile) {
          formData.append('document_file', this.docFile)
        }

        try {
          this.loading = true
          await this.$axios.post('/profile/document', formData)
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
