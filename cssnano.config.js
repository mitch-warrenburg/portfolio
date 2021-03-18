const defaultPreset = require('cssnano-preset-advanced');

module.exports = defaultPreset({
  calc: false,
  zindex: false,
  mergeIndents: false,
  reduceIndents: false,
  discardUnused: false,
  cssDeclarationSorter: false,
  discardComments: {
    removeAll: true,
  },
});
