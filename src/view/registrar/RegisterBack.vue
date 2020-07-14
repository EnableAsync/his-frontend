<template>
  <v-container>
    <v-card>
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
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
              small
            @click="deleteItem(item)"
            >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: "RegisterBack",
    created() {
      this.desserts.map((value => value.genders ? value.genders = '男' : value.genders = '女'))
    },
    methods: {
      deleteItem (item) {
        const index = this.desserts.indexOf(item);
        confirm('确认退号？') && this.desserts.splice(index, 1)
      },
    },
    data: () => ({
      search: '',
      headers: [
        {
          text: '病历号',
          align: 'start',
          // sortable: false,
          value: 'medical_id',
        },
        {text: '姓名', value: 'name'},
        {text: '性别', value: 'genders'},
        {text: '操作', value: 'actions', sortable: false},
      ],
      desserts: [
        {
          medical_id: '1',
          name: '张三',
          genders: 1
        },
        {
          medical_id: '1',
          name: '李四',
          genders: 1
        },
        {
          medical_id: '1',
          name: '王五',
          genders: 1
        }
      ]
    })
  }
</script>

<style scoped>

</style>
