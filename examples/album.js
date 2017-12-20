global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

const spotify = new SpotifyWrapper({
  token:
    'BQBZFmeadcJ1TV1B2Ma1O_GV16PCTwsGw2opguxAGToik9Er61KbhZzY1gKlL9i6MgpXiIVwMX8H3hqxKHAkGw6-GQElE7DigZyoNMoMTj3d_WJnleqK3xDZnvt7XA9bk_BTQVMLqOWY'
});

const albums = spotify.search.albums('Incubus');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
