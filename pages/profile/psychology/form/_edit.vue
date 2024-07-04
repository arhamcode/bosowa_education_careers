<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-head-cog-outline</v-icon>
      Ubah tes psikologi
    </v-card-title>
    <v-divider />
    <loading-progress v-if="$fetchState.pending" />
    <v-container v-else fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Subjek"
            vid="test_subject"
            rules="required"
          >
            <v-text-field
              v-model="psychology.test_subject"
              dense
              outlined
              :error-messages="errors"
            >
              <template #label>
                Subjek <span class="red--text">*</span>
              </template>
            </v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Institusi"
            vid="test_institution"
            rules="required"
          >
            <v-text-field
              v-model="psychology.test_institution"
              dense
              outlined
              :error-messages="errors"
            >
              <template #label>
                Institusi <span class="red--text">*</span>
              </template>
            </v-text-field>
          </validation-provider>

          <v-dialog
            ref="dialog"
            v-model="modalDate"
            :return-value.sync="psychology.test_date"
            persistent
            width="290px"
          >
            <template #activator="{ on, attrs }">
              <validation-provider
                v-slot="{ errors }"
                name="Tanggal"
                vid="test_date"
                rules="required"
              >
                <v-text-field
                  v-model="psychology.test_date"
                  label="Tanggal"
                  prepend-inner-icon="mdi-calendar"
                  :error-messages="errors"
                  readonly
                  dense
                  outlined
                  v-bind="attrs"
                  v-on="on"
                >
                  <template #label>
                    Tanggal <span class="red--text">*</span>
                  </template>
                </v-text-field>
              </validation-provider>
            </template>
            <v-date-picker
              v-model="psychology.test_date"
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
                @click="$refs.dialog.save(psychology.test_date)"
              >
                Terapkan
              </v-btn>
            </v-date-picker>
          </v-dialog>

          <!-- <validation-provider
            v-slot="{ errors }"
            name="Tanggal"
            vid="test_date"
            rules="required"
          >
            <v-text-field
              v-model="psychology.test_date"
              dense
              :error-messages="errors"
              outlined
            >
              <template #label>
                Tanggal <span class="red--text">*</span>
              </template>
            </v-text-field>
          </validation-provider> -->
          <validation-provider
            v-slot="{ errors }"
            name="Biaya"
            vid="test_cost"
            rules="required"
          >
            <v-text-field
              v-model="psychology.test_cost"
              :error-messages="errors"
              type="number"
              dense
              outlined
            >
              <template #label>Biaya <span class="red--text">*</span></template>
            </v-text-field>
          </validation-provider>
          <v-row dense>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Skor"
                vid="test_score"
                rules="required"
              >
                <v-text-field
                  v-model="psychology.test_score"
                  :error-messages="errors"
                  dense
                  outlined
                >
                  <template #label>
                    Skor <span class="red--text">*</span>
                  </template>
                </v-text-field>
              </validation-provider>
            </v-col>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Skor minimal"
                vid="scorerange_min"
                rules="required"
              >
                <v-text-field
                  v-model="psychology.scorerange_min"
                  dense
                  :error-messages="errors"
                  outlined
                  label="Skor minimal"
                >
                  <template #label>
                    Skor minimal <span class="red--text">*</span>
                  </template>
                </v-text-field>
              </validation-provider>
            </v-col>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Skor maksimal"
                vid="scorerange_max"
                rules="required"
              >
                <v-text-field
                  v-model="psychology.scorerange_max"
                  :error-messages="errors"
                  dense
                  outlined
                >
                  <template #label>
                    Skor maksimal <span class="red--text">*</span>
                  </template>
                </v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <v-text-field
            v-model="psychology.test_result"
            dense
            outlined
            label="Hasil tes"
          ></v-text-field>
          <v-row dense>
            <v-col>
              <v-textarea
                v-model="psychology.general_conclusion"
                dense
                outlined
                label="General conclusion"
              ></v-textarea>
            </v-col>
            <v-col>
              <v-textarea
                v-model="psychology.recomendation_result"
                dense
                outlined
                label="Recommendation result"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-text-field
            v-model="psychology.purpose"
            dense
            outlined
            label="Tujuan tes"
          ></v-text-field>
          <v-file-input
            v-model="attachmentFile"
            dense
            outlined
            label="File"
          ></v-file-input>
          <v-btn
            v-if="psychology.test_attachment"
            small
            class="mb-5"
            color="primary"
            :href="`http://hris.bosowa.co.id/rest_api_jova/file/psychologydocument?filename=${psychology.test_attachment}`"
            target="_blank"
          >
            Lihat file
          </v-btn>
          <br />
          <v-btn :loading="loading" type="submit" color="primary">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Simpan
          </v-btn>
          <v-btn color="red" dark @click="deletePsychology">
            <v-icon class="mr-2">mdi-delete</v-icon>
            Hapus
          </v-btn>
          <v-btn class="success" @click="$router.back()"> Kembali </v-btn>
        </form>
      </validation-observer>
    </v-container>
  </v-card>
</template>

<script>
import { required, email, numeric } from 'vee-validate/dist/rules'
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

extend('email', {
  ...email,
  message: 'Alamat email tidak valid.',
})

extend('phone_numeric', {
  ...numeric,
  message: 'Nomor telepon hanya dapat diisi dengan karakter angka/numerik.',
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
      attachmentFile: null,
      modalDate: false,
      psychology: {
        test_subject: '',
        test_institution: '',
        test_date: '',
        test_cost: 0,
        test_score: '',
        scorerange_min: '',
        scorerange_max: '',
        test_result: '',
        purpose: '',
        general_conclusion: '',
        recomendation_result: '',
      },
    }
  },
  async fetch() {
    await this.getPsychology()
  },
  methods: {
    async getPsychology() {
      const response = await this.$axios.get(
        '/profile/psychology?id=' + this.$route.params.edit
      )
      this.psychology = response.data
    },
    async deletePsychology() {
      if (confirm(`Hapus ${this.psychology.test_subject}`) === true) {
        await this.$axios.delete(
          '/profile/psychology?id=' + this.psychology.psychology_id
        )
        this.$router.back()
      }
    },
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true

          const formData = new FormData()

          for (const key in this.psychology) {
            formData.append(key, this.psychology[key])
          }

          if (this.attachmentFile) {
            formData.append('filePdf', this.attachmentFile)
          }

          await this.$axios.post('/profile/psychology', formData)
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
