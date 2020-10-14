<template>
  <CSidebar 
    :minimize="minimize"
    unfoldable
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand to="/home">
      <!-- <CIcon 
        class="c-sidebar-brand-full" 
        name="logo" 
        size="custom-size"
        :height="35" 
        viewBox="0 0 556 134"
      />
      <CIcon 
        class="c-sidebar-brand-minimized" 
        name="logo" 
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      /> -->
      <!-- <div class="logo-img-header">
          <img src="../assets/images/logo-cheatii-2.png" alt="">
      </div> -->
      <div class="logo-img-header">
          <img src="../assets/images/cheatii-logo.png" alt="">
      </div>
    </CSidebarBrand>
    <CRenderFunction flat :contentToRender="$options.nav"/>
    <CSidebarMinimizer 
      class="c-d-md-down-none" 
      @click.native="$store.commit('toggle', 'sidebarMinimize')"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'
import Store from '../store'
import router from '../router/index'
import $ from "jquery";
export default {
  name: 'TheSidebar',
  nav,
  computed: {
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  },
  mounted() {
    $(document).ready(function(){
  
      $('.logout-user').on("click", function(){
      Store.dispatch('auth0Logout');
    });

    //   $('.goToHome').on("click", function(){
    //     router.push({ name: 'Dashboard'});
    // });
    });
  }
}

</script>
