<template>
  <v-container>
    <v-card class="mt-2">
      <v-card-title>已开立
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
            payment
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import {pay} from "../../api/registrar";
  import {getNeedPay} from "../../api/registrar";
  import {notify} from "../../components/notification";

  export default {
    name: "Payment",
    created() {
      this.initPay();
    },
    methods: {
      initPay() {
        getNeedPay()
          .then(res => {
            if (res.status === 200) {
              this.desserts = res.data.data;
            }
          }).catch();
        this.desserts.map((value => value.genders ? value.genders = '男' : value.genders = '女'))
      },
      deleteItem(item) {
        const index = this.desserts.indexOf(item);
        if (index === -1) {
          return
        }
        const id = item.prescription_id;
        confirm('确认缴费？') &&
        pay({pres_id: id})
          .then(res => {
            if (res.status === 200) {
              notify('success', '缴费成功');
              this.initPay();
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
        {text: '处方号', align: 'start', value: 'prescription_id',},
        {text: '操作', value: 'actions', sortable: false},
      ],
      desserts: [
        {prescription_id: 0}
      ]
    })
  }
</script>

<style scoped>

</style>
