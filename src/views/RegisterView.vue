<template>
  <div class="container">
    <a-form :form="form" @submit="handleSubmit">
      <!-- selection option- -->
      <a-form-item v-bind="formItemLayout" label="Select Address">
        <a-cascader
          v-decorator="[
            'residence',
            {
              initialValue: ['a', 'b', 'c'],
              rules: [
                {
                  type: 'array',
                  required: true,
                  message: 'Please select your habitual residence!',
                },
              ],
            },
          ]"
          :options="residences"
        />
      </a-form-item>
      <!-- // selection option -->
      <a-form-item v-bind="formItemLayout" label="Name">
        <a-input
          v-decorator="[
            'name',
            {
              rules: [
                {
                  type: 'text',
                  message: 'The input is not valid Name!',
                },
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="E-mail">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Password" has-feedback>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            },
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="Confirm Password"
        has-feedback
      >
        <a-input
          v-decorator="[
            'confirm',
            {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            },
          ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="Profile">
        <a-row :gutter="8">
          <a-col :span="12">
            <div>
              <a-upload
                name="avatar"
                listType="picture-card"
                class="avatar-uploader"
                :showUploadList="false"
                action="//jsonplaceholder.typicode.com/posts/"
                :beforeUpload="beforeUpload"
                @change="handleChange"
              >
                <img v-if="imageUrl" :src="imageUrl" alt="" />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
              <!-- <input type="file" @change="onSelectFile" />
              <img :src="imgPreview" width="100" alt="" /> -->
            </div>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" html-type="submit" @click="createUser()">
          Register
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapGetters } from "vuex";
const residences = [
  {
    value: "រាជធានីភ្នំពេញ",
    label: "រាជធានីភ្នំពេញ",
    children: [
      {
        value: "ខណ្ឌចំការមន",
        label: "ខណ្ឌចំការមន",
        children: [
          {
            value: "សង្កាត់ បឹងកេងកងទី ១",
            label: "សង្កាត់ បឹងកេងកងទី ១",
          },
        ],
      },
    ],
  },
  {
    value: "ខេត្តបន្ទាយមានជ័យ",
    label: "ខេត្តបន្ទាយមានជ័យ",
    children: [
      {
        value: "ក្រុងសេរីសោភ័ណ",
        label: "ក្រុងសេរីសោភ័ណ",
        children: [
          {
            value: "សង្កាត់ អូរអំបិល",
            label: "សង្កាត់ អូរអំបិល",
          },
        ],
      },
    ],
  },
];
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        profile: "",
        province_id: "",
        district_id: "",
        communce_id: "",
      },
      loading: false,
      imageUrl: "",
      imgPreview: "",
      imgPreviewName: "",
      selectedFile: null,
      confirmDirty: false,
      residences,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJPG && isLt2M;
    },
    onSelectFile(e) {
      const imgPreviewName = e.target.files[0];
      console.log(imgPreviewName);
      const reader = new FileReader();
      reader.readAsDataURL(imgPreviewName);
      reader.onload = (e) => {
        this.imgPreview = e.target.result;
      };
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },

    onFileSelected(event) {
      console.log(event);
    },
    ...mapActions("userData", ["registerUsers"]),

    // Create Users
    async createUser() {
      const userAdd = await this.registerUsers(this.user)
        .then((response) => {
          // console.log(userAdd);
          // console.log(response);
          this.user = [];
        })
        .catch((error) => {
          this.getErrors(error.response.data);
          console.log(error.response.data);
        });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1170px;
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
</style>
