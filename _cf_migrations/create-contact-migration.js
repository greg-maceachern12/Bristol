module.exports = function (migration) {
  const contact = migration.createContentType('contact')
  contact
    .name('Contact Page')
    .description('Contact Page Copy')
  contact
    .createField('name')
    .name('Name')
    .type('Symbol')
    .required(true)
  contact
    .createField('street')
    .name('Street')
    .type('Symbol')
    .required(true)
  contact
    .createField('city')
    .name('City / State')
    .type('Symbol')
    .required(true)
  contact
    .createField('email')
    .name('Email')
    .type('Symbol')
    .required(true)
}
