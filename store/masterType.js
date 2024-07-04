export const state = () => ({
  city: [],
  country: [],
  state: [],
  familyRelationship: [],
  occupation: [],
  educationType: [],
  educationInstitution: [],
  faculty: [],
  major: [],
  gender: [
    { text: 'Laki-laki', value: 1 },
    { text: 'Perempuan', value: 0 },
  ],
  languageRatingLevel: [
    { name: 'Dasar', id: 1 },
    { name: 'Baik', id: 2 },
    { name: 'Sangat baik', id: 3 },
    { name: 'Bahasa ibu', id: 4 },
  ],
  languageList: [],
  maritalStatus: [],
  religion: [],
  driverLicense: ['A', 'B', 'C'],
  skillLevel: [
    { name: 'Rendah', id: 1 },
    { name: 'Menengah', id: 2 },
    { name: 'Tinggi', id: 3 },
  ],
  skills: [],
  interest: [],
  jobInterest: [],
  clothSize: ['S', 'M', 'L', 'XL', 'XXL'],
  bloodType: ['N/A', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  disability: [],
  month: [
    { text: 'Januari', value: 1 },
    { text: 'Februari', value: 2 },
    { text: 'Maret', value: 3 },
    { text: 'April', value: 4 },
    { text: 'Mei', value: 5 },
    { text: 'Juni', value: 6 },
    { text: 'Juli', value: 7 },
    { text: 'Agustus', value: 8 },
    { text: 'September', value: 9 },
    { text: 'Oktober', value: 10 },
    { text: 'November', value: 11 },
    { text: 'Desember', value: 12 },
  ],
  regexKTP:
    /^(1[1-9]|21|[37][1-6]|5[1-3]|6[1-5]|[89][12])\d{2}\d{2}([04][1-9]|[1256][0-9]|[37][01])(0[1-9]|1[0-2])\d{2}\d{4}$/,
  paymentType: [],
  lineOfBussiness: [],
  resignCause: [],
  marriedSpec: ['Belum menikah', 'Menikah'],
  genderSpec: ['pria/wanita', 'pria', 'wanita'],
  documentType: [],
  hospital: [],
  doctor: [],
  disease: [],
  vaccineType: [],
  healthLevel: []
})

export const getters = {
  city(state) {
    return state.city
  },
  country(state) {
    return state.country
  },
  state(state) {
    return state.state
  },
  gender(state) {
    return state.gender
  },
  maritalStatus(state) {
    return state.maritalStatus
  },
  religion(state) {
    return state.religion
  },
  driverLicense(state) {
    return state.driverLicense
  },
  regexKTP(state) {
    return state.regexKTP
  },
  familyRelationship(state) {
    return state.familyRelationship
  },
  occupation(state) {
    return state.occupation
  },
  educationType(state) {
    return state.educationType
  },
  educationInstitution(state) {
    return state.educationInstitution
  },
  faculty(state) {
    return state.faculty
  },
  major(state) {
    return state.major
  },
  languageRatingLevel(state) {
    return state.languageRatingLevel
  },
  languageList(state) {
    return state.languageList
  },
  skillLevel(state) {
    return state.skillLevel
  },
  skills(state) {
    return state.skills
  },
  interest(state) {
    return state.interest
  },
  jobInterest(state) {
    return state.jobInterest
  },
  clothSize(state) {
    return state.clothSize
  },
  bloodType(state) {
    return state.bloodType
  },
  disability(state) {
    return state.disability
  },
  month(state) {
    return state.month
  },
  paymentType(state) {
    return state.paymentType
  },
  lineOfBussiness(state) {
    return state.lineOfBussiness
  },
  resignCause(state) {
    return state.resignCause
  },
  marriedSpec(state) {
    return state.marriedSpec
  },
  genderSpec(state) {
    return state.genderSpec
  },
  documentType(state) {
    return state.documentType
  },
  hospital(state) {
    return state.hospital
  },
  doctor(state) {
    return state.doctor
  },
  disease(state) {
    return state.disease
  },
  vaccineType(state) {
    return state.vaccineType
  },
  healthLevel(state) {
    return state.healthLevel
  }
}

export const mutations = {
  saveCity(state, payload) {
    state.city = payload
  },
  saveCountry(state, payload) {
    state.country = payload
  },
  saveState(state, payload) {
    state.state = payload
  },
  saveReligion(state, payload) {
    state.religion = payload
  },
  saveMaritalStatus(state, payload) {
    state.maritalStatus = payload
  },
  saveFamilyRelationship(state, payload) {
    state.familyRelationship = payload
  },
  saveOccupation(state, payload) {
    state.occupation = payload
  },
  saveEducationType(state, payload) {
    state.educationType = payload
  },
  saveEducationInstitution(state, payload) {
    state.educationInstitution = payload
  },
  saveFaculty(state, payload) {
    state.faculty = payload
  },
  saveMajor(state, payload) {
    state.major = payload
  },
  saveLanguageList(state, payload) {
    state.languageList = payload
  },
  saveSkills(state, payload) {
    state.skills = payload
  },
  saveInterest(state, payload) {
    state.interest = payload
  },
  saveJobInterest(state, payload) {
    state.jobInterest = payload
  },
  saveDisability(state, payload) {
    state.disability = payload
  },
  savePaymentType(state, payload) {
    state.paymentType = payload
  },
  saveLineOfBussiness(state, payload) {
    state.lineOfBussiness = payload
  },
  saveResignCause(state, payload) {
    state.resignCause = payload
  },
  saveDocumentType(state, payload) {
    state.documentType = payload
  },
  saveHospital(state, payload) {
    state.hospital = payload
  },
  saveDoctor(state, payload) {
    state.doctor = payload
  },
  saveDisease(state, payload) {
    state.disease = payload
  },
  saveVaccineType(state, payload) {
    state.vaccineType = payload
  },
  saveHealthLevel(state, payload) {
    state.healthLevel = payload
  }
}

export const actions = {
  async fetchCity({ commit, state }) {
    if (state.city.length === 0) {
      const response = await this.$axios.get('/address/city')
      commit('saveCity', response.data)
    }
    // return state.city
  },
  async fetchCountry({ commit, state }) {
    if (state.country.length === 0) {
      const response = await this.$axios.get('/address/country')
      commit('saveCountry', response.data)
    }
    // return state.country
  },
  async fetchState({ commit, state }) {
    if (state.state.length === 0) {
      const response = await this.$axios.get('/address/state')
      commit('saveState', response.data)
    }
  },
  async fetchReligion({ commit, state }) {
    if (state.religion.length === 0) {
      const response = await this.$axios.get('/type/religion')
      commit('saveReligion', response.data)
    }
    // return state.religion
  },
  async fetchMaritalStatus({ commit, state }) {
    if (state.maritalStatus.length === 0) {
      const response = await this.$axios.get(
        '/mastertype?table_name=thrmmaritalstatus'
      )
      const temp = []
      for (let i = 0; i < response.data.length; i++) {
        temp.push({
          text_id: response.data[i].text_id,
          code: parseInt(response.data[i].code),
        })
      }
      commit('saveMaritalStatus', temp)
    }
    // return state.maritalStatus
  },
  async fetchFamilyRelationship({ commit, state }) {
    if (state.familyRelationship.length === 0) {
      const response = await this.$axios.get('/type/familyrelationship')
      commit('saveFamilyRelationship', response.data)
    }
  },
  async fetchOccupation({ commit, state }) {
    if (state.occupation.length === 0) {
      const response = await this.$axios.get('/type/occupation')
      commit('saveOccupation', response.data)
    }
  },
  async fetchEducationType({ commit, state }) {
    if (state.educationType.length === 0) {
      const response = await this.$axios.get('/type/educationtype')
      commit('saveEducationType', response.data)
    }
  },
  async fetchEducationInstitution({ commit, state }) {
    if (state.educationInstitution.length === 0) {
      const response = await this.$axios.get('/type/educationinstitution')
      commit('saveEducationInstitution', response.data)
    }
  },
  async fetchFaculty({ commit, state }) {
    if (state.faculty.length === 0) {
      const response = await this.$axios.get('/type/faculty')
      commit('saveFaculty', response.data)
    }
  },
  async fetchMajor({ commit, state }) {
    if (state.major.length === 0) {
      const response = await this.$axios.get('/type/major')
      commit('saveMajor', response.data)
    }
  },
  async fetchLanguageList({ commit, state }) {
    if (state.languageList.length === 0) {
      const response = await this.$axios.get('/type/language')
      commit('saveLanguageList', response.data)
    }
  },
  async fetchSkills({ commit, state }) {
    if (state.skills.length === 0) {
      const response = await this.$axios.get('/type/skill')
      commit('saveSkills', response.data)
    }
  },

  async fetchInterest({ commit, state }) {
    if (state.interest.length === 0) {
      const response = await this.$axios.get('/type/interest')
      commit('saveInterest', response.data)
    }
  },
  async fetchJobInterest({ commit, state }) {
    if (state.jobInterest.length === 0) {
      const response = await this.$axios.get('/type/jobinterest')
      commit('saveJobInterest', response.data)
    }
  },
  async fetchDisability({ commit, state }) {
    if (state.disability.length === 0) {
      const response = await this.$axios.get('/type/disability')
      commit('saveDisability', response.data)
    }
  },
  async fetchPaymentType({ commit, state }) {
    if (state.paymentType.length === 0) {
      const response = await this.$axios.get('/type/paymenttype')
      commit('savePaymentType', response.data)
    }
  },
  async fetchLineOfBussiness({ commit, state }) {
    if (state.lineOfBussiness.length === 0) {
      const response = await this.$axios.get('/type/lineofbussiness')
      commit('saveLineOfBussiness', response.data)
    }
  },
  async fetchResignCause({ commit, state }) {
    if (state.resignCause.length === 0) {
      const response = await this.$axios.get('/type/resigncause')
      commit('saveResignCause', response.data)
    }
  },
  async fetchDocumentType({ commit, state }) {
    if (state.documentType.length === 0) {
      const response = await this.$axios.get('/type/documenttype')
      commit('saveDocumentType', response.data)
    }
  },
  async fetchHospital({ commit, state }) {
    if (state.hospital.length === 0) {
      const response = await this.$axios.get('/type/hospital')
      commit('saveHospital', response.data)
    }
  },
  async fetchDoctor({ commit, state }) {
    if (state.doctor.length === 0) {
      const response = await this.$axios.get('/type/doctor')
      commit('saveDoctor', response.data)
    }
  },
  async fetchDisease({ commit, state }) {
    if (state.disease.length === 0) {
      const response = await this.$axios.get('/type/disease')
      commit('saveDisease', response.data)
    }
  },
  async fetchVaccineType({ commit, state }) {
    if (state.vaccineType.length === 0) {
      const response = await this.$axios.get('/type/vaccinetype')
      commit('saveVaccineType', response.data)
    }
  },
  async fetchHealthLevel({ commit, state }) {
    if (state.healthLevel.length === 0) {
      const response = await this.$axios.get('/type/healthlevel')
      commit('saveHealthLevel', response.data)
    }
  },
}
