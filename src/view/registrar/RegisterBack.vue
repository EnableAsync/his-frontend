<template>
  <v-container>
    <v-card class="mt-2">
      <v-card-title>已挂号
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
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import {delRecord} from "../../api/registrar";
  import {getRegisterRecords} from "../../api/registrar";
  import {notify} from "../../components/notification";

  export default {
    name: "RegisterBack",
    created() {
      this.initRecords();
    },
    methods: {
      initRecords() {
        getRegisterRecords()
          .then(res => {
            if (res.status !== 200) {
              notify('fail', res.data.msg);
              return
            }
            this.desserts = res.data.data;
            this.desserts.map((value => value.genders ? value.genders = '男' : value.genders = '女'))
          })
      },
      deleteItem(item) {
        const index = this.desserts.indexOf(item);
        if (index === -1) {
          return
        }
        const id = item.id;
        confirm('确认退号？') &&
        delRecord(id)
          .then(res => {
            if (res.status === 200) {
              notify('success', '退号成功');
              this.initRecords();
            }
          })
      },
    },
    data: () => ({
      search: '',
      footers: {
        showCurrentPage: true,
        itemsPerPageText: '每页记录数',
        showFirstLastPage: true
      },
      headers: [
        // sortable: false
        {text: 'ID', align: 'start', value: 'id',},
        {text: '病历号', value: 'medical_id'},
        {text: '姓名', value: 'name'},
        {text: '性别', value: 'genders'},
        {text: '生日', value: 'birthday'},
        {text: '操作', value: 'actions', sortable: false},
      ],
      desserts: []
    })
  }
</script>

<style scoped>

</style>
