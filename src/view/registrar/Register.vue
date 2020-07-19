<template>
  <v-container>
    <v-form ref="form">
      <v-row>
        <v-col cols="1">
          <v-text-field
              placeholder="病历号"
          ></v-text-field>
        </v-col>
        <v-col cols="2" align-self="center">
          <v-btn
              class="primary"
          >
            查询
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-text-field
              label="姓名"
              v-model="name"
              :counter="10"
              :rules="[
                v => !!v || '必须填写姓名',
                v => (v && v.length <= 10) || '姓名小于10个字符'
              ]"
          >
          </v-text-field>
        </v-col>
        <v-col cols="1">
          <v-select
              label="性别"
              v-model="genders"
              :items="default_genders"
              :rules="[v => !!v || '必须选择性别']"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-text-field
              label="身份证号"
              v-model="id_number"
              :counter="18"
              :rules="[
                v => !!v || '必须填写身份证号码',
                v => /^[0-9]*$/.test(v) || '身份证必须都为数字'
              ]"
          >
          </v-text-field>
        </v-col>
        <v-col cols="2">
          <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="birth"
                  label="出生日期"
                  prepend-icon="today"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="[v => !!v || '必须选择出生日期']"
              ></v-text-field>
              <!--                prepend-icon="event"-->
            </template>
            <v-date-picker v-model="birth" @input="menu2 = false"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-select
              :items="depts"
              item-text="dept_name"
              item-value="dept_id"
              label="科室"
              v-model="dept"
              @change="deptChange"
              :rules="[v => !!v || '必须选择科室']"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-select
              :items="doctors"
              item-text="name"
              item-value="id"
              label="医生"
              v-model="doc"
              :rules="[v => !!v || '必须选择医生']"
          >
          </v-select>
        </v-col>
        <v-col cols="4">
          <v-text-field
              label="家庭住址"
              v-model="address"
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-btn block large class="success" @click="submit">挂号</v-btn>
        </v-col>
        <v-col cols="4">
          <v-btn block large class="error" @click="clear">清空</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
  import {register} from "../../api/registrar";
  import {notify} from "../../components/notification";
  import {getDoctors} from "../../api/registrar";

  export default {
    name: "Register",
    data: () => ({
      default_genders: [{text: "男", value: 1}, {text: "女", value: 0}],
      menu2: false,
      depts: [
        {dept_id: 0}
      ],
      doctors: [],
      name: '',
      genders: '',
      id_number: '',
      birth: new Date().toISOString().substr(0, 10),
      dept: 0,
      doc: 0,
      address: ''
    }),
    created() {
      this.initDoctors()
    },
    methods: {
      initDoctors() {
        getDoctors()
          .then(res => {
            if (res.status === 200) {
              this.depts = res.data.data;
            }
          }).catch()
      },
      deptChange() {
        this.doctors = this.depts.find(dept => {
          return dept.dept_id === this.dept
        }).doctors
      },
      submit() {
        console.log(this.dept);
        console.log(this.doc);
        if (!this.$refs.form.validate()) {
          return
        }
        register({
          name: this.name,
          genders: this.genders,
          id_number: this.id_number,
          birth: this.birth,
          dept: this.dept,
          doc: this.doc,
          address: this.address
        })
          .then(res => {
            if (res.data.code === 0) {
              notify('success', '挂号成功');
            } else {
              notify('fail', '挂号失败' + res.data.message)
            }
          })
      },
      clear() {
        this.name = '';
        this.genders = '';
        this.id_number = '';
        this.birth = new Date().toISOString().substr(0, 10);
        this.dept = '';
        this.doc = '';
        this.address = '';
        this.$refs.form.reset();
      }
    }
  }
</script>

<style scoped>

</style>
