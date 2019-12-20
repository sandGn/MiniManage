# 用户后台项目说明

### 启动项目
```
yarn serve
```

### 打包项目
```
yarn build
```

#### 环境

- node
- yarn
- webpack
- @vue/cli ~3

#### 插件

- @vue/cli-service
- @vue/cli-plugin-babel
- @vue/cli-plugin-eslint
- @vue/cli-plugin-router
- @vue/cli-plugin-vuex

#### 依赖

##### 	运行依赖

- ant-design-vue

##### 	开发依赖

- babel-plugin-import
- less
- less-loader

### 目录结构

```bash
┌──
├── dist                       # 构建打包目录
├── mock                       # 项目mock 模拟数据
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # vue 入口模板
├── src                        # 源代码
│   ├── api                    # Ajax api请求
│   ├── assets                 # 主题 字体等本地静态资源
│   ├── components             # 全局公用组件
│   ├── config                 # 项目基础配置，包含路由，全局设置
│   ├── layouts                # 通用布局
│   ├── router                 # 路由 Vue-Router
│   ├── store                  # 全局 store管理 Vuex
│   ├── utils                  # 全局公用方法 
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   ├── permission.js          # 路由守卫(路由权限控制管理)
├── eslintrc.js                # eslint 配置项
├── .gitignore                 # git忽略文件
├── babel.config.js            # babel 配置项
├── package.json               # package.json
├── README.md                  # 项目说明文件
├── vue.config.js              # vue-cli 配置
└── yarn.lock				   # yarn 管理文件
```

