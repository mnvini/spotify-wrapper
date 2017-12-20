'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlbums = exports.getAlbumTracks = exports.getAlbum = undefined;

var _config = require('./config');

var _utils = require('./utils');

/**global fetch */
var getAlbum = exports.getAlbum = function getAlbum(id) {
  fetch(API_URL + '/albums/' + id, HEADERS).then(_utils.toJSON);
};

var getAlbumTracks = exports.getAlbumTracks = function getAlbumTracks(id) {
  fetch(API_URL + '/albums/' + id + '/tracks', HEADERS).then(_utils.toJSON);
};

var getAlbums = exports.getAlbums = function getAlbums(ids) {
  fetch(API_URL + '/albums/ids=' + ids, HEADERS).then(_utils.toJSON);
};