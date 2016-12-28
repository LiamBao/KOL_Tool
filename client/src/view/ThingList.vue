<template>
  <content-module name="things">
    <el-breadcrumb separator="/" style="margin-bottom:.5rem">
      <el-breadcrumb-item to="/dashboard">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Things</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-bottom:.5rem">
      <el-button type="primary" icon="plus" @click.native="createThing">Add</el-button>
    </div>
    <div>
      <el-card class="box-card" v-for="thing in things">
        <div slot="header" class="clearfix">
          <span>{{thing.name}}</span>
          <i class="el-icon-delete icon" @click="deleteThing(thing)"></i>
          <i class="el-icon-edit icon" @click="editThing(thing)"></i>
        </div>
        <p>
          {{thing.info}}
        </p>
      </el-card>
    </div>
    <el-dialog :title="form._id ? 'Update thing' : 'Add thing'" v-model="formVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="name" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="description">
          <el-input v-model="form.info"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="cancelForm">cancel</el-button>
        <el-button type="primary" @click.native="saveForm">save</el-button>
      </span>
    </el-dialog>
  </content-module>
</template>
<script>
import { thing } from 'resources'
export default {
  data () {
    return {
      formVisible: false,
      form: {
        _id: '',
        name: '',
        info: ''
      },
      rules: {
        name: [{ required: true, message: 'Please input the name', trigger: 'blur' }]
      },
      things: []
    }
  },
  methods: {
    fetch () {
      thing.query().then(data => data.json()).then(data => {
        this.things = data.data
      }).catch(err => {
        console.error(err)
      })
    },
    createThing () {
      this.formVisible = true
    },
    cancelForm () {
      this.form._id = ''
      this.form.name = ''
      this.form.info = ''
      this.formVisible = false
    },
    saveForm () {
      let promise
      if (this.form._id) {
        promise = thing.update({ _id: this.form._id }, this.form)
      } else {
        promise = thing.save({}, {
          name: this.form.name,
          info: this.form.info
        })
      }
      promise.then(() => {
        this.cancelForm()
        this.$message({
          type: 'success',
          message: this.form._id ? 'Update successed' : 'Create successed'
        })
        this.fetch()
      }).catch(() => {})
    },
    editThing (thing) {
      Object.assign(this.form, thing)
      this.formVisible = true
    },
    deleteThing (thing) {
      this.$confirm(`This action will remove the selected thing: ${thing.name} forever, still going on?`, 'warning', {
        type: 'warning'
      }).then(() => {
        thing.delete({ _id: thing._id }).then(() => {
          this.$message({
            type: 'success',
            message: 'Delete successed'
          })
          this.fetch()
        })
      }).catch(() => {})
    }
  },
  created () {
    this.fetch()
  }
}
</script>
<style lang="stylus" scoped>
@import "../assets/css/variable"
.box-card
  display inline-block
  width 20rem
  height 15rem
  margin .5rem
  .icon
    float right
    margin-left .5rem
    color $color-silver
    cursor pointer
    &:hover
      color $color-primary
</style>
