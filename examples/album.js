global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

const spotify = new SpotifyWrapper({
  token:
    'BQDG48YSjt7yQCXCWw8QKHaH3NrObPAqqEL74CV7UxGc6gt50rMAUI2OnG0df3Xnpu9Jc9lhvskO1M5Vn1ShO_RoF88d5dKAgKsLS3usZmV0eB0KWe4KnPb1QPJ_8yEDnqKe7pELC7Ul'
});

const albums = spotify.search.albums('Incubus');
albums.then(data => data.albums.items.map(item => console.log(item.name)));
