<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-certificate-outline</v-icon>
      Ubah sertifikasi
    </v-card-title>
    <v-divider />
    <loading-progress v-if="$fetchState.pending" />
    <v-container v-else fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Nama sertifikasi"
            vid="cert_name"
            rules="required"
          >
            <v-text-field
              v-model="certification.cert_name"
              :error-messages="errors"
              dense
              outlined
            >
              <template #label>
                Nama sertifikasi <span class="red--text">*</span>
              </template>
            </v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Nomor sertifikat"
            vid="certificate_no"
            rules="required"
          >
            <v-text-field
              v-model="certification.certificate_no"
              :error-messages="errors"
              dense
              outlined
            >
              <template #label>
                Nomor sertifikasi <span class="red--text">*</span>
              </template>
            </v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Deskripsi"
            vid="cert_description"
            rules="required"
          >
            <v-textarea
              v-model="certification.cert_desc"
              :error-messages="errors"
              rows="2"
              dense
              outlined
            >
              <template #label>
                Deskripsi <span class="red--text">*</span>
              </template>
            </v-textarea>
          </validation-provider>
          <v-row dense>
            <v-col>
              <v-dialog
                ref="dialog"
                v-model="certDatePicker"
                :return-value.sync="certification.cert_date"
                persistent
                width="290px"
              >
                <template #activator="{ on, attrs }">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Tanggal sertifikasi"
                    vid="cert_date"
                    rules="required"
                  >
                    <v-text-field
                      v-model="certification.cert_date"
                      label="Tanggal sertifikasi"
                      prepend-inner-icon="mdi-calendar"
                      :error-messages="errors"
                      readonly
                      dense
                      outlined
                      v-bind="attrs"
                      v-on="on"
                    >
                      <template #label>
                        Tanggal sertifikasi <span class="red--text">*</span>
                      </template>
                    </v-text-field>
                  </validation-provider>
                </template>
                <v-date-picker
                  v-model="certification.cert_date"
                  :max="$dayjs().format('YYYY-MM-DD')"
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="certDatePicker = false">
                    Tutup
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(certification.cert_date)"
                  >
                    Terapkan
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col>
              <v-dialog
                ref="dialog2"
                v-model="certExpiredPicker"
                :return-value.sync="certification.cert_expired"
                persistent
                width="290px"
              >
                <template #activator="{ on, attrs }">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Tanggal kadaluwarsa"
                    vid="cert_expired"
                    rules="required"
                  >
                    <v-text-field
                      v-model="certification.cert_expired"
                      label="Tanggal kadaluwarsa"
                      prepend-inner-icon="mdi-calendar"
                      :error-messages="errors"
                      readonly
                      dense
                      outlined
                      v-bind="attrs"
                      v-on="on"
                    >
                      <template #label>
                        Tanggal kadaluwarsa <span class="red--text">*</span>
                      </template>
                    </v-text-field>
                  </validation-provider>
                </template>
                <v-date-picker
                  v-model="certification.cert_expired"
                  :min="certification.cert_date"
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="certExpiredPicker = false"
                  >
                    Tutup
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog2.save(certification.cert_expired)"
                  >
                    Terapkan
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>
          <v-btn :loading="loading" color="primary" type="submit">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Simpan
          </v-btn>
          <v-btn color="red" dark @click="deleteCertification">
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
      certDatePicker: false,
      certExpiredPicker: false,
      loading: false,
      certification: {
        cert_name: '',
        certificate_no: '',
        cert_desc: '',
        cert_date: null,
        cert_expired: null,
      },
    }
  },
  async fetch() {
    await this.getCertification()
  },
  methods: {
    async getCertification() {
      const response = await this.$axios.get(
        '/profile/certification?id=' + this.$route.params.edit
      )
      this.certification = response.data
    },
    async deleteCertification() {
      if (confirm(`Hapus ${this.certification.cert_name}`) === true) {
        try {
          await this.$axios.delete(
            '/profile/certification?id=' + this.$route.params.edit
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
          await this.$axios.put('/profile/certification', this.certification)
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
