<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        :value="computedDateFormattedDayjs"
        :label="label"
        prepend-inner-icon="mdi-calendar"
        dense
        outlined
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="modelDate"
      :max="max"
      :min="min"
      @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    },
    label: {
      type: String,
      default: '',
    },
    max: {
      type: [String, null],
      default: null,
    },
    min: {
      type: [String, null],
      default: null,
    },
  },
  data() {
    return {
      menu: false,
    }
  },
  computed: {
    computedDateFormattedDayjs() {
      return this.modelDate
        ? this.$dayjs(this.modelDate).format('dddd, D MMMM YYYY')
        : ''
    },
    modelDate: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      },
    },
  },
  methods: {
    open() {
      this.menu = true
    },
  },
}
</script>
