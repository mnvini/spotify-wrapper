import chai, { expect } from 'chai';
import {
  search,
  searchAlbums,
  searchArtists,
  searchTrack,
  searchPlaylist
} from '../src/search';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Search', () => {
  let fetchedStub;
  let promise;
  let testObject;
  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });
  afterEach(() => {
    fetchedStub.restore();
    testObject = {};
  });

  describe('smoke tests', () => {
    //search(generic) + 1 type
    //searchAlbums
    //searchArtists
    //searchTrack
    //searchPlaylist

    it('should existis the search method', () => {
      expect(search).to.exist;
    });

    it('should existis the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should existis the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should existis the searchTrack method', () => {
      expect(searchTrack).to.exist;
    });

    it('should existis the searchPlaylist method', () => {
      expect(searchPlaylist).to.exist;
    });
  });

  describe('Generic Search', () => {
    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artist');
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist'
        );
        const Albuns = search('Incubus', 'album');
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist'
        );
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist,album'
        );
      });
    });

    it.skip('should return the JSON Data from the Promise', () => {
      promise.resolves({ body: 'json' });

      const artists = search('Incubus', 'artist', testObject);

      expect(testObject.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('Search Artist', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Muse');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=artist'
      );
    });
  });

  describe('Search Albums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch searchAlbums the correct URL', () => {
      const albums = searchAlbums('Resistance');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Resistance&type=album'
      );
    });
  });

  describe('Search Tracks', () => {
    it('should call fetch function', () => {
      const track = searchTrack('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch searchAlbums the correct URL', () => {
      const track = searchTrack('Resistance');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Resistance&type=track'
      );
    });
  });

  describe('Search Playlist', () => {
    it('should call fetch function', () => {
      const playlist = searchPlaylist('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch searchAlbums the correct URL', () => {
      const playlist = searchPlaylist('Resistance');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Resistance&type=playlist'
      );
    });
  });
});
