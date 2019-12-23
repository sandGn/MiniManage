module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    // 是否允许代码中存在console
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 是否允许代码中存在debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 分号
    'semi': [
      2,
      'never',
      {
        'beforeStatementContinuationChars': 'never'
      }
    ],
    // 引号
    'quotes': [
      2,
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ],
  },
  /* 此项是用来指定javaScript语言类型和风格，
   * [parser] 用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
   * [sourceType] 用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
   */
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  }
}
