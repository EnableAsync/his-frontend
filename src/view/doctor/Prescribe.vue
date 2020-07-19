<template>
  <v-container>
    <v-card class="mt-2">
      <v-card-title>已诊断
        <v-spacer/>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="搜索"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          class="elevation-1"
          :footer-props="footers"
          loading-text="正在加载..."
          no-results-text="无匹配数据"
          no-data-text="暂无数据"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="editItem(item)">
            mdi-pencil
          </v-icon>
        </template>

        <template v-slot:top>
          <v-dialog v-model="dialog" width="1000px">
            <v-card>
              <v-card-title>开药</v-card-title>
              <v-card-text>
                <v-container>
                  <v-text-field
                      v-model="submitData.pres"
                      label="药方名称"
                  ></v-text-field>
                  <v-data-table
                      :headers="drugHeaders"
                      :items="submitData.drugs"
                      class="elevation-1"
                      loading-text="正在加载..."
                      no-results-text="无匹配数据"
                      no-data-text="暂无数据"
                      :footer-props="footers"
                  >
                    <template v-slot:top>
                      <v-toolbar flat color="white">
                        <v-toolbar-title>药品</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="selectDrugDialog" max-width="800px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="primary"
                                v-bind="attrs"
                                v-on="on"
                            >新增药品
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title>选择药品</v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col>
                                    <v-card width="800px">
                                      <v-card-title>
                                        药品列表
                                        <v-spacer/>
                                        <v-text-field
                                            v-model="drugSearch"
                                            append-icon="mdi-magnify"
                                            label="搜索"
                                            single-line
                                            hide-details
                                        ></v-text-field>
                                      </v-card-title>

                                      <v-data-table
                                          :headers="drugHeaders"
                                          :items="drugDesserts"
                                          :search="drugSearch"
                                          class="elevation-1"
                                          :footer-props="footers"
                                          loading-text="正在加载..."
                                          no-results-text="无匹配数据"
                                          no-data-text="暂无数据"
                                          show-select
                                          v-model="submitData.drugs"
                                      >
                                        <template v-slot:item.count="props">
                                          <v-edit-dialog
                                              :return-value.sync="props.item.count"
                                              large
                                              persistent
                                          >{{ props.item.count }}
                                            <template v-slot:input>
                                              <v-text-field
                                                v-model="props.item.count"
                                                label="数量"
                                                single-line
                                                ></v-text-field>
                                            </template>
                                          </v-edit-dialog>
                                        </template>
                                      </v-data-table>
                                    </v-card>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn class="error" @click="finishSelect">取消选药</v-btn>
                              <v-btn class="success" text @click="finishSelect">完成选药</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                    </template>
                  </v-data-table>
                </v-container>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn class="error" @click="cancelPrescribe">取消开药</v-btn>
                  <v-btn class="success" text @click="prescribe">确认开药</v-btn>
                </v-card-actions>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import {diagnosed} from "../../api/doctor";
  import {getDrugs} from "../../api/doctor";
  import {prescribe} from "../../api/doctor";
  import {notify} from "../../components/notification";

  export default {
    name: "Prescribe",
    data: () => ({
      selectDrugDialog: false,
      dialog: false,
      drugDialog: false,
      search: '',
      footers: {
        showCurrentPage: true,
        itemsPerPageText: '每页记录数',
        showFirstLastPage: true,
      },
      headers: [
        {text: 'ID', align: 'start', value: 'id'},
        {text: '病历号', value: 'medical_id'},
        {text: '姓名', value: 'name'},
        {text: '性别', value: 'genders'},
        {text: '生日', value: 'birthday'},
        {text: '操作', value: 'actions', sortable: false},
      ],
      diagnosedDesserts: [],
      desserts: [],
      drugHeaders: [
        {text: 'ID', align: 'start', value: 'id'},
        {text: '名称', value: 'drug_name'},
        {text: '数量', value: 'count'},
      ],
      drugDesserts: [],
      drugSearch: '',
      submitData: {
        reg_id: 0,
        pres: '',
        drugs: [],
        all_drugs_count: 0
      }
    }),
    created() {
      this.initDiagnosed();
      this.initDrugs();
    },
    methods: {
      cancelPrescribe() {
        this.submitData.drugs = [];
        this.dialog = false;
      },
      prescribe() {
        this.submitData.all_drugs_count = this.submitData.drugs.length;
        prescribe(this.submitData)
        .then(res => {
          if (res.status === 200) {
            notify('success', '开药成功')
          } else {
            notify('fail', '开药失败')
          }
        }).catch();
        setTimeout(this.initDiagnosed, 500);
        this.dialog = false;
      },
      finishSelect() {
        this.selectDrugDialog = false;
      },
      initDrugs() {
        getDrugs()
          .then(res => {
            if (res.status === 200) {
              this.drugDesserts = res.data.data;
            }
          }).catch()
      },
      initDiagnosed() {
        diagnosed()
          .then(res => {
            if (res.status === 200) {
              this.desserts = res.data.data;
              this.desserts.map((value => value.genders ? value.genders = '男' : value.genders = '女'));
            }
          }).catch();
      },
      editItem(item) {
        this.submitData.reg_id = item.id;
        this.dialog = true;
      },
    }
  }
</script>

<style scoped>

</style>
