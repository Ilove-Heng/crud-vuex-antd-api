<template>
  <div class="modalNewUser">
    <!-- modal edit -->
    <a-modal v-model="ModalEditUsers" title="Update User" @ok="updateUser">
      <a-form-model
        ref="formEditUser"
        :model="formEditUser"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <!-- Name -->
        <a-form-model-item label="Name">
          <a-input v-model="formEditUser.name" type="text" />
          <!-- Profile -->
        </a-form-model-item>

        <!-- upload image -->
        <a-form-model-item label="Profile" align="center" type="flex">
          <!-- show profile -->
          <div v-show="formEditUser.profile">
            <a-col :span="4">
              <img :src="imageLink + formEditUser.profile" alt="#" />
            </a-col>
          </div>
          <a-col :span="12">
            <div class="file-input">
              <input
                type="file"
                name="file-input"
                id="file-input"
                class="file-input__input"
                :v-model="formEditUser.profile"
                @change="handleFileUpload"
              />

              <label class="file-input__label" for="file-input">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="upload"
                  class="svg-inline--fa fa-upload fa-w-16"
                  role="img"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                  ></path>
                </svg>
                <span>Upload file</span>
              </label>
            </div>
          </a-col>
        </a-form-model-item>
        <!-- end upload image -->

        <!-- Email -->
        <a-form-model-item label="Email">
          <a-input v-model="formEditUser.email" type="email" />
        </a-form-model-item>

        <!-- Province -->
        <a-form-model-item label="Provinces">
          <a-select
            v-model="formEditUser.province_id"
            placeholder="please select your province"
            @change="handleSelectChange"
          >
            <a-select-option
              v-for="getProvince in getProvinces"
              :key="getProvince.id"
              :value="getProvince.id"
              >{{ getProvince.name }}</a-select-option
            >
          </a-select>
        </a-form-model-item>

        <!-- District -->
        <a-form-model-item label="District">
          <a-select
            v-model="formEditUser.district_id"
            placeholder="please select your district"
            @change="handleSelectDistrict"
          >
            <a-select-option
              v-for="getDistrict in getDistricts"
              :key="getDistrict.id"
              :value="getDistrict.name"
              >{{ getDistrict.name }}</a-select-option
            >
          </a-select>
        </a-form-model-item>

        <!-- commune -->
        <a-form-model-item label="commune">
          <a-select
            v-model="formEditUser.commune_id"
            placeholder="please select your commune"
          >
            <a-select-option
              v-for="getcommune in getCommunes"
              :key="getcommune.id"
              :value="getcommune.name"
              >{{ getcommune.name }}</a-select-option
            >
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- end modal edit -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      // show iamge
      imageLink: "http://laravelapi.local/storage/images/users/",

      formItemLayout: {
        labelCol: {
          span: 5,
        },
        wrapperCol: {
          span: 12,
        },
      },

      labelCol: { span: 4 },
      wrapperCol: { span: 16 },

      ModalEditUsers: false,

      errors: {},

      formEditUser: {
        name: "",
        email: "",
        profile: "",
        password: "",
        province_id: undefined,
        district_id: undefined,
        commune_id: undefined,
      },
    };
  },
  computed: {
    ...mapGetters("userData", ["getUsers"]),

    ...mapGetters(["getProvinces", "getDistricts", "getCommunes"]),
  },

  methods: {
    // vuex
    ...mapActions(["fetchProvinces", "fetchDistricts", "fetchcommunes"]),

    // module
    ...mapActions("userData", ["actionUpdateOneUser"]),

    // updateUser
    updateUser() {
      // console.log(id);
      this.actionUpdateOneUser(this.formEditUser);
      console.log(this.formEditUser.id);
      this.ModalEditUsers = false;
    },

    // upload file
    handleFileUpload(event) {
      // alert(event);
      this.formEditUser.profile = event.target.files[0];
      // console.log(event.target.files[0]);
    },

    // select province
    handleSelectChange(value) {
      // console.log(value);
      this.fetchDistricts(value);
    },

    // select district
    handleSelectDistrict(value) {
      // console.log(value);
      this.fetchcommunes(value);
    },
  },

  mounted() {
    this.fetchProvinces();
  },
};
</script>

<style>
.upload-iamge {
  display: flex;
  gap: 10px;
}
</style>
