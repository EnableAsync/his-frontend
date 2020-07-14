<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
        clipped
    >
      <v-list>
        <template v-for="item in items">
          <!--          <v-row-->
          <!--              v-if="item.heading"-->
          <!--              :key="item.heading"-->
          <!--              align="center"-->
          <!--          >-->
          <!--            <v-col cols="6">-->
          <!--              <v-subheader v-if="item.heading">-->
          <!--                {{ item.heading }}-->
          <!--              </v-subheader>-->
          <!--            </v-col>-->
          <!--            <v-col-->
          <!--                cols="6"-->
          <!--                class="text-center"-->
          <!--            >-->
          <!--              <a-->
          <!--                  href="#"-->
          <!--                  class="body-2 black&#45;&#45;text"-->
          <!--              >EDIT</a>-->
          <!--            </v-col>-->
          <!--          </v-row>-->
          <v-list-group
              v-if="item.children"
              :key="item.text"
              v-model="item.model"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
                v-for="(child, i) in item.children"
                :key="i"
                link
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
              v-else
              :key="item.text"
              link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        app
        color="blue darken-3"
        dark
        clipped-left
    >
      <!--            :clipped-left="$vuetify.breakpoint.lgAndUp"-->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
          style="width: 300px"
          class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">东软云医院</span>
      </v-toolbar-title>
      <!--            <v-text-field-->
      <!--                    flat-->
      <!--                    solo-inverted-->
      <!--                    hide-details-->
      <!--                    prepend-inner-icon="mdi-magnify"-->
      <!--                    label="Search"-->
      <!--                    class="hidden-sm-and-down"-->
      <!--            ></v-text-field>-->
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn
          icon
          large
      >
        <v-avatar
            size="32px"
            item
        >
          <v-img
              src="../assets/logo.svg"
              alt="Vuetify"
          ></v-img>
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: "Layout",
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        {
          icon: 'mdi-chevron-down',
          'icon-alt': 'mdi-chevron-right',
          text: '挂号员',
          model: true,
          children: [
            {icon: 'mdi-plus', text: '挂号'},
            {icon: 'mdi-minus', text: '退号'}
          ]
        }
        // {icon: 'mdi-contacts', text: 'Contacts'},
        // {icon: 'mdi-history', text: 'Frequently contacted'},
        // {icon: 'mdi-content-copy', text: 'Duplicates'},
        // {
        //   icon: 'mdi-chevron-up',
        //   'icon-alt': 'mdi-chevron-down',
        //   text: 'Labels',
        //   model: true,
        //   children: [
        //     {icon: 'mdi-plus', text: 'Create label'},
        //   ],
        // },
        // {
        //   icon: 'mdi-chevron-up',
        //   'icon-alt': 'mdi-chevron-down',
        //   text: 'More',
        //   model: false,
        //   children: [
        //     {text: 'Import'},
        //     {text: 'Export'},
        //     {text: 'Print'},
        //     {text: 'Undo changes'},
        //     {text: 'Other contacts'},
        //   ],
        // },
        // {icon: 'mdi-cog', text: 'Settings'},
        // {icon: 'mdi-message', text: 'Send feedback'},
        // {icon: 'mdi-help-circle', text: 'Help'},
        // {icon: 'mdi-cellphone-link', text: 'App downloads'},
        // {icon: 'mdi-keyboard', text: 'Go to the old version'},
      ],
    }),
  }
</script>

<style scoped>

</style>
