<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-2">mdi-book-open-page-variant-outline</v-icon>
      Ubah kursus
    </v-card-title>
    <v-divider />
    <loading-progress v-if="$fetchState.pending"></loading-progress>
    <v-container v-else fluid>
      <validation-observer ref="observer">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Nama kursus"
            vid="course_name"
            rules="required"
          >
            <v-text-field
              v-model="course.course_name"
              :error-messages="errors"
              dense
              outlined
            >
              <template #label>
                Nama kursus <span class="red--text">*</span>
              </template>
            </v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Institusi"
            vid="course_institution"
            rules="required"
          >
            <v-text-field
              v-model="course.course_institution"
              :error-messages="errors"
              dense
              outlined
            >
              <template #label>
                Institusi pelaksana <span class="red--text">*</span>
              </template>
            </v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Kota"
            vid="city"
            rules="required"
          >
            <v-text-field
              v-model="course.city"
              :error-messages="errors"
              dense
              outlined
            >
              <template #label>
                Kota <span class="red--text">*</span>
              </template>
            </v-text-field>
          </validation-provider>
          <v-row dense>
            <v-col>
              <v-select
                v-model="course.monthperiod_fr"
                :items="$store.getters['masterType/month']"
                dense
                outlined
                label="Bulan mulai"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="course.period_fr"
                :items="yearList"
                dense
                outlined
                label="Tahun mulai"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="course.monthperiod_to"
                :items="$store.getters['masterType/month']"
                dense
                outlined
                label="Bulan selesai"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="course.period_to"
                :items="yearList"
                dense
                outlined
                label="Tahun selesai"
              ></v-select>
            </v-col>
          </v-row>
          <v-btn color="primary" type="submit">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Simpan
          </v-btn>
          <v-btn color="red" dark @click="deleteCourse">
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
      yearList: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
      course: {
        course_name: '',
        course_institution: '',
        city: '',
        period_fr: 2022,
        period_to: 2022,
        monthperiod_fr: 1,
        monthperiod_to: 1,
      },
    }
  },
  async fetch() {
    await this.getCourse()
  },
  methods: {
    async getCourse() {
      const response = await this.$axios.get(
        '/profile/course?id=' + this.$route.params.edit
      )
      this.course = response.data
    },
    async deleteCourse() {
      if (confirm(`Hapus ${this.course.course_name}?`) === true) {
        await this.$axios.delete(
          '/profile/course?id=' + this.$route.params.edit
        )
        this.$router.back()
      }
    },
    async submit() {
      if (await this.$refs.observer.validate()) {
        await this.$axios.put('/profile/course', this.course)
        this.$router.back()
      }
    },
  },
}
</script>
