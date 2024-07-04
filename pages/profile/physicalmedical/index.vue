<template>
  <div>
    <v-card>
      <v-card-title>
        <v-icon class="mr-2">mdi-medical-bag</v-icon>
        Fisik
      </v-card-title>
      <v-divider />
      <v-container fluid>
        <v-form>
          <v-row dense>
            <v-col cols="12" md="6" lg="2">
              <v-text-field
                v-model="physical.height"
                label="Tinggi badan"
                suffix="cm"
                dense
                outlined
              />
            </v-col>
            <v-col cols="12" md="6" lg="2">
              <v-text-field
                v-model="physical.weight"
                label="Berat badan"
                suffix="kg"
                dense
                outlined
              />
            </v-col>
            <v-col cols="12" md="6" lg="2">
              <v-text-field
                v-model="physical.head_measure"
                label="Ukuran kepala"
                suffix="cm"
                dense
                outlined
              />
            </v-col>
            <v-col cols="12" md="6" lg="2">
              <v-text-field
                v-model="physical.shoes_size"
                label="Ukuran sepatu (EU)"
                type="number"
                dense
                outlined
              />
            </v-col>
            <v-col cols="12" md="6" lg="2">
              <v-select
                v-model="physical.cloth_size"
                label="Ukuran baju"
                :items="$store.getters['masterType/clothSize']"
                dense
                outlined
              />
            </v-col>
            <v-col cols="12" md="6" lg="2">
              <v-text-field
                v-model="physical.pant_size"
                label="Ukuran celana"
                dense
                outlined
              />
            </v-col>
          </v-row>
          <v-select
            v-model="arrayDisability"
            label="Memiliki kekurangan fisik"
            multiple
            :items="$store.getters['masterType/disability']"
            item-text="name"
            item-value="id"
            dense
            outlined
          />
          <v-select
            v-model="physical.blood_type"
            label="Golongan darah"
            :items="$store.getters['masterType/bloodType']"
            dense
            outlined
          />
          <v-textarea
            v-model="physical.medical_aware"
            label="Kondisi kesehatan yang harus diperhatikan"
            rows="2"
            dense
            outlined
          />
          <v-btn color="primary" @click="savePhysical">
            <v-icon class="mr-2">mdi-content-save</v-icon>
            Simpan
          </v-btn>
        </v-form>
      </v-container>
    </v-card>
    <v-card class="mt-3">
      <v-card-title>
        <v-icon class="mr-2">mdi-medical-bag</v-icon>
        Riwayat kesehatan
        <v-spacer />
        <v-btn color="primary" to="/profile/physicalmedical/form/add">
          <v-icon class="mr-2">mdi-plus</v-icon>
          Tambah
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-data-table :headers="headers" :items="medical">
        <template #[`item.disease_name`]="{ item }">
          {{ item.disease_name }}
          <span v-if="item.medical_action_phase"> ke {{ item.medical_action_phase }} [{{ item.vaccine_name }}]</span>
        </template>
      </v-data-table>
    </v-card>
    <arham-dialog ref="dialog" />
  </div>
</template>

<script>
export default {
  layout: 'profile_layout',
  data() {
    return {
      physical: {
        height: 0,
        weight: 0,
        head_measure: 0,
        shoes_size: 0,
        cloth_size: 'S',
        pant_size: 0,
        blood_type: 'N/A',
        disabilitycode: '',
        medical_aware: '',
      },
      medical: [],
      headers: [
        { text: 'Tanggal', value: 'start_date' },
        { text: 'Nama rumah sakit', value: 'hospital_name' },
        { text: 'Nama Dokter', value: 'doctor_name' },
        { text: 'Penyakit / Langkah Medis', value: 'disease_name' },
        { text: 'Catatan Laboratorium', value: 'lab_conclusion' },
      ],
    }
  },
  async fetch() {
    await this.$store.dispatch('masterType/fetchDisability')
    await this.getPhysical()
    await this.getMedical()
  },
  head: {
    title: 'Fisik & kesehatan',
  },
  computed: {
    arrayDisability: {
      get() {
        return this.physical.disabilitycode.split(',')
      },
      set(value) {
        this.physical.disabilitycode = value.join()
      },
    },
  },
  methods: {
    async getMedical() {
      try {
        const response = await this.$axios.get('/profile/medical')
        this.medical = response.data
      } catch (error) {
        alert(error)
      }
    },
    async getPhysical() {
      try {
        const response = await this.$axios.get('/profile/physical')
        this.physical = response.data
      } catch (error) {
        alert(error)
      }
    },
    async savePhysical() {
      try {
        const response = await this.$axios.post(
          '/profile/physical',
          this.physical
        )
        if (response.data.status) {
          await this.getPhysical()
          this.$refs.dialog.open({
            title: 'Sukses',
            message: 'Informasi fisik berhasil diperbarui',
            closeButton: false,
          })
        }
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>
