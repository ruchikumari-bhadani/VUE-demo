export default [{
  _name: 'CSidebarNav',
  _children: [
    {
      _name: 'CSidebarNavItem',
      name: 'Home',
      to: '/dashboard',
      _attrs: { class: 'goToHome' },
      icon: 'cil-speedometer',
    },
    // {
    //   _name: 'CSidebarNavTitle',
    //   _children: ['Cheats']
    // },
    {
      _name: 'CSidebarNavDropdown',
      name: 'Sheets',
      route: '/cheat',
      icon: 'cil-puzzle',
      items: [
        {
          name: 'Live Cheat Sheets',
          to: '/live-cheat',
          icon: 'cil-puzzle'
        },
        {
          name: 'Draft Cheat Sheets',
          to: '/draft-cheat',
          icon: 'cil-puzzle'
        }
      ]
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Profile',
      to: '/profile',
      icon: 'cil-puzzle'
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Log Out',
      _attrs: { class: 'logout-user' },
      icon: 'cil-puzzle'
    }
  ]
}]