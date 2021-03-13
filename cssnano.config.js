const defaultPreset = require('cssnano-preset-advanced');

module.exports = defaultPreset({
  calc: true,
  zindex: true,
  mergeIndents: true,
  reduceIndents: true,
  discardUnused: true,
  cssDeclarationSorter: true,
  discardComments: {
    removeAll: true,
  },
});
