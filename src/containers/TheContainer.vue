<template>
  <div class="c-app" :class="{ 'c-dark-theme': $store.state.darkMode }">
    <TheSidebar/>
    <CWrapper>
      <TheHeader/>
      <div class="c-body">
        <main :class="toggleClass == true ? 'c-main view' : 'c-main'" :style="toggleClass == true ? {'background-color': $store.state.backgroundColor}: ''">
          <CContainer fluid>
            <!-- <transition name="fade">
              <router-view></router-view>
            </transition> -->
            <router-view></router-view>
          </CContainer>
        </main>
      </div>
      <TheFooter/>
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'

export default {
  name: 'TheContainer',
  components: {
    TheSidebar,
    TheHeader,
    TheFooter
  },
  computed: {
    toggleClass() {
      if(this.$route.name == 'Cheat View'){
        return true
      }else {
        return false
      }
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
