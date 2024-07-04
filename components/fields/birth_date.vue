<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        prepend-inner-icon="mdi-calendar"
        outlined
        label="Tanggal lahir"
        dense
        :error-messages="errorMessages"
        readonly
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <!-- :max="$dayjs().subtract(20, 'year').format('YYYY-MM-DD')"
      :min="$dayjs().subtract(60, 'year').format('YYYY-MM-DD')" -->
    <v-date-picker
      v-model="date"
      :active-picker.sync="activePicker"
      :max="maxDate"
      :min="minDate"
      @change="save"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Date],
      default() {
        return this.$dayjs().format('YYYY-MM-DD')
      },
    },
    maxDate: {
      type: [String, undefined],
      default() {
        return undefined
      }
    },
    minDate: {
      type: [String, undefined],
      default() {
        return undefined
      }
    },
    errorMessages: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data: () => ({
    activePicker: null,
    menu: false,
  }),
  computed: {
    date: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      },
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },
  },
}
</script>
