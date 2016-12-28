<template>
  <content-module name="users">
    <el-breadcrumb separator="/" style="margin-bottom:.5rem">
      <el-breadcrumb-item to="/dashboard">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Users</el-breadcrumb-item>
    </el-breadcrumb>
    <data-table :data="users" ref="users" row-key="_id"
      @page-change="fetch">
      <div slot="toolbar">
        <el-button type="primary" icon="plus" @click.native="createUser">Add</el-button>
      </div>
      <el-table-column property="_id" label="ID" sortable min-width="120"></el-table-column>
      <el-table-column property="username" label="Username" sortable min-width="120"></el-table-column>
      <el-table-column property="role" label="Role" min-width="90"></el-table-column>
      <el-table-column inline-template label="Operate" align="center" width="100">
        <el-button type="text" @click.native="deleteUser(row)">Delete</el-button>
      </el-table-column>
    </data-table>
    <el-dialog title="Create a user" v-model="formVisible" @close="cancelForm">
      <el-form :model="form" :rules="rules" ref="form"
        :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="formVisible=false">cancel</el-button>
        <el-button type="primary" @click.native="saveForm">save</el-button>
      </span>
    </el-dialog>
  </content-module>
</template>
<script>
import DataTable from 'components/DataTable'
import { user } from 'resources'
export default {
  data () {
    return {
      search: {
      },
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{
          required: true, message: 'Please input the username', trigger: 'blur'
        }],
        password: [{
          required: true, message: 'Please input the password', trigger: 'blur'
        }]
      },
      formVisible: false,
      users: []
    }
  },
  components: {
    DataTable
  },
  methods: {
    fetch (current = 1) {
      this.$refs.users.query(user, current, { search: this.search }).then(list => {
        this.users = list
      }).catch(err => {
        console.error(err)
      })
    },
    createUser () {
      this.formVisible = true
    },
    cancelForm () {
      this.form.username = ''
      this.form.password = ''
      this.formVisible = false
    },
    saveForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http.post('users', this.form).then(() => {
            this.cancelForm()
            this.$message({
              type: 'success',
              message: 'Create successed'
            })
            this.fetch()
          }).catch((err) => {
            this.$message({
              type: 'error',
              message: err.status === 422 ? 'User existed' : 'Create failed'
            })
          })
        }
      })
    },
    deleteUser (user) {
      this.$confirm(`This action will remove the selected user: ${user.username} forever, still going on?`, 'warning', {
        type: 'warning'
      }).then(() => {
        user.delete({ _id: user._id }).then(() => {
          this.$message({
            type: 'success',
            message: 'Delete successed'
          })
          this.fetch()
        })
      }).catch(() => {})
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.fetch()
    })
  }
}
</script>
