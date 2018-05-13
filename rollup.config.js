import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import { minify } from 'uglify-es'

const name = 'Renderer'
const path = 'dist/react-animated-term'
const globals = {
  'react-dom': 'ReactDOM',
  react: 'React',
  'prop-types': 'PropTypes'
}
const external = Object.keys(globals)
const babelOptions = (prod) =>  {
  let options = {
    babelrc: false,
    presets: [['env', { modules: false }], 'react'],
    plugins: ['external-helpers']
  }

  if (prod) {
    options.plugins.push('transform-react-remove-prop-types')
  }
  return options
}

export default [
  {
    input: 'src/index.js',
    output: {
      file: path + '.es.js',
      format: 'es'
    },
    external: external,
    plugins: [babel(babelOptions(false)), resolve()]
  },
  {
    input: 'src/index.js',
    output: {
      name: name,
      file: path + '.js',
      format: 'umd',
      globals: globals
    },
    external: external,
    plugins: [babel(babelOptions(false)), resolve()]
  },
  {
    input: 'src/index.js',
    output: {
      name: name,
      file: path + '.min.js',
      format: 'umd',
      globals: globals
    },
    external: external,
    plugins: [babel(babelOptions(true)), resolve(), uglify({}, minify)]
  }
]
