<template>
  <div class="admin-manage">
    <div class="main-content">

      <div class="divContent">
        <!-- 搜索 -->
        <div class="navsearch">
          <input type="text" placeholder="姓名" class="form-control" @focus="startSearch" v-model="searchQuery"
            id="txtSearch" />
          <button class="btn btn-primary" @click="search" id="btnSearch">搜索</button>
          <button class="btn btn-default" @click="reset" id="btnReset">重置</button>
          <button class="btn btn-default" @click="showAddModal" id="btnAdd">添加管理员</button>
        </div>
        <!-- 数据显示 -->
        <div class="table-responsive" v-show="isdataVisible">
          <table class="table table-condensed">
            <thead>
              <tr>
                <th>编号</th>

                <th>用户名</th>
                <th>姓名</th>
                <th>类型</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody id="tbAdmin">
              <tr v-for="item in currentAdmin" :key="item.admin_no">
                <td>{{ item.admin_no }}</td>
                <td>{{ item.admin_user }}</td>
                <td>{{ item.admin_name }}</td>
                <td>{{ item.state == 1 ? '有效' : '冻结' }}</td>
                <td>{{ item.admin_type == 2 ? '超级管理员' : '管理员' }}</td>
                <td>
                  <span class="del" @click="deleteAdmin(item.admin_no)">删除</span>
                  <span class="update" @click="showUpdateModal(item)">修改</span>
                </td>
              </tr>
              <tr v-if="adminList.length === 0">
                <td colspan="5" class="text-center text-danger">查询无此数据</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 页码 -->
        <div id="divPage">
          <!-- Pagination Component -->
        </div>
      </div>

      <!-- 添加的模态框 -->
      <div id="addModel" v-show="isAddModalVisible">
        <form @submit.prevent="saveAdmin">
          <p><input type="text" class="form-control" placeholder="用户名" v-model="newAdmin.admin_user"
              required /><span></span></p>
          <p><input type="password" class="form-control" placeholder="密码" v-model="newAdmin.admin_pwd"
              required /><span></span>
          </p>

          <p><input type="text" class="form-control" placeholder="姓名" v-model="newAdmin.admin_name"
              required /><span></span></p>
          <p>
            <select v-model="newAdmin.admin_type" class="form-control">
              <option value="2">超级管理员</option>
              <option value="1">管理员</option>
            </select>
          </p>
          <b-button type="submit" variant="primary" class="bbtn">保存</b-button>
          <b-button @click="hideAddModal" variant="secondary">取消</b-button>
        </form>
      </div>

      <!-- 修改的模态框 -->
      <div v-show="isUpdateModalVisible" id="updateModel" hide-footer>
        <form @submit.prevent="updateAdmin">
          <p><input type="hidden" v-model="updateAdmindata.id" /></p>
          <p><input type="text" disabled="disabled" class="form-control" placeholder="用户名"
              v-model="updateAdmindata.admin_user" /><span></span></p>
          <p><input type="text" class="form-control" placeholder="姓名"
              v-model="updateAdmindata.admin_name" /><span></span></p>
          <p>
            <select v-model="updateAdmindata.admin_type" class="form-control">
              <option value="2">超级管理员</option>
              <option value="1">管理员</option>
            </select>

          </p>
          <p>
            <select v-model="updateAdmindata.state" class="form-control">
              <option value="1">有效</option>
              <option value="0">冻结</option>
            </select>
          </p>
          <p>更新时间：<label>{{ new Date().toLocaleString() }}</label></p>
          <b-button type="submit" variant="primary" class="bbtn">保存</b-button>
          <b-button @click="hideUpdateModal" variant="secondary">取消</b-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchQuery: '',
      adminList: [],
      newAdmin: {
        admin_no: -1,
        admin_user: '',
        admin_pwd: '',
        admin_name: '',
        state: 1,
        isDelete: 1,
        createTime: '',
        admin_type: 2,
      },
      updateAdmindata: {
        admin_no: -1,
        admin_user: '',
        admin_pwd: '',
        admin_name: '',
        state: 1,
        isDelete: 1,
        createTime: '',
        admin_type: 2,
      },
      currentAdmin: [],
      isAddModalVisible: false,
      isUpdateModalVisible: false,
      isdataVisible: true,
      currentIndex: -1
    };
  },
  methods: {
    fetchData () {
      fetch('/admindata.json')
        .then(response => response.json())
        .then(data => {
          let dataNoDelete = []
          data.forEach((ele) => {

            if (ele.isDelete === 1) {
              dataNoDelete.push(ele)
            }
          })
          this.adminList = dataNoDelete;
          this.currentAdmin = dataNoDelete;
          this.currentIndex = data[data.length - 1].admin_no + 1

        })
        .catch(error => console.error('Error fetching data:', error));
    },
    startSearch () {
      this.isAddModalVisible = false;
      this.isUpdateModalVisible = false;
      this.isdataVisible = true

    },
    search () {
      this.startSearch()
      this.currentAdmin = []
      this.adminList.forEach((ele) => {
        if (ele.admin_name.includes(this.searchQuery)) {
          this.currentAdmin.push(ele)
        }
      })
    },
    reset () {
      this.startSearch()
      this.searchQuery = '';
      this.currentAdmin = this.adminList
    },
    showAddModal () {
      this.isAddModalVisible = !this.isAddModalVisible;
      this.isdataVisible = !this.isdataVisible
    },
    hideAddModal () {
      this.isAddModalVisible = !this.isAddModalVisible;
      this.isdataVisible = !this.isdataVisible
    },
    saveAdmin () {
      this.newAdmin.admin_no = this.currentIndex
      this.currentIndex++
      this.newAdmin.createTime = new Date().toLocaleString()
      this.adminList.push(this.newAdmin)
      this.newAdmin = {
        admin_no: -1,
        admin_user: '',
        admin_pwd: '',
        admin_name: '',
        state: 1,
        isDelete: 1,
        createTime: '',
        admin_type: 2,
      }
      this.isAddModalVisible = !this.isAddModalVisible;
      this.isdataVisible = !this.isdataVisible
    },
    updateAdmin () {
      this.updateAdmin.createTime = new Date().toLocaleString()
      this.adminList[this.updateAdmin.admin_no] = this.updateAdmin
      this.isUpdateModalVisible = !this.isUpdateModalVisible;
      this.isdataVisible = !this.isdataVisible
    },
    showUpdateModal (ele) {
      this.isUpdateModalVisible = !this.isUpdateModalVisible
      this.isdataVisible = !this.isdataVisible
      this.updateAdmindata = ele
    },
    hideUpdateModal () {
      this.isUpdateModalVisible = !this.isUpdateModalVisible
      this.isdataVisible = !this.isdataVisible
    },
    deleteAdmin (id) {
      let order = -1
      this.adminList.forEach((ele, index) => {
        if (ele.admin_no === id) {
          order = index
        }
      })
      this.adminList.splice(order, order + 1)
    }
  },
  mounted () {
    this.search();
    this.fetchData();
  }
};

