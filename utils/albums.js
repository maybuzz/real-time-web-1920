const albums = []

function newAlbum(id, title, cover) {
  const album = { id, title, cover }

  albums.push(album)

  return album
}

module.exports = newAlbum
