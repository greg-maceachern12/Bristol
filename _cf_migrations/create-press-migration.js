module.exports = function (migration) {
  const press = migration.createContentType('press')
  press
    .name('Press')
    .description('Press Quotes')
  press
    .createField('source')
    .name('Source')
    .type('Symbol')
    .required(true)
  press
    .createField('quote')
    .name('Quote')
    .type('Symbol')
    .required(true)
}
