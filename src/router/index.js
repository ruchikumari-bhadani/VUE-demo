import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Home = () => import('@/views/Home')
const LiveCheat = () => import('@/views/Live-Cheat-Sheets')
const DraftCheat = () => import('@/views/Draft-Cheat-Sheets')
const Profile = () => import('@/views/Profile')
const AddEditCheat = () => import('@/views/cheat/Add-Edit-Cheat')
const SummaryDetail = () => import('@/views/cheat/Summary-Detail')
const BodyEdit = () =>  import('@/views/Shared-Templates/Body-edit')
const HeaderCheat = () => import('@/views/Shared-Templates/Cheat-Header')
const EditHeaderCheat = () => import('@/views/Shared-Templates/Cheat-Header-Edit')
const BodyCheat = () => import('@/views/Shared-Templates/Cheat-Body')
const FooterCheat = () => import('@/views/Shared-Templates/Cheat-Footer')
const EditFooterCheat = () => import('@/views/Shared-Templates/Cheat-Footer-Edit')
const CheatBody = () => import('@/views/Shared-Templates/CheatBody')
const Dummy = () => import('@/views/Shared-Templates/dummy')
const LandingPage = () => import('@/views/Main/Landing-Page')
const TestPage = () => import('@/views/Main/Landing-Nav')
const CheckoutPage = () => import('@/views/Main/Payment/Checkout-Page')
const PaymentPage = () => import('@/views/Main/Payment/Payment-Method-Page')
const CheatView = () => import('@/views/CheatView/Cheat-View')
const CheatHistory = () => import('@/views/HistoryTable/History-Table')
const Auth0Callback = () => import('@/views/Auth0Callback')


Vue.use(Router)

const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  base: process.env.BASE_URL,
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      meta: { requiresAuth: true },
      children: [
        // {
        //     path: 'home',
        //     name: 'Home',
        //     component: Dashboard
        // },
        {
            path: 'dashboard',
            name: 'Dashboard',
            component: Home
        },
        {
            path: 'cheat',
            name: 'Add Edit Cheat',
            component: AddEditCheat
        },
        {
            path: 'live-cheat',
            name: 'Live Cheat',
            component: LiveCheat
        },
        {
            path: 'draft-cheat',
            name: 'Draft Cheat',
            component: DraftCheat
        },
        {
            path: 'profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: 'cheat/detail/dummy2',
            name: 'dummy2',
            component: Dummy
        }
      ]
    },
    {
      path: '/cheat/:cheatId',
      name: 'Cheat',
      redirect: '/cheat/:cheatId',
      component: TheContainer,
      meta: { requiresAuth: true },
      children: [
          {
            path: '',
            name: 'Cheat Summary',
            component: SummaryDetail
          },
          {
            path: 'header',
            name: 'Cheat Header',
            component: HeaderCheat
          },
          {
            path: 'header/edit/:id',
            name: 'Edit Cheat Header',
            component: EditHeaderCheat
          },
          {
            path: 'bodyedit',
            name: 'BodyEdit',
            component: BodyEdit
          },
          {
            path: 'bodyedit/:id',
            name: 'Body Edit Id',
            component: BodyEdit
          },
          {
            path: 'view',
            name: 'Cheat View',
            component: CheatView
          },
          {
            path: 'dummy/:id',
            name: 'Dummy',
            component: CheatBody
          },
          {
            path: 'body',
            name: 'Cheat Body',
            component: BodyCheat
          },
          {
            path: 'footer',
            name: 'Cheat Footer',
            component: FooterCheat
          },
          {
            path: 'footer/edit/:id',
            name: 'Edit Cheat Footer',
            component: EditFooterCheat
          },
          {
            path: 'history',
            name: 'Cheat History',
            component: CheatHistory
          },

      ]
    },
    {
        path: '/home',
        name: 'Landing Page',
        component: LandingPage
    },
    {
        path: '/pdf',
        name: 'test Page',
        component: TestPage
    },
    {
        path: '/checkout',
        name: 'Checkout Page',
        component: CheckoutPage
    },
    {
        path: '/payment',
        name: 'Payment Page',
        component: PaymentPage
    },
    {
        path: '/auth0callback',
        name: 'auth0callback',
        component: Auth0Callback
    }
  ]
});

router.beforeEach((to, from, next) => {
    // Allow finishing callback url for logging in
    if(to.matched.some(record=>record.path == "/auth0callback")){
        Store.dispatch('auth0HandleAuthentication');
        next(false);
    }
    // check if user is logged in (start assuming the user is not logged in = false)
    let routerAuthCheck = false;
    // Verify all the proper access variables are present for proper authorization
    if( localStorage.getItem('access_token') && localStorage.getItem('id_token') && localStorage.getItem('expires_at') ){
        // Check whether the current time is past the Access Token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        // set localAuthTokenCheck true if unexpired / false if expired
        routerAuthCheck = new Date().getTime() < expiresAt;  
    }
    // set global ui understanding of authentication
    Store.commit('setUserIsAuthenticated', routerAuthCheck);
      
    // check if the route to be accessed requires authorizaton
    if(to.matched.some(record => record.meta.requiresAuth)){
        // Check if user is Authenticated
        if(routerAuthCheck){
            // user is Authenticated
            next();
        }else{
            //user is not Authenticated
            router.push('/home');
        }

    }else {
        // Allow page to load
        next();
    }
});

export default router;
