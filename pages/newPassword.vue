<template>
  <section>
    <br />
    <br />
    <br />
    <br />
    <br />
    <Row type="flex" justify="center">
      <Col :xs="22" :lg="{ span: 10 }">
        <Row>
          <Col :xs="12" :lg="24">
            <h1 class="title left">Ingresa tu nueva contraseña</h1>
          </Col>
        </Row>
        <Form
          id="form-new-password"
          ref="newPasswordForm"
          :model="newPasswordForm"
          :rules="newPasswordFormValidate"
          row
        >
          <FormItem prop="password">
            <Input
              type="password"
              v-model="newPasswordForm.password"
              placeholder="Nueva Contraseña"
              prefix="ios-lock-outline"
            >
              <!-- <Icon size="20" type="ios-lock-outline" slot="prepend"></Icon> -->
            </Input>
          </FormItem>
          <FormItem prop="confirmPassword">
            <Input
              type="password"
              v-model="newPasswordForm.confirmPassword"
              placeholder="Confirmar contraseña"
              prefix="ios-lock-outline"
            >
              <!-- <Icon size="20" type="ios-lock-outline" slot="prepend"></Icon> -->
            </Input>
          </FormItem>

          <FormItem>
            <Button
              class="margin-27"
              type="success"
              :loading="loading"
              @click="newPassword('newPasswordForm')"
              >ENVIAR</Button
            >
          </FormItem>
        </Form>
        <br />
      </Col>
    </Row>
  </section>
</template>
<script>
import localStorage from "localStorage";
import { resetPassword } from "../server/index";
export default {
  name: "newPassword",
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Por favor, confirme su contraseña"));
      } else if (value !== this.newPasswordForm.password) {
        callback(new Error("No coincide con la contraseña ingresada"));
      } else {
        callback();
      }
    };
    return {
      newPasswordForm: {
        password: "",
        confirmPassword: ""
      },
      token: "",
      loading: false,
      newPasswordFormValidate: {
        password: [
          {
            required: true,
            message: "Por favor, ingrese una contraseña",
            trigger: "blur"
          },
          {
            type: "string",
            min: 8,
            message: "La contraseña debe tener como mínimo 8 caracteres",
            trigger: "blur"
          }
        ],
        confirmPassword: [{ validator: validatePassCheck, trigger: "blur" }]
      }
    };
  },
  methods: {
    newPassword(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true;
          this.token = this.token.toString();
          debugger;
          resetPassword(this.token, this.newPasswordForm.password)
            .then(res => {
              this.loading = false;
              if (res.status == 201) {
                this.$Notice.success({
                  title: "Cambió su clave",
                  desc:
                    "Su clave fue modificada, puede ingresar con su nueva clave."
                });
                this.$router.push({ path: "login" });
              }
            })
            .catch(err => {
              this.$Notice.error({
                title: "Ocurrió un error",
                desc: "Por favor, vuelva a intentarlo en unos minutos"
              });
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          this.$Notice.error({ title: "Revise los datos ingresados" });
        }
      });
    },
    setHour(val) {
      localStorage.setItem("hour", val);
    }
  },
  created() {
    this.token = this.$route.query.token;
    console.log(this.token);
  }
};
</script>

<style>
@import "../assets/style.css";

.title {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  /* or 111% */

  text-align: left;
  letter-spacing: 0.5px;
  color: #000000;
  margin-bottom: 22px;
}

.indications {
  margin-bottom: 35px;
}

.flex-market {
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin-bottom: 32px;
  align-items: center;
}

.flex-info-market {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}
.f-black:hover {
  color: #dc050e !important;
}

.width-candy {
  width: 50px;
}
</style>
