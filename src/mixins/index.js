export default {
  methods: {
    // Validation form in UserView
    getErrors(errors) {
      Object.keys(errors).forEach((key) => {
        ``;
        let val = errors[key][0];
        console.log(val);
        this.errors[key] = errors[key][0];
      });
    },

    // delete modal in UserView
    toDeleteUser(id) {
      // this.DeleteOneUser(id);
      const dataDelete = this;
      this.$confirm({
        title: "តើអ្នកចង់លុបវាទេ?",
        content: "នៅពេលយល់ព្រម ប្រអប់នេះនឹងត្រូវបានបិទបន្ទាប់ពី 1 វិនាទី",
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            dataDelete.DeleteOneUser(id);
          }).catch(() => console.log("Oops errors!"));
        },
        onCancel() {},
      });
    },
  },
};
