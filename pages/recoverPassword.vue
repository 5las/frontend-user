<template>
  <section>
    <br />
    <Row type="flex" justify="start">
      <Col :xs="24" :lg="{ span: 2, offset: 1 }">
        <nuxt-link to="/login" class="f-black">
          <div>
            <Icon type="md-arrow-back" size="30" />
            <span>Volver</span>
          </div>
        </nuxt-link>
      </Col>
    </Row>
    <br />
    <br />
    <br />
    <br />
    <Row type="flex" justify="center">
      <Col :xs="22" :lg="{ span: 10 }">
        <Row>
          <Col :xs="12" :lg="24">
            <h1 class="title left">Recuperar Contraseña</h1>
          </Col>
        </Row>
        <Form
          id="form-recover"
          ref="recoverForm"
          :model="recoverForm"
          :rules="recoverFormValidate"
          row
        >
          <FormItem label="Ingresa tu correo electrónico" prop="email">
            <FormItem prop="email">
              <Input
                prefix="ios-contact-outline"
                v-model="recoverForm.email"
                placeholder="tucorreo@email.com"
              ></Input>
            </FormItem>
          </FormItem>

          <FormItem>
            <Button
              class="margin-27"
              type="success"
              :loading="loading"
              @click="recoverPassword('recoverForm')"
              >ENVIAR</Button
            >
          </FormItem>
        </Form>
        <br />
        <p class="iconos-off f-12">
          Su dirección de correo electrónico solo se utilizará para responder a
          su consulta y no se compartirá con terceros. Puede obtener más
          información sobre la recopilación de datos en nuestras Políticas de
          Privacidad.
        </p>
      </Col>
    </Row>
  </section>
</template>
<script>
import localStorage from "localStorage";
import { recoverPassword } from "../server/index";
export default {
  name: "recoverPassword",
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Por favor, confirme su contraseña"));
      } else if (value !== this.formInline.password) {
        callback(new Error("No coincide con la contraseña ingresada"));
      } else {
        callback();
      }
    };
    return {
      recoverForm: {
        email: ""
      },
      loading: false,
      recoverFormValidate: {
        email: [
          {
            required: true,
            message: "Ingrese su email",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Ingrese un email válido",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    recoverPassword(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true;
          recoverPassword(this.recoverForm)
            .then(res => {
              this.$Notice.success({
                title: "Revise su correo",
                desc: "Un correo llegará a su cuenta para recuperar su password"
              });
              this.recoverForm.email = "";
            })
            .catch(err => {
              this.$Notice.error({ title: "Revise los datos ingresados" });
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          this.$Notice.error({ title: "Revise los datos ingresados" });
        }
      });
    }
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
