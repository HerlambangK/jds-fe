<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="12">
        <v-form
          @submit.prevent="submitForm"
          id="form-submit"
          ref="form"
          lazy-validation
        >
          <v-text-field
            v-model.trim="name"
            :rules="[rules.required]"
            type="text"
            label="Name"
            :value="name"
            placeholder="Name"
            prepend-inner-icon="mdi-account"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="nik"
            :rules="[rules.required, rules.isNikValidated]"
            counter="16"
            label="nik"
            placeholder="NIK"
            prepend-inner-icon="mdi-card-account-details-outline"
            type="number"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="kartuKeluarga"
            :rules="[rules.required, rules.isKKValidated]"
            counter="16"
            label="No Kartu Keluarga"
            placeholder="Isikan Nomor Kartu keluarga anda"
            prepend-inner-icon="mdi-card-account-details-outline"
            type="number"
            outlined
            class="mb-4"
          ></v-text-field>

          <v-file-input
            @change="handleNikFile"
            type="file"
            accept=".png, .jpeg, .jpg, .bmp, "
            label="NIK File"
            :rules="[rules.required, rules.isFileValidated]"
            filled
            show-size
            class="mb-4"
          >
            <template v-slot:selection="{ text }">
              <v-chip size="small" label color="blue" outlined pill>
                {{ text }}
              </v-chip>
            </template>
          </v-file-input>
          <v-file-input
            @change="handleKKFile"
            type="file"
            accept=".png, .jpeg, .jpg, .bmp, "
            label="Kartu Keluarga File"
            :rules="[rules.required]"
            filled
            show-size
          >
            <template v-slot:selection="{ text }">
              <v-chip size="small" label color="blue" outlined pill>
                {{ text }}
              </v-chip>
            </template>
          </v-file-input>
          <v-text-field
            v-model.number="age"
            :rules="[rules.required, rules.isAgeValidated]"
            placeholder="Umur"
            prepend-inner-icon="mdi-account"
            label="Umur"
            type="number"
            outlined
            class="mb-4"
          />
          <v-radio-group :rules="[rules.required]" label="Jenis Kelamin" column>
            <v-radio
              v-for="gender in genders"
              @click="handleGender(gender)"
              :key="gender"
              color="primary"
              :label="gender"
              :value="gender"
              outlined
              class="mb-4"
            ></v-radio>
          </v-radio-group>

          <v-select
            v-model="provinceId"
            @change="handleProvince(provinceId)"
            :rules="[rules.required]"
            :items="provinces"
            item-text="name"
            item-value="id"
            label="Provinsi"
            prepend-inner-icon="mdi-map-marker-outline"
            required
            outlined
            class="mb-4"
          >
          </v-select>
          <v-select
            v-model="regencieId"
            @change="handleRegency(regencieId)"
            :rules="[rules.required]"
            :items="regencies"
            item-text="name"
            item-value="id"
            label="Kab/Kota"
            prepend-inner-icon="mdi-map-marker-outline"
            required
            outlined
            class="mb-4"
          >
          </v-select>
          <v-select
            v-model="districtId"
            @change="handleDistrict(districtId)"
            :rules="[rules.required]"
            :items="districts"
            item-text="name"
            item-value="id"
            label="Kecamatan"
            prepend-inner-icon="mdi-map-marker-outline"
            required
            outlined
            class="mb-4"
          >
          </v-select>
          <v-select
            v-model="villageId"
            @change="handleVillage(villageId)"
            :rules="[rules.required]"
            :items="villages"
            item-text="name"
            item-value="id"
            label="Kelurahan/Desa"
            prepend-inner-icon="mdi-map-marker-outline"
            required
            outlined
            class="mb-4"
          >
          </v-select>
          <v-textarea
            v-model="address"
            :rules="[rules.required, rules.addressValidation]"
            clearable
            clear-icon="mdi-close-circle"
            counter="200"
            label="Alamat"
            value="address"
            outlined
            class="mb-4"
          >
          </v-textarea>
          <v-text-field
            v-model="rt"
            :rules="[rules.required]"
            :value="rt"
            label="RT"
            placeholder="RT"
            prepend-inner-icon="mdi-card-account-details-outline"
            type="number"
            outlined
            class="mb-4"
          >
          </v-text-field>
          <v-text-field
            v-model="rw"
            :rules="[rules.required]"
            :value="rw"
            label="RW"
            placeholder="RW"
            prepend-inner-icon="mdi-card-account-details-outline"
            type="number"
            outlined
            class="mb-4"
          >
          </v-text-field>
          <v-text-field
            v-model="salaryBeforePandemic"
            :rules="[rules.required]"
            label="Penghasilan sebelum pandemi"
            placeholder="Penghasilan sebelum pandemi"
            prepend-inner-icon="mdi-cash"
            type="number"
            outlined
            class="mb-4"
          >
          </v-text-field>
          <v-text-field
            v-model="salaryAfterPandemic"
            :rules="[rules.required]"
            label="Penghasilan setelah pandemi"
            placeholder="Penghasilan setelah pandemi"
            prepend-inner-icon="mdi-cash"
            type="number"
            outlined
            class="mb-4"
          >
          </v-text-field>

          <v-radio-group
            :rules="[rules.required]"
            :value="other"
            label="Alasan membutuhkan bantuan"
          >
            <v-radio
              v-for="reason in reasons"
              @click="handleReason(reason)"
              :key="reason"
              color="primary"
              :label="reason"
              :value="reason"
            ></v-radio>
            <v-spacer class="d-inline-flex mb-4">
              <v-radio
                class="d-inline pr-2"
                :value="other"
                label="Lainnya:"
                color="primary"
              >
              </v-radio>
              <v-text-field v-model="other" :value="other" regular dense>
              </v-text-field>
            </v-spacer>
          </v-radio-group>
          <v-checkbox
            :rules="[rules.required]"
            color="primary "
            label="Saya menyatakan bahwa data yang diisikan adalah benar 
            dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut."
          ></v-checkbox>

          <v-btn
            type="submit"
            form="form-submit"
            color="green"
            class="custom-button"
            :loading="loading"
            :disabled="loading"
            ><span v-if="!loading">Submit</span>
            <v-progress-circular
              v-else
              indeterminate
              color="white"
              size="24"
            ></v-progress-circular
          ></v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card class="mx-auto">
        <v-card-title class="text-h5"> Input data berhasil </v-card-title>
        <v-card-text>
          <div v-for="(memberItem, index) in member" :key="index">
            <v-list-item three-line>
              <v-list-item-content>
                <strong>Data Ke-{{ index + 1 }}</strong>
                <div class="text-overline mb-4">DATA PENERIMA</div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ memberItem.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  NIK: {{ memberItem.nik }}</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="80"
                color="grey"
              ></v-list-item-avatar>
            </v-list-item>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="dialog = false">Tutup</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.custom-button {
  background-color: #ff5722; /* Warna latar belakang kustom */
  color: #fff; /* Warna teks kustom */
  border-radius: 5px; /* Gaya sudut tombol */
  /* Tambahkan gaya CSS kustom lainnya */
}
</style>
<script>
export default {
  name: "FormComponent",
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required.",
        isNikValidated: (value) =>
          (value && value.length >= 16 && value.length <= 16) ||
          "Nomor Nik harus 16 digit",
        isKKValidated: (value) =>
          (value && value.length >= 16 && value.length <= 16) ||
          "Nomor Kartu Keluarga harus 16 digit",
        isAgeValidated: (value) => value >= 25 || "Minimal Usia 25 tahun",
        isFileValidated: (value) =>
          !value ||
          value.size < 2000000 ||
          "Maksimal ukuran file 2 MB dan format file wajib png, jpeg, jpg, atau bmp",
        addressValidation: (value) =>
          (value && value.length <= 200) || "Maksimal 200 karakter",
      },

      name: "",
      nik: null,
      kartuKeluarga: null,
      nikFile: [],
      kkFile: [],
      age: null,
      genders: ["Laki-laki", "Perempuan"],
      gender: "",
      reasons: [
        "Kehilangan pekerjaan",
        "Kepala keluarga terdampak atau korban Covid-19",
        "Tergolong fakir/miskin semenjak sebelum Covid-19",
      ],
      reason: "",
      other: "",
      provinces: [],
      provinceId: null,
      province: "",
      regencies: [],
      regencieId: null,
      regency: "",
      districts: [],
      districtId: null,
      district: "",
      villages: [],
      villageId: null,
      village: "",
      address: "",
      rt: "",
      rw: "",
      salaryBeforePandemic: null,
      salaryAfterPandemic: null,
      member: [],
      dialog: false,
      loading: false,
    };
  },

  watch: {
    provinceId() {
      (this.regencieId = null),
        (this.districtId = null),
        (this.villageId = null);
      this.getProvinces();
      console.log("this.getProvinces()", this.getProvinces());
    },
    regencieId() {
      (this.districtId = null),
        (this.districtId = null),
        (this.villageId = null),
        this.getRegency();
    },
    districtId() {
      this.villageId = null;
      this.getDistrict();
    },
    villageId() {
      this.getVillage();
    },
  },

  methods: {
    handleNikFile(file) {
      if (file !== null) {
        if (
          file.size < 2000000 &&
          (file.type === "image/png" ||
            "image/jpeg" ||
            "image/jpg" ||
            "image/bmp")
        ) {
          this.nikFile = file;
        } else {
          alert(
            "File anda harus kurang dari 2MB dan berformat png/jpeg/jpg/bmp"
          );
        }
      }
    },
    handleKKFile(file) {
      if (file !== null) {
        if (
          file.size < 2000000 &&
          (file.type === "image/png" ||
            "image/jpeg" ||
            "image/jpg" ||
            "image/bmp")
        ) {
          this.kkFile = file;
        } else {
          alert(
            "File anda harus kurang dari 2MB dan berformat png/jpeg/jpg/bmp"
          );
        }
      }
    },
    handleGender(gender) {
      this.gender = gender;
    },
    handleProvince(id) {
      for (const province of this.provinces) {
        if (province.id == id) {
          this.province = province.name;
          this.getRegency();
          console.log(this.getRegency());
        }
      }
    },
    handleRegency(id) {
      for (const regency of this.regencies) {
        if (regency.id === id) {
          this.regency = regency.name;
          this.getDistrict();
          console.log(this.getDistrict());
        }
      }
    },
    handleDistrict(id) {
      for (const district of this.districts) {
        if (district.id === id) {
          this.district = district.name;
          this.getVillage();
          console.log(this.getVillage());
        }
      }
    },
    handleVillage(id) {
      for (const district of this.villages) {
        if (district.id === id) {
          this.village = district.name;
          this.getVillage();
        }
      }
    },
    async getProvinces() {
      try {
        const provinces = await this.axios.get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`
        );
        this.provinces = provinces.data;
        // console.log(this.provinces);
      } catch (error) {
        console.log(`Error fetching provinces: ${error.message}`);
      }
    },

    async getRegency() {
      if (!this.provinceId) {
        this.regencies = [];
        return;
      }
      try {
        const regency = await this.axios.get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${this.provinceId}.json`
        );
        this.regencies = regency.data;
        // console.log(this.regencies);
      } catch (error) {
        console.log(`Error fetching provinces: ${error.message}`);
      }
    },
    async getDistrict() {
      if (!this.regencieId) {
        this.districts = [];
        return;
      }
      try {
        const district = await this.axios.get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${this.regencieId}.json`
        );
        this.districts = district.data;
        // console.log(this.districts);
      } catch (error) {
        console.log(`Error fetching provinces: ${error.message}`);
      }
    },
    async getVillage() {
      if (!this.districtId) {
        this.villages = [];
        return;
      }
      try {
        const village = await this.axios.get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${this.districtId}.json`
        );
        this.villages = village.data;
        console.log(this.village);
      } catch (error) {
        console.log(`Error fetching provinces: ${error.message}`);
      }
    },

    handleReason(reason) {
      this.reason = reason;
    },

    formIsValidated() {
      if (this.$refs.form.validate()) {
        const memberInput = {
          name: this.name,
          nik: parseInt(this.nik),
          kartuKeluarga: parseInt(this.kartuKeluarga),
          nikFile: this.nikFile,
          kkFile: this.kkFile,
          age: this.age,
          gender: this.gender,
          province: this.province,
          regency: this.regency,
          district: this.district,
          village: this.village,
          salaryBeforePandemic: parseInt(this.salaryBeforePandemic),
          salaryAfterPandemic: parseInt(this.salaryAfterPandemic),
          address: this.address,
          rt: parseInt(this.rt),
          rw: parseInt(this.rw),
          other: this.reason || this.other,
        };
        this.member.push(memberInput);
        this.dialog = true;
        // alert(
        //   "Data anda berhasil dikirim silahkan lihat di console, Terima Kasih"
        // );
        console.log(this.member);
      } else {
        alert("Mohon cek kembali data anda");
        this.loading = false;
      }
    },
    submitForm() {
      this.loading = true;
      setTimeout(() => {
        if (Math.random() < 0.8) {
          this.formIsValidated();
          this.$refs.form.reset();
          (this.name = ""),
            (this.nik = null),
            (this.kartuKeluarga = null),
            (this.nikFile = []),
            (this.kkFile = []),
            (this.age = null),
            (this.genders = ["Laki-laki", "Perempuan"]),
            (this.gender = ""),
            (this.reasons = [
              "Kehilangan pekerjaan",
              "Kepala keluarga terdampak atau korban Covid-19",
              "Tergolong fakir/miskin semenjak sebelum Covid-19",
            ]),
            (this.reason = ""),
            (this.other = ""),
            (this.provinceId = null),
            (this.province = ""),
            (this.regencies = []),
            (this.regencieId = null),
            (this.regency = ""),
            (this.districts = []),
            (this.districtId = null),
            (this.district = ""),
            (this.villages = []),
            (this.villageId = null),
            (this.village = ""),
            (this.address = ""),
            (this.rt = null),
            (this.rw = null),
            (this.salaryBeforePandemic = null),
            (this.salaryAfterPandemic = null);
        } else {
          alert("Coba kembali");
          this.loading = false;
        }
      }, 1500);
    },
  },
  created() {
    this.getProvinces();
  },
};
</script>
