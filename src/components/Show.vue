<template>

  <!-- Sidebar -->
  <div class="sidebar" :class="{ close: isSidebarClosed }">
    <a href="#" class="logo">
      <div class="logo-name">销售管理系统</div>
    </a>
    <ul class="side-menu">
      <li class="active"> <a href=" #"><i class='bx bxs-dashboard'></i>Dashboard</a>
      </li>
      <li @click="clickChange"><a href="#"><i class='bx bx-analyse'></i>Analytics</a></li>
    </ul>
    <ul class="side-menu">
      <li> <a href="#" class="logout" @click="logout">
          <i class='bx bx-log-out-circle'></i>
          Logout
        </a></li>
    </ul>
  </div>
  <!-- End of Sidebar -->

  <!-- Main Content -->
  <div class="content">
    <!-- Navbar -->
    <nav>
      <i class='bx bx-menu' @click="toggleSidebar"></i>
      <div class="changelight">
        <input type="checkbox" id="theme-toggle" v-model="isDarkTheme" hidden>
        <label for="theme-toggle" class="theme-toggle"></label>
      </div>
    </nav>

    <!-- End of Navbar -->

    <main>
      <div class="header">
        <div class="left">
          <h1>Dashboard</h1>
          <ul class="breadcrumb">
            <li><a href=" #" class="active">Data Analysis</a></li>
          </ul>
        </div>
        <a href="#" class="report">
          <i class='bx bx-show'></i>
          <span>加载更多</span>
        </a>
      </div>

      <!-- Insights -->
      <ul class="insights">
        <li>
          <i class='bx bx-calendar-check'></i>
          <span class="info">
            <h3>
              100
            </h3>
            <p>订单数</p>
          </span>
        </li>
        <li><i class='bx bx-show-alt'></i>
          <span class="info">
            <h3>
              13
            </h3>
            <p>会员数</p>
          </span>
        </li>
        <li><i class='bx bx-line-chart'></i>
          <span class="info">
            <h3>
              6
            </h3>
            <p>调货数</p>
          </span>
        </li>
        <li><i class='bx bx-dollar-circle'></i>
          <span class="info">
            <h3>
              13
            </h3>
            <p>连锁店数</p>
          </span>
        </li>
      </ul>
      <!-- End of Insights -->

      <div class="bottom-data">
        <div class="orders">
          <div class="header">
            <i class='bx bx-receipt'></i>
            <h3>管理员</h3>
            <i class='bx bx-filter' @click="turntoadmin"></i>
            <i class='bx bx-search' @click="turntoadmin"></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>管理员</th>
                <th>创建时间</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              <tr @click="turntoadmin" v-for="item in adminList" :key="item.admin_user">
                <td>
                  {{ item.admin_name }}
                </td>
                <td>{{ item.createTime }}</td>
                <td><span class="status" :class="{ process: item.admin_type == 1, pending: item.admin_type == 2 }">{{
                  item.admin_type == 2 ? '超级管理员' : '管理员' }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Reminders -->
        <div class="reminders">
          <div class="header">
            <i class='bx bx-note'></i>
            <h3>商品</h3>
            <i class='bx bx-filter'></i>
            <i class='bx bx-plus'></i>
          </div>
          <ul class="task-list">
            <li class="completed">
              <div class="task-title">
                <i class='bx bx-edit-alt'></i>
                <p>钢笔</p>
              </div>
              <i class='bx bx-dots-vertical-rounded'></i>
            </li>
            <li class="completed">
              <div class="task-title">
                <i class='bx bx-check-circle'></i>
                <p>办公电脑</p>
              </div>
              <i class='bx credit-card-front bx-dots-vertical-rounded'></i>
            </li>
            <li class="completed">
              <div class="task-title">
                <i class='bx bx-headphone'></i>
                <p>头戴耳机</p>
              </div>
              <i class='bx bx-dots-vertical-rounded'></i>
            </li>
          </ul>
        </div>

        <!-- End of Reminders-->

      </div>

    </main>

  </div>

</template>

<script>
export default {
  data () {
    return {
      isSidebarClosed: false,
      showSearchForm: false,
      activeLink: null,
      isDarkTheme: false,
      adminList: []

    };
  },
  computed: {
    searchBtnIconClass () {
      return this.showSearchForm ? 'bx bx-x' : 'bx bx-search';
    }
  },
  watch: {
    isDarkTheme (newVal) {
      if (newVal) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); // Initial check
    this.fetchData();
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    logout () {
      this.$router.push('/');
    },
    fetchData () {
      fetch('/admindata.json')
        .then(response => response.json())
        .then(data => {
          this.adminList = data.slice(0, 4);
          console.log(this.adminList)
        })
        .catch(error => console.error('Error fetching data:', error));
    },

    toggleSearchForm (event) {
      if (window.innerWidth < 576) {
        event.preventDefault();
        this.showSearchForm = !this.showSearchForm;
      }
    },
    clickChange (ele) {
      this.$router.push('/analytics');
    },
    handleResize () {
      if (window.innerWidth < 768) {
        this.isSidebarClosed = true;
      } else {
        this.isSidebarClosed = false;
      }
      if (window.innerWidth > 576) {
        this.showSearchForm = false;
      }
    },
    toggleSidebar () {
      this.isSidebarClosed = !this.isSidebarClosed;
    },
    turntoadmin () {
      this.$router.push('/admin');
    },

    setActiveLink (index) {
      this.activeLink = index;
    }
  }

}

</script>

<style>
@import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');

:root {
  --light: #f6f6f9;
  --primary: #1976D2;
  --light-primary: #CFE8FF;
  --grey: #eee;
  --dark-grey: #AAAAAA;
  --dark: #363949;
  --danger: #D32F2F;
  --light-danger: #FECDD3;
  --warning: #FBC02D;
  --light-warning: #FFF2C6;
  --success: #388E3C;
  --light-success: #BBF7D0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.bx {
  font-size: 1.7rem;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

html {
  overflow-x: hidden;
}

body.dark {
  --light: #181a1e;
  --grey: #25252c;
  --dark: #fbfbfb
}

body {
  background: var(--grey) !important;
  overflow-x: hidden;
}

.signup-section header,
.login-section header {
  cursor: pointer;
  /* Your header styles */
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  background: var(--light);
  width: 230px;
  height: 100%;
  z-index: 2000;
  overflow-x: hidden;
  scrollbar-width: none;
  transition: all 0.3s ease;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.sidebar.close {
  margin-top: 10px;
  width: 100px;
}

.sidebar .logo {
  font-size: 24px;
  font-weight: 700;
  height: 56px;
  display: flex;
  align-items: center;
  color: var(--primary);
  z-index: 500;
  padding-bottom: 20px;
  box-sizing: content-box;
}

.sidebar .logo .logo-name {
  margin-left: 17px;
}

.sidebar .logo .bx {
  min-width: 60px;
  display: flex;
  justify-content: center;
  font-size: 2.2rem;
}

.sidebar .side-menu {
  width: 100%;
  margin-top: 48px;
}

.sidebar .side-menu li {
  height: 48px;
  background: transparent;
  margin-left: 6px;
  border-radius: 48px 0 0 48px;
  padding: 4px;
}

.sidebar .side-menu li.active {
  background: var(--grey);
  position: relative;
}

.sidebar .side-menu li.active::before {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: -40px;
  right: 0;
  box-shadow: 20px 20px 0 var(--grey);
  z-index: -1;
}

.sidebar .side-menu li.active::after {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  bottom: -40px;
  right: 0;
  box-shadow: 20px -20px 0 var(--grey);
  z-index: -1;
}

.sidebar .side-menu li a {
  width: 100%;
  height: 100%;
  background: var(--light);
  display: flex;
  align-items: center;
  border-radius: 48px;
  font-size: 16px;
  color: var(--dark);
  white-space: nowrap;
  overflow-x: hidden;
  transition: all 0.3s ease;
}

.sidebar .side-menu li.active a {
  color: var(--success);
}

.sidebar.close .side-menu li a {
  width: calc(48px - (4px * 2));
  transition: all 0.3s ease;
}

.sidebar .side-menu li a .bx {
  min-width: calc(60px - ((4px + 6px) * 2));
  display: flex;
  font-size: 1.6rem;
  justify-content: center;
}

.sidebar .side-menu li a.logout {
  color: var(--danger);
}

.content {
  position: relative;
  width: calc(100% - 230px);
  left: 230px;
  transition: all 0.3s ease;
}

.sidebar.close~.content {
  width: calc(100% - 120px);
  left: 100px;
}

.content nav {
  height: 56px;
  background: var(--light);
  padding: 0 24px 0 0;
  display: flex;
  align-items: center;
  grid-gap: 95%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
}

.content nav::before {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: -40px;
  left: 0;
  border-radius: 50%;
  box-shadow: -20px -20px 0 var(--light);
}

.content nav a {
  color: var(--dark);
}

.content nav .bx.bx-menu {
  cursor: pointer;
  color: var(--dark);
}

.content nav form {
  max-width: 400px;
  width: 100%;
  margin-right: auto;
}

.content nav form .form-input {
  display: flex;
  align-items: center;
  height: 36px;
}

.content nav form .form-input input {
  flex-grow: 1;
  padding: 0 16px;
  height: 100%;
  border: none;
  background: var(--grey);
  border-radius: 36px 0 0 36px;
  outline: none;
  width: 100%;
  color: var(--dark);
}

.content nav form .form-input button {
  width: 80px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--primary);
  color: var(--light);
  font-size: 18px;
  border: none;
  outline: none;
  border-radius: 0 36px 36px 0;
  cursor: pointer;
}

.content nav .notif {
  font-size: 20px;
  position: relative;
}

.content nav .notif .count {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  background: var(--danger);
  border-radius: 50%;
  color: var(--light);
  border: 2px solid var(--light);
  font-weight: 700;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content nav .profile img {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
}

.content nav .theme-toggle {
  display: block;
  min-width: 50px;
  height: 25px;
  background: var(--grey);
  cursor: pointer;
  position: relative;
  border-radius: 25px;
}

.content nav .theme-toggle::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  bottom: 2px;
  width: calc(25px - 4px);
  background: var(--primary);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.content nav #theme-toggle:checked+.theme-toggle::before {
  left: calc(100% - (25px - 4px) - 2px);
}

.content main {
  width: 100%;
  padding: 36px 24px;
  max-height: calc(100vh - 56px);
}

.content main .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 16px;
  flex-wrap: wrap;
}

.content main .header .left h1 {
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--dark);
}

