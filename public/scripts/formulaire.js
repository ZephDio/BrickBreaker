new Vue({
  el: ".cardregister",
  data: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },

  methods: {
    createContact() {
      const formulaireUpload = window.fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          username: this.username,
          password: calcMD5(this.password),
          confirmPassword: calcMD5(this.confirmPassword),
        }),
      });
      formulaireUpload.then((res) => {
        console.log(res);
        console.log(res.toString());
        res.text().then((value) => {
          console.log(value);
          if (value === "ok") {
            console.log("kek2");
          }
        });
      });
      // .then((rep) => {
      //   rep.text().then((value) => {
      //     console.log(value);
      //     if (value === "ok") {
      //       console.log("kek2");
      //     }
      //   });
      // });
    },
  },
});
