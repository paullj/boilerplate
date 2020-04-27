import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import sveltePreprocess from 'svelte-preprocess';
import childProcess from 'child_process';

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        childProcess.spawn('$npm_execpath', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        });
      }
    },
  };
}

export default {
  input: 'src/index.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/dist/index.js',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        production ? 'production' : 'development',
      ),
    }),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      preprocess: sveltePreprocess({
        postcss: true,
      }),
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: (css) => {
        // Can pass false as second argument to omit
        // css source maps
        css.write('public/dist/index.css');
      },
    }),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    typescript(),
    commonjs({
      extensions: ['.js', '.ts'],
    }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