</script>

<style scoped>
.admin-manage {
  display: flex;
}

aside {
  width: 200px;
  /* 你可以在这里添加你的样式 */
}

.main-content {
  flex: 1;
  padding: 20px;
}

#txtSearch {
  padding: auto 20px;
  width: 200px;
  display: inline-block;
}

#btnReset {
  padding: auto 20px;
}

#btnSearch {
  background-color: #4985fb;
}

#btnAdd {
  color: green;
  border: 1px solid green;
}

.del,
.update {
  color: #4985fb;
  cursor: pointer;
}

#divPage button.active {
  background-color: blue;
  color: white;
}

#tbAdmin:empty::before {
  content: "查询无此数据";
  display: block;
  color: red;
  text-align: center;
}

#frmAddAdmin {
  width: 300px;
}

#frmAddAdmin span {
  color: red;
  padding-top: 10px;
}

.table-responsive {
  width: 90%;
  margin: 20px auto;
  border-radius: 10px;
}

.navsearch {

  margin: 20px auto;
  text-align: center;

}

.del {
  padding: 3px 10px;
  background-color: #4985fb;
  border-radius: 5px;
  color: white;
}

.update {
  margin-left: 10px;
  padding: 3px 10px;
  background-color: #4985fb;
  border-radius: 5px;
  color: white;
}

#btnSearch {
  margin-left: 10px;
}

td,
th {
  text-align: center;
}

#addModel,
#updateModel {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 800px;
  margin: 0 auto;

}



.bbtn {
  margin: 10px;
}

.form-control {
  width: 250px;
}
</style>