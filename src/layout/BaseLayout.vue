<template>
  <v-app id="inspire">

    <v-navigation-drawer
        v-model="drawer"
        app
        clipped
    >
      <v-list nav>
        <template v-for="item in items">
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
                @click="$router.push(child.routePath)"
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

    <div style="display: flex; flex-direction: column; align-items: center;">
      <Notification></Notification>
    </div>

    <v-main>
      <keep-alive>
        <transition name="fade-transform" mode="out-in">
          <router-view/>
        </transition>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
  import Notification from "../components/notification/Notification";

  export default {
    name: "Layout",
    components: {Notification},
    props: {
      source: String,
    },
    methods: {},
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
            {icon: 'group_add', text: '挂号', routePath: '/register'},
            {icon: 'remove_circle_outline', text: '退号', routePath: '/register/back'},
            {icon: 'payment', text: '收费', routePath: '/payment'}
          ]
        },
        {
          icon: 'mdi-chevron-down',
          'icon-alt': 'mdi-chevron-right',
          text: '医生',
          model: true,
          children: [
            {icon: 'remove_red_eye', text: '诊断', routePath: '/diagnose'},
            {icon: 'post_add', text: '开药', routePath: '/prescribe'},
          ]
        },
        {
          icon: 'mdi-chevron-down',
          'icon-alt': 'mdi-chevron-right',
          text: '药房',
          model: true,
          children: [
            {icon: 'local_hospital', text: '发药', routePath: '/send'},
          ]
        }
      ],
    }),
  }
</script>

<style scoped>
  /* fade */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.28s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  /* fade-transform */
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all .2s;
  }

  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  /* breadcrumb transition */
  .breadcrumb-enter-active,
  .breadcrumb-leave-active {
    transition: all .5s;
  }

  .breadcrumb-enter,
  .breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
  }

  .breadcrumb-move {
    transition: all .5s;
  }

  .breadcrumb-leave-active {
    position: absolute;
  }
</style>
