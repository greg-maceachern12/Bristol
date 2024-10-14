module.exports = function (migration) {
  const film = migration.createContentType('film')
  film
    .name('Film')
    .description('Bristol Pics Portfolio Film')
  film
    .createField('title')
    .name('Title')
    .type('Symbol')
    .required(true)
  film
    .createField('description')
    .name('Description')
    .type('Text')
  film
    .createField('video_id')
    .name('Vimeo Video ID')
    .type('Symbol')
    .required(true)
}
