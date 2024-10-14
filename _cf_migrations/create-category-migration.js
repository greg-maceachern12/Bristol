module.exports = function (migration) {
  const category = migration.createContentType('category')
  category
    .name('Category')
    .description('Film Category')
  category
    .createField('name')
    .name('Name')
    .type('Symbol')
    .required(true)
}
