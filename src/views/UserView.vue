<template>
  <div>
    <div class="btn-wp">
      <a-button type="primary" @click="showModal" class="newUserBtn">
        New User
      </a-button>
    </div>

    <!-- Modal new User -->
    <div class="modalNewUser">
      <a-modal
        v-model="frmUsers"
        title="New User"
        @ok="createUser"
        align="center"
      >
        <a-form-model
          ref="ruleForm"
          :model="ruleForm"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <!-- Name -->
          <a-form-model-item label="Name">
            <a-input
              v-model="ruleForm.name"
              type="text"
              @input="() => (errors.name = '')"
            />
            <span style="color: red; font: 12px bold">
              {{ errors.name }}
            </span>

            <!-- Profile -->
          </a-form-model-item>
          <!-- upload image -->

          <a-form-model-item label="Profile">
            <!-- <a-upload name="file" :multiple="true" @change="handleChange">
            <a-button> <a-icon type="upload" /> Click to Upload </a-button>
          </a-upload> -->
            <div class="file-input">
              <input
                type="file"
                name="file-input"
                id="file-input"
                class="file-input__input"
                :v-model="ruleForm.profile"
                @input="() => (errors.profile = '')"
                @change="handleFileUpload"
              />
              <span style="color: red; font: 12px bold">
                {{ errors.profile }}
              </span>

              <label class="file-input__label" for="file-input">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="upload"
                  class="svg-inline--fa fa-upload fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
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
          </a-form-model-item>
          <!-- end upload image -->

          <!-- Email -->
          <a-form-model-item label="Email">
            <a-input
              v-model="ruleForm.email"
              type="email"
              @input="() => (errors.email = '')"
            />
            <span style="color: red; font: 12px bold">
              {{ errors.email }}
            </span>
          </a-form-model-item>

          <!-- password -->
          <a-form-model-item label="Password">
            <a-input
              v-model="ruleForm.password"
              type="password"
              @input="() => (errors.password = '')"
            />
            <span style="color: red; font: 12px bold">
              {{ errors.password }}
            </span>
          </a-form-model-item>

          <!-- Province -->
          <a-form-model-item label="Provinces">
            <a-select
              v-model="ruleForm.province_id"
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
              v-model="ruleForm.district_id"
              placeholder="please select your district"
              @change="handleSelectDistrict"
            >
              <a-select-option
                v-for="getDistrict in getDistricts"
                :key="getDistrict.id"
                :value="getDistrict.id"
                >{{ getDistrict.name }}</a-select-option
              >
            </a-select>
          </a-form-model-item>

          <!-- commune -->
          <a-form-model-item label="commune">
            <a-select
              v-model="ruleForm.commune_id"
              placeholder="please select your commune"
            >
              <a-select-option
                v-for="getcommune in getCommunes"
                :key="getcommune.id"
                :value="getcommune.id"
                >{{ getcommune.name }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
    <!-- end Modal add User -->

    <!-- table -->
    <a-table
      :bordered="true"
      :pagination="false"
      :columns="columns"
      :dataSource="getUsers"
      :rowKey="(record) => record.id"
    >
      <div slot="action" slot-scope="text">
        <!-- Edit Button -->
        <a-button
          @click="toEditUser(text.id)"
          type="primary"
          size="small"
          style="margin-left: 5px"
        >
          <a-icon type="edit" />Edit
        </a-button>

        <!-- Delete Button -->
        <a-button
          @click="toDeleteUser(text.id)"
          type="danger"
          size="small"
          style="margin-left: 5px"
        >
          <a-icon type="delete" />Delete
        </a-button>
      </div>
      <div slot="image" slot-scope="image">
        <img :src="image" alt="#" />
      </div>
    </a-table>
    <!-- end table -->

    <!-- modal edit -->
    <EditModalUser ref="editOneUser"></EditModalUser>
    <!-- end modal edit -->

    <!-- pagination -->
    <a-pagination
      v-model="current"
      :total="getTotalPage"
      show-less-items
      @change="handlePagination(current)"
      :defaultPageSize="5"
    />
    <!-- end pagination -->
  </div>
</template>

<script>
/* eslint-disable */
// import pick from "lodash.pick";
import { mapActions, mapGetters } from "vuex";

import EditModalUser from "@/components/ModalEditUser.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    EditModalUser,
  },
  data() {
    return {
      // pagination
      current: 1,
      // pagination

      // form users
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },

      // field error
      errors: {
        name: "",
        email: "",
        password: "",
        profile: "",
        province_id: undefined,
        district_id: undefined,
        commune_id: undefined,
      },

      // field data
      ruleForm: {
        name: "",
        email: "",
        profile: "",
        password: "",
        province_id: undefined,
        district_id: undefined,
        commune_id: undefined,
      },

      // end form users

      // end form modal
      frmUsers: false,

      formItemLayout: {
        labelCol: {
          span: 5,
        },
        wrapperCol: {
          span: 12,
        },
      },

      // thead
      columns: [
        // ID
        {
          title: "ID",
          dataIndex: "id",
          width: "5%",
          align: "center",
        },

        // Profile
        {
          title: "Profile",
          dataIndex: "profile",
          align: "center",
          scopedSlots: { customRender: "image" },
        },

        // Name
        {
          title: "Name",
          dataIndex: "name",
          align: "center",
        },

        // Email
        {
          title: "Email",
          dataIndex: "email",
          align: "center",
        },

        // Province
        {
          title: "Province",
          dataIndex: "provinces.name",
          align: "center",
        },

        // District
        {
          title: "District",
          dataIndex: "districts.name",
          align: "center",
        },

        // Communce
        {
          title: "commune",
          dataIndex: "communes.name",
          align: "center",
        },

        {
          title: "Action",
          scopedSlots: { customRender: "action" },
          align: "center",
        },
      ],
      // end thead
    };
  },

  methods: {
    // modal delete

    async handlePagination(page) {
      console.log(page);
      this.current = page;
      this.$router.push({ name: "users", query: { page } }).catch(() => {});
      await this.fetchUsers();
      // console.log("🚀 : this.$router", this.$router);
    },

    // upload image
    handleFileUpload(event) {
      this.ruleForm.profile = event.target.files[0];
      // console.log(event.target.files[0]);
    },
    // end upload image

    // Vuex
    ...mapActions("userData", ["registerUsers"]),
    ...mapActions("userData", ["fetchUsers"]),
    ...mapActions("userData", ["actionGetOneUser"]),
    ...mapActions("userData", ["DeleteOneUser"]),
    ...mapActions(["fetchProvinces", "fetchDistricts", "fetchcommunes"]),

    // Create Users
    async createUser() {
      const userAdd = await this.registerUsers(this.ruleForm)
        .then((response) => {
          console.log("🚀 : response", response);
          // console.log(userAdd);

          this.ruleForm = [];
        })
        .catch((error) => {
          this.getErrors(error.response.data);
          // console.log(error.response.data);
        });
    },
    // end Create Users

    // function provinces
    handleSelectChange(value) {
      // console.log(value);
      this.fetchDistricts(value);
    },

    // function districts
    handleSelectDistrict(value) {
      // console.log(value);
      this.fetchcommunes(value);
    },

    // modal new user
    showModal() {
      this.frmUsers = true;
    },

    // edit modal
    async toEditUser(id) {
      this.frmUsers = false;
      this.$refs.editOneUser.ModalEditUsers = true;
      const user = await axios
        .get("http://laravelapi.local/api/users/" + id + "/edit")
        .then((response) => {
          // console.log(response.data);
          this.$refs.editOneUser.formEditUser = response.data;
        });
    },

    // delete modal

    submit() {},
  },

  // mounted only province
  mounted() {
    this.fetchProvinces();
    this.fetchUsers();
    // console.log();
    // this.current = parseInt(this.$router.currentRoute.query.page);
    if (this.$router.currentRoute.query.page == undefined) {
      this.current = 1;
    } else {
      this.current = parseInt(this.$router.currentRoute.query.page);
    }
  },

  computed: {
    ...mapGetters("userData", ["getUsers", "getTotalPage"]),

    ...mapGetters(["getProvinces", "getDistricts", "getCommunes"]),
  },
};
</script>

<style>
.btn-wp {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 15px;
}

.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.file-input__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.file-input__label {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  font-size: 14px;
  padding: 0 10px;
  background-color: #4245a8;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
}

.file-input__label svg {
  height: 14px;
  margin-right: 4px;
}

.modalNewUser {
  margin: 25px;
}

.newUserBtn {
}
</style>
