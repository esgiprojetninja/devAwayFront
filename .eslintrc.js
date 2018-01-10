module.exports = {
    "extends": ["airbnb"],
    "parser": "babel-eslint",
    "rules": {
      "func-names": [0],
      "function-paren-newline": [0, "multiline"],
      "import/extensions": [0, "never", { "js": "always", "json": "never", "jsx": "always" }],
      "import/prefer-default-export": [1, "always"],
      "react/jsx-filename-extension": [1, { "extensions": ["js", "jsx"] }],
      "react/jsx-indent": [2, 4],
      "react/jsx-indent-props": [2, 4],
      "react/prefer-stateless-function": 0,
      "indent": ["error", 4],
      "quotes": [2, "double", "avoid-escape"],
      "import/no-extreaneous-dependencies": 0,
      "comma-dangle": [2, "never"],
      "arrow-body-style": [0, "never"]
    }
};
