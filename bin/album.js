'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlbums = exports.getAlbumTracks = exports.getAlbum = undefined;

var _config = require('./config');

var _utils = require('./utils');

/* global fetch */
var getAlbum = exports.getAlbum = function getAlbum(id) {
  fetch(_config.API_URL + '/albums/' + id, _config.HEADERS).then(_utils.toJSON);
};

var getAlbumTracks = exports.getAlbumTracks = function getAlbumTracks(id) {
  fetch(_config.API_URL + '/albums/' + id + '/tracks', _config.HEADERS).then(_utils.toJSON);
};

var getAlbums = exports.getAlbums = function getAlbums(ids) {
  fetch(_config.API_URL + '/albums/ids=' + ids, _config.HEADERS).then(_utils.toJSON);
};