.content main .header .left .breadcrumb {
  display: flex;
  align-items: center;
  grid-gap: 16px;
}

.content main .header .left .breadcrumb li {
  color: var(--dark);
}

.content main .header .left .breadcrumb li a {
  color: var(--dark-grey);
  pointer-events: none;
}

.content main .header .left .breadcrumb li a.active {
  color: var(--primary);
  pointer-events: none;
}

.content main .header .report {
  height: 35px;
  padding: 0 16px;
  border-radius: 36px;
  background: var(--primary);
  color: var(--light);
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 10px;
  font-weight: 500;
}

.bx-show {
  margin-top: 5px;
}


.content main .insights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 24px;
  margin-top: 36px;
}

.content main .insights li {
  padding: 24px;
  background: var(--light);
  border-radius: 20px;
  display: flex;
  align-items: center;
  grid-gap: 24px;
  cursor: pointer;
}

.content main .insights li .bx {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content main .insights li:nth-child(1) .bx {
  background: var(--light-primary);
  color: var(--primary);
}

.content main .insights li:nth-child(2) .bx {
  background: var(--light-warning);
  color: var(--warning);
}

.content main .insights li:nth-child(3) .bx {
  background: var(--light-success);
  color: var(--success);
}

.content main .insights li:nth-child(4) .bx {
  background: var(--light-danger);
  color: var(--danger);
}

.content main .insights li .info h3 {
  font-size: 24px;
  font-weight: 600;
  color: var(--dark);
}

.content main .insights li .info p {
  color: var(--dark);
}

.content main .bottom-data {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 24px;
  margin-top: 24px;
  width: 100%;
  color: var(--dark);
}

.content main .bottom-data>div {
  border-radius: 20px;
  background: var(--light);
  padding: 24px;
  overflow-x: auto;
}

.content main .bottom-data .header {
  display: flex;
  align-items: center;
  grid-gap: 16px;
  margin-bottom: 24px;
}

.content main .bottom-data .header h3 {
  margin-right: auto;
  font-size: 24px;
  font-weight: 600;
}

.content main .bottom-data .header .bx {
  cursor: pointer;
}

.content main .bottom-data .orders {
  flex-grow: 1;
  flex-basis: 500px;

}

.content main .bottom-data .orders table {
  width: 100%;
  border-collapse: collapse;
}

.content main .bottom-data .orders table th {
  padding-bottom: 12px;
  font-size: 13px;
  text-align: left;
  border-bottom: 1px solid var(--grey);
}

.content main .bottom-data .orders table td {
  padding: 16px 0;
}

.content main .bottom-data .orders table tr td:first-child {
  display: flex;
  align-items: center;
  grid-gap: 12px;
  padding-left: 6px;
}

.content main .bottom-data .orders table td img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.content main .bottom-data .orders table tbody tr {
  cursor: pointer;
  transition: all 0.3s ease;
}

.content main .bottom-data .orders table tbody tr:hover {
  background: var(--grey);
}


.content main .bottom-data .orders table tr td .status {
  font-size: 10px;
  padding: 6px 16px;
  color: var(--light);
  border-radius: 20px;
  font-weight: 700;

}

.content main .bottom-data .orders table tr td .status.completed {
  background: var(--success);
}

.completed p {
  margin: 0px;
  padding-left: 10px;

}

.completed i {
  margin-top: 2px;
}

.content main .bottom-data .orders table tr td .status.process {
  background: var(--primary);
}

.content main .bottom-data .orders table tr td .status.pending {
  background: var(--warning);
}

.content main .bottom-data .reminders {
  flex-grow: 1;
  flex-basis: 300px;
}

.content main .bottom-data .reminders .task-list {
  width: 100%;
  padding-left: 0;
}



.content main .bottom-data .reminders .task-list li {
  width: 100%;
  margin-bottom: 16px;
  background: var(--grey);
  padding: 14px 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content main .bottom-data .reminders .task-list li .task-title {
  display: flex;
  align-items: center;
}

.content main .bottom-data .reminders .task-list li .task-title p {
  margin-left: 6px;
}

.content main .bottom-data .reminders .task-list li .bx {
  cursor: pointer;
}

.content main .bottom-data .reminders .task-list li.completed {
  border-left: 10px solid var(--success);
}

.content main .bottom-data .reminders .task-list li.not-completed {
  border-left: 10px solid var(--danger);
}

.content main .bottom-data .reminders .task-list li:last-child {
  margin-bottom: 0;
}

@media screen and (max-width: 768px) {
  .sidebar {
    width: 200px;
  }

  .content {
    width: calc(100% - 60px);
    left: 200px;
  }

}

@media screen and (max-width: 576px) {

  .content nav form .form-input input {
    display: none;
  }

  .content nav form .form-input button {
    width: auto;
    height: auto;
    background: transparent;
    color: var(--dark);
    border-radius: none;
  }

  .content nav form.show .form-input input {
    display: block;
    width: 100%;
  }

  .content nav form.show .form-input button {
    width: 36px;
    height: 100%;
    color: var(--light);
    background: var(--danger);
    border-radius: 0 36px 36px 0;
  }

  .content nav form.show~.notif,
  .content nav form.show~.profile {
    display: none;
  }

  .content main .insights {
    grid-template-columns: 1fr;
  }

  .content main .bottom-data .header {
    min-width: 340px;
  }

  .content main .bottom-data .orders table {
    min-width: 340px;
  }

  .content main .bottom-data .reminders .task-list {
    min-width: 340px;
  }

  td,
  p {
    text-align: center;
    line-height: 100%;
    padding: 16px 6px !important;
  }

}
</style>