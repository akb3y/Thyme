module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:node/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
    'prettier/prettier'
  ],
  settings: {
    import/resolver: {
      node: {
        paths: ['src', 'server'],
        extensions: ['.js', '.jsx'],
      }
    }
  },
  rules: {
    no-console: 'off',
    no-restricted-syntax: [
      "error",
      {
        selector: 'CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]',
        message: 'Unexpected property on console object was called'
      }
    ]
  },
};
