<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-account-hard-hat</v-icon>
      Ubah pengalaman kerja
    </v-card-title>
    <v-divider />
    <loading-progress v-if="$fetchState.pending" />
    <v-container v-else fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Nama perusahaan"
            vid="company_name"
            rules="required"
          >
            <v-text-field
              v-model="jobExperience.company_name"
              :error-messages="errors"
              dense
              outlined
            >
              <template #label>
                Nama perusahaan <span class="red--text">*</span>
              </template>
            </v-text-field>
          </validation-provider>
          <v-select
            v-model="jobExperience.lob_id"
            label="Bidang usaha"
            dense
            outlined
            :items="$store.getters['masterType/lineOfBussiness']"
            item-text="name"
            item-value="id"
          ></v-select>
          <validation-provider
            v-slot="{ errors }"
            name="Alamat perusahaan"
            vid="company_addr"
            rules="required"
          >
            <v-textarea
              v-model="jobExperience.company_addr"
              :error-messages="errors"
              rows="2"
              dense
              outlined
            >
              <template #label>
                Alamat perusahaan <span class="red--text">*</span>
              </template>
            </v-textarea>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Jabatan"
            vid="job_position"
            rules="required"
          >
            <v-text-field
              v-model="jobExperience.job_position"
              :error-messages="errors"
              dense
              outlined
            >
              <template #label>
                Jabatan <span class="red--text">*</span>
              </template>
            </v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Deskripsi pekerjaan"
            vid="job_desc"
            rules="required"
          >
            <v-textarea
              v-model="jobExperience.job_desc"
              :error-messages="errors"
              dense
              outlined
              rows="2"
            >
              <template #label>
                Deskripsi pekerjaan <span class="red--text">*</span>
              </template>
            </v-textarea>
          </validation-provider>
          <v-row dense>
            <v-col>
              <v-text-field
                v-model="jobExperience.superior_name"
                label="Nama atasan langsung"
                dense
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="jobExperience.superior_position"
                label="Jabatan atasan langsung"
                dense
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="jobExperience.phone"
                label="Nomor telepon atasan langsung"
                dense
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-text-field
                v-model="jobExperience.start_salary"
                label="Gaji awal (IDR)"
                dense
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Jenis penggajian"
                vid="start_type_salary"
                rules="required"
              >
                <v-select
                  v-model="jobExperience.start_type_salary"
                  :error-messages="errors"
                  :items="$store.getters['masterType/paymentType']"
                  item-text="name"
                  item-value="id"
                  dense
                  outlined
                >
                  <template #label>
                    Jenis penggajian <span class="red--text">*</span>
                  </template>
                </v-select>
              </validation-provider>
            </v-col>
            <v-col>
              <v-text-field
                v-model="jobExperience.last_salary"
                label="Gaji terakhir (IDR)"
                dense
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Jenis penggajian"
                vid="type_salary"
                rules="required"
              >
                <v-select
                  v-model="jobExperience.type_salary"
                  :error-messages="errors"
                  :items="$store.getters['masterType/paymentType']"
                  item-text="name"
                  item-value="id"
                  dense
                  outlined
                >
                  <template #label>
                    Jenis penggajian <span class="red--text">*</span>
                  </template>
                </v-select>
              </validation-provider>
            </v-col>
          </v-row>
          <v-select
            v-model="jobExperience.gross_netto"
            label="Nett/Gross"
            :items="['Gross', 'Netto']"
            dense
            outlined
          ></v-select>
          <v-row dense>
            <v-col>
              <v-textarea
                v-model="jobExperience.benefit"
                label="Fasilitas yang didapatkan"
                rows="2"
                dense
                outlined
              ></v-textarea>
            </v-col>
            <v-col>
              <v-textarea
                v-model="jobExperience.achievement"
                label="Pencapaian"
                rows="2"
                dense
                outlined
              ></v-textarea>
            </v-col>
          </v-row>
          <v-select
            v-model="jobExperience.resigncause_id"
            label="Alasan keluar"
            :items="$store.getters['masterType/resignCause']"
            item-text="name"
            item-value="id"
            dense
            outlined
          ></v-select>
          <v-text-field
            v-model="jobExperience.termination_reason"
            label="Deskripsi"
            dense
            outlined
          ></v-text-field>
          <v-row dense>
            <v-col>
              <v-select
                v-model="jobExperience.start_month"
                :items="$store.getters['masterType/month']"
                label="Bulan masuk"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="jobExperience.start_year"
                :items="years"
                label="Tahun masuk"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="jobExperience.end_month"
                :items="$store.getters['masterType/month']"
                label="Bulan keluar"
                dense
                outlined
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="jobExperience.end_year"
                :items="years"
                label="Tahun keluar"
                dense
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-btn type="submit" color="primary">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Simpan
          </v-btn>
          <v-btn color="red" dark @click="deleteJobExperience">
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
      loading: false,
      years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
      jobExperience: {
        job_position: '',
        company_name: '',
        company_addr: '',
        start_salary: 0,
        last_salary: 0,
        start_month: 1,
        end_month: 1,
        start_year: 2022,
        end_year: 2022,
        job_desc: '',
        type_salary: 6,
        start_type_salary: 6,
        lob_id: 5,
        superior_name: '',
        superior_position: '',
        phone: '',
        achievement: '',
        benefit: '',
        resigncause_id: 1,
        termination_reason: '',
      },
    }
  },
  async fetch() {
    await this.$store.dispatch('masterType/fetchPaymentType')
    await this.$store.dispatch('masterType/fetchLineOfBussiness')
    await this.$store.dispatch('masterType/fetchResignCause')
    await this.getJobExperince()
  },
  methods: {
    async deleteJobExperience() {
      if (confirm('Hapus ' + this.jobExperience.company_name) === true) {
        await this.$axios.delete(
          '/profile/jobexperience?id=' + this.$route.params.edit
        )
        this.$router.back()
      }
    },
    async getJobExperince() {
      const response = await this.$axios.get(
        '/profile/jobexperience?id=' + this.$route.params.edit
      )
      this.jobExperience = response.data
    },
    async submit() {
      if (await this.$refs.observer.validate()) {
        try {
          this.loading = true
          await this.$axios.put('/profile/jobexperience', this.jobExperience)
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
