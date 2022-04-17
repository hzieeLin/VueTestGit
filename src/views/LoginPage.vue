<template>
  <div class="container">
    <div class="login-box">
      <div class="avatar-box">
        <img :src="defaultUrl" alt="">
      </div>
      <el-form class="login-form" :model="loginForm" :rules="FormRules" ref="loginFormRef" v-if="regOrLogin">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item >
         <div class="checkbox">
           <el-checkbox class="check">记住密码</el-checkbox>
           <span @click="regOrLogin = false">未有账号？请先注册</span>
         </div>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="info" @click="login">重置</el-button>
          <el-button type="warning" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
      <el-form class="login-form" :model="regForm" :rules="FormRules" ref="regFormRef" v-else>
        <el-form-item prop="username">
          <el-input v-model="regForm.username" placeholder="注册账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="regForm.password" placeholder="注册密码"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="reg">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      regOrLogin: true,
      defaultUrl: 'https://img1.baidu.com/it/u=1926213814,3713632384&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200',
      regForm: {
        username: 'admin',
        password: 'admin'
      },
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      FormRules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' },{min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur'}],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },{min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur'}]
      }
    }
  },
  methods: {
     reg() {
      this.$refs.regFormRef.validate(async (valid) => {
        if(!valid) return
        const user_info = {
          username: this.regForm.username,
          password: this.regForm.password,
          avatar:this.defaultUrl,
          create_name: this.regForm.username,
          create_time: this.dateFormat(),
          gender: 1,
          is_delete: 0,
          modified_name: this.regForm.username,
          modified_time: this.dateFormat()
        }
        const {data: res} = await this.$http.post('/users/reg', user_info)
        if(res.status !== 200) {
          this.$message.error(res.message)
        }else {
          this.$message.success(res.message)
          this.loginForm.username = this.regForm.username
          this.loginForm.password = this.regForm.password
          this.$refs.regFormRef.resetFields()
          this.regOrLogin = true
        }
      })
     },
     login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if(!valid) return
        const {data: res} = await this.$http.post(`/users/login`, this.loginForm);
        if(res.status !== 200) {
          this.$message.error(res.message)
        }else {
          this.$router.push({path: '/home'})
          window.sessionStorage.setItem('token', res.token)
        }
      })
    },
    dateFormat() {
      const date = new Date()
      const y = date.getFullYear()
      const m = (date.getMonth() + 1 + '').padStart(2, '0')
      const d = (date.getDate() + '').padStart(2, '0')

      const hh = (date.getHours() + '').padStart(2, '0')
      const mm = (date.getMinutes() + '').padStart(2, '0')
      const ss = (date.getSeconds() + '').padStart(2, '0')
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    },
    getAvatar() {
    //  输入账号后获得用户的头像
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  background: url("https://img2.baidu.com/it/u=1995303536,3492217381&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500");
  background-size: 100%;
}
.login-box {
  width: 400px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(238, 238, 238, 0.18);
  border-radius: 10px;
  .avatar-box {
    height: 130px;
    width: 130px;
    position: absolute;
    border-radius: 50%;
    border: 2px solid #eee;
    left: 50%;
    transform: translate(-50%, -70%);
    z-index: 99;
    img {
      width: 130px;
      height: 130px;
      border-radius: 50%;

    }
  }
  .login-form {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 0 50px;
    box-sizing: border-box;
    .btn {
      display: flex;
      justify-content: flex-end;
    }
  }
}
.checkbox  {
  width: 300px;
  display: flex;
  justify-content: space-between;
  color: black;
  .check {
    color: black;
  }
  span:hover {
    cursor: pointer;
  }
}
</style>
