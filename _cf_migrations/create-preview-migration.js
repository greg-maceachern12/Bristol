module.exports = function (migration) {
  const preview = migration.createContentType('preview')
  preview
    .name('Preview')
    .description('Bristol Pics Portfolio Preview')
  preview
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(true)
  preview
    .createField('description')
    .name('Description')
    .type('Text')
}
