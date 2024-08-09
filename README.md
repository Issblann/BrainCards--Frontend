# Braincards
BrainCards, a simple way to create box cards for study and memorization.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

Project photos: 
![image](https://github.com/user-attachments/assets/9a8fa00e-68c6-4b61-beab-65f63d292ae4)
![image](https://github.com/user-attachments/assets/b8914ddf-e05f-4044-9366-bb447e462e8b)
![image](https://github.com/user-attachments/assets/64c7f86e-e542-4a8d-8035-6960a002c057)
![image](https://github.com/user-attachments/assets/bef9d785-806c-4827-a128-4dbcc9b92de8)
![image](https://github.com/user-attachments/assets/a74b66d5-d73a-4a26-88c9-4e4c16a1305b)
