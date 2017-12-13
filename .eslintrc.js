module.exports = {
    "extends": ["airbnb"],
    "parser": "babel-eslint",
    "rules": {
      "import/extensions": [0, "never", { "js": "always", "json": "never", "jsx": "always" }],
      "react/jsx-filename-extension": [1, { "extensions": ["js", "jsx"] }],
      "react/jsx-indent": [2, 4],
      "react/jsx-indent-props": [2, 4],
      "indent": ["error", 4],
      "quotes": [2, "double", "avoid-escape"],
      "import/no-extreaneous-dependencies": 0,
      "comma-dangle": [2, "never"]
    }
};
