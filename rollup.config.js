import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: "src/main.ts",
  output: {
    file: "dist/main.js",
    format: "cjs",
  },
  plugins: [typescript(), nodeResolve()],
};
