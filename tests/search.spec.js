import SpotifyWrapper from '../src/index';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);
chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Search', () => {
  let stubedFetch;
  let promise;
  let spotify;
  beforeEach(() => {
    spotify = new SpotifyWrapper({ token: 'foo' });
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });
  afterEach(() => {
    stubedFetch.restore();
  });

  describe('smoke tests', () => {
    //search(generic) + 1 type
    //searchAlbums
    //searchArtists
    //searchTrack
    //searchPlaylist

    it('should existis the spotify.search.albums method', () => {
      expect(spotify.search.albums).to.exist;
    });

    it('should existis the spotify.search.artists method', () => {
      expect(spotify.search.artists).to.exist;
    });

    it('should existis the searchTrack method', () => {
      expect(spotify.search.tracks).to.exist;
    });

    it('should existis the searchPlaylist method', () => {
      expect(spotify.search.playlist).to.exist;
    });
  });

  describe('Search Artist', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.artists('Incubus');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.artists('Muse');
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=artist'
      );
    });
  });

  describe('Search Albums', () => {
    it('should call fetch function', () => {
      const albums = spotify.search.albums('Incubus');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch searchAlbums the correct URL', () => {
      const albums = spotify.search.albums('Resistance');
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Resistance&type=album'
      );
    });
  });

  describe('Search Tracks', () => {
    it('should call fetch function', () => {
      const track = spotify.search.tracks('Incubus');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch searchAlbums the correct URL', () => {
      const track = spotify.search.tracks('Resistance');
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Resistance&type=track'
      );
    });
  });

  describe('Search Playlist', () => {
    it('should call fetch function', () => {
      const playlist = spotify.search.playlist('Incubus');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch searchAlbums the correct URL', () => {
      const playlist = spotify.search.playlist('Resistance');
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Resistance&type=playlist'
      );
    });
  });
});
