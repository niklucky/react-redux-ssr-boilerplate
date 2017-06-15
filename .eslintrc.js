module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "mocha": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaFeatures": {
        "jsx": true,
    }
  },
  "rules": {
    "react/no-multi-comp": 0,
    "import/default": 0,
    "import/no-duplicates": 0,
    "import/named": 0,
    "import/namespace": 0,
    "import/no-unresolved": 0,
    "import/no-named-as-default": 0,
    "comma-dangle": 0,  // not sure why airbnb turned this on. gross!
    "indent": [2, 2, {"SwitchCase": 1}],
    "no-console": 0,
    "no-alert": 0,
    "react/jsx-filename-extension": 0,
    "react/forbid-prop-types": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "prefer-template": 0,
    "object-curly-spacing": 0,
    "react/prefer-stateless-function": 0,
    "react/style-prop-object": 0,
    "no-restricted-syntax": 0,
    "object-shorthand": 0,
    "no-underscore-dangle": 0,
    "global-require": 0,
    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0,
    "linebreak-style": 0
  },
  "plugins": [
    "react", "import"
  ],
  "parser": "babel-eslint",
  "settings": {
    "import/parser": "babel-eslint",
    "import/resolve": {
      "moduleDirectory": ["node_modules", "src"]
    }
  },
  "globals": {
    "__DEVELOPMENT__": true,
    "__CLIENT__": true,
    "__SERVER__": true,
    "__DEVTOOLS__": true,
    "socket": true,
    "webpackIsomorphicTools": true
  }
};