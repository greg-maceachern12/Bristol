module.exports = function (migration) {
  const about = migration.createContentType('about')
  about
    .name('About Page')
    .description('About Page Copy')
  about
    .createField('name')
    .name('Name')
    .type('Symbol')
    .required(true)
  about
    .createField('description')
    .name('Description')
    .type('Text')
    .required(true)
}
