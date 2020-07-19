<template>
  <v-container>
    <v-card class="mt-2">
      <v-card-title>未诊断</v-card-title>
      <v-data-table
          :headers="needHeaders"
          :items="needDiagnoseDesserts"
          :search="search"
          class="elevation-1"
          :footer-props="footers"
          loading-text="正在加载..."
          no-results-text="无匹配数据"
          no-data-text="暂无数据"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
        </template>

        <template v-slot:top>
          <div>
            <v-dialog v-model="dialog" width="600px">
              <v-card>
                <v-card-title>{{ formTitle }}</v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col>
                        <!--                        <v-dialog width="500px">-->
                        <!--                          <template v-slot:activator="{on, attrs}">-->
                        <!--                            <v-btn block class="primary" v-bind="attrs" v-on="on"-->
                        <!--                            >-->
                        <!--                              <v-icon>remove_red_eye</v-icon>-->
                        <!--                              看诊-->
                        <!--                            </v-btn>-->
                        <!--                          </template>-->

                        <!--                          <v-data-table-->
                        <!--                              :headers="diseaseHeaders"-->
                        <!--                              :items="diseaseDesserts"-->
                        <!--                              :search="diseaseSearch"-->
                        <!--                              class="elevation-1"-->
                        <!--                              :footer-props="footers"-->
                        <!--                              loading-text="正在加载..."-->
                        <!--                              no-results-text="无匹配数据"-->
                        <!--                              no-data-text="暂无数据"-->
                        <!--                          ></v-data-table>-->
                        <!--                        </v-dialog>-->
                        <v-card width="550px">
                          <v-card-title>
                            疾病
                            <v-spacer />
                            <v-text-field
                              v-model="diseaseSearch"
                              append-icon="mdi-magnify"
                              label="搜索"
                              single-line
                              hide-details
                          ></v-text-field></v-card-title>

                          <v-data-table
                              :headers="diseaseHeaders"
                              :items="diseaseDesserts"
                              :search="diseaseSearch"
                              class="elevation-1"
                              :footer-props="footers"
                              loading-text="正在加载..."
                              no-results-text="无匹配数据"
                              no-data-text="暂无数据"
                              show-select
                              single-select
                              @item-selected="diseaseSelected"
                          ></v-data-table>
                        </v-card>

                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-textarea
                            v-model="diagnosis.pres"
                            label="医嘱"
                            outlined
                            rows="3"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-textarea
                            v-model="diagnosis.history_disease"
                            label="往病史"
                            outlined
                            rows="3"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-textarea
                            v-model="diagnosis.allergy_history"
                            label="过敏史"
                            outlined
                            rows="3"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="error" @click="closeDialog">取消</v-btn>
                  <v-btn class="success" text @click="save">保存</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <v-card class="mt-8">
      <v-card-title>已诊断</v-card-title>
      <v-data-table
          :headers="headers"
          :items="diagnosedDesserts"
          :search="search"
          class="elevation-1"
          :footer-props="footers"
          loading-text="正在加载..."
          no-results-text="无匹配数据"
          no-data-text="暂无数据"
      >

      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import {diagnose} from "../../api/doctor";
  import {diagnosed} from "../../api/doctor";
  import {getDisease} from "../../api/doctor";
  import {doDiagnose} from "../../api/doctor";
  import {notify} from "../../components/notification";


  export default {
    name: "Diagnose",
    beforeMount() {
      this.initDisease();
    },
    created() {
      this.initPatients();
    },
    methods: {
      diseaseSelected(value) {
        this.diagnosis.disease_id = value.item.id
      },
      initDisease() {
        getDisease()
          .then(res => {
            if (res.status === 200) {
              this.diseaseDesserts = res.data.data
            }
          }).catch();
      },
      initPatients() {
        diagnose()
          .then(res => {
            if (res.status === 200) {
              this.needDiagnoseDesserts = res.data.data;
              this.needDiagnoseDesserts.map((value => value.genders ? value.genders = '男' : value.genders = '女'));
            }
          }).catch();

        diagnosed()
          .then(res => {
            if (res.status === 200) {
              this.diagnosedDesserts = res.data.data;
              this.diagnosedDesserts.map((value => value.genders ? value.genders = '男' : value.genders = '女'));
            }
          }).catch();
      },
      editItem(item) {
        this.diagnosis.reg_id = item.id;
        this.dialog = true
      },
      diagnose() {
        this.diagnoseDialog = true
      },
      closeDialog() {
        this.dialog = false;
        this.$nextTick(() => {
          this.diagnosis = Object.assign({}, this.defaultDiagnosis);
          this.editedIndex = -1
        })
      },
      save() {
        doDiagnose(this.diagnosis)
        .then(res => {
          if (res.status === 200) {
            notify('success','看诊成功')
          } else {
            notify('fail', '看诊失败')
          }
        }).catch();
        setTimeout(this.initPatients, 500);
        this.dialog = false;
      }
    },
    data: () => ({
      editedIndex: -1,
      diagnosis: {
        reg_id: 0,
        pres: '',
        history_disease: '',
        allergy_history: '',
        disease_id: 0
      },
      defaultDiagnosis: {
        reg_id: 0,
        pres: '',
        history_disease: '',
        allergy_history: '',
        disease_id: 0
      },
      formTitle: '',
      diagnoseDialog: false,
      dialog: false,
      search: '',
      footers: {
        showCurrentPage: true,
        itemsPerPageText: '每页记录数',
        showFirstLastPage: true
      },
      needHeaders: [
        {text: 'ID', align: 'start', value: 'id'},
        {text: '病历号', value: 'medical_id'},
        {text: '姓名', value: 'name'},
        {text: '性别', value: 'genders'},
        {text: '生日', value: 'birthday'},
        {text: '操作', value: 'actions', sortable: false},
      ],
      diseaseHeaders: [
        {text: 'ID', align: 'start', value: 'id'},
        {text: '名称', value: 'disease_name'},
      ],
      diseaseSearch: '',
      headers: [
        {text: 'ID', align: 'start', value: 'id'},
        {text: '病历号', value: 'medical_id'},
        {text: '姓名', value: 'name'},
        {text: '性别', value: 'genders'},
        {text: '生日', value: 'birthday'},
      ],
      needDiagnoseDesserts: [],
      diagnosedDesserts: [],
      diseaseDesserts: [],
    })
  }
</script>

<style scoped>

</style>
