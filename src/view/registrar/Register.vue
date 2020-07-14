<template>
  <v-container>
    <v-form>
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
          >
          </v-text-field>
        </v-col>
        <v-col cols="1">
          <v-select label="性别" :items="genders"></v-select>
        </v-col>
        <v-col cols="3">
          <v-text-field
              label="身份证号"
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
                  v-model="date"
                  label="出生日期"
                  readonly
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
              <!--                prepend-icon="event"-->
            </template>
            <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-select
              :items="depts"
              item-text="name"
              item-value="id"
              label="科室"
              v-model="dept"
              @change="dept_change"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-select
              :items="doctors"
              item-text="name"
              item-value="id"
              label="医生"
              v-model="doc"
          >
          </v-select>
        </v-col>
        <v-col cols="4">
          <v-text-field
              label="家庭住址"
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4"><v-btn block large class="success">挂号</v-btn></v-col>
        <v-col cols="4"><v-btn block large class="error">清空</v-btn></v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
  export default {
    name: "Register",
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      genders: [{text:"男",value:1},{text:"女",value:0}],
      menu2: false,
      depts: [
        {
          id: 1,
          name: '心血管',
          doctors: [
            {
              id: 1,
              name: 'zzj'
            },
            {
              id: 2,
              name: 'ht'
            }
          ]
        },
        {
          id: 2,
          name: '胃',
          doctors: [
            {
              id: 3,
              name: 'test'
            },
            {
              id: 4,
              name: 'test2'
            }
          ]
        }],
      dept: 0,
      doctors: [],
      doc: 0,
    }),
    methods: {
      dept_change() {
        this.doctors = this.depts.find((dept) => {
          return dept.id === this.dept
        }).doctors
      }
    }
  }
</script>

<style scoped>

</style>
