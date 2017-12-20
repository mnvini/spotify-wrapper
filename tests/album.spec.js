//getAlbum
//getAlbumTracks

import { getAlbum, getAlbumTracks, getAlbums } from '../src/album';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);
chai.use(sinonChai);

global.fetch = require('node-fetch');
describe('Album', () => {
  let stubedFetch;
  let promise;
  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });
  describe('smoke test', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy'
      );
    });

    it.skip('should return the correct data from promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const album = getAlbums();
      expect(stubedFetch).to.have.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      const album = getAlbums([
        '4aawyAB9vmqN3uQ7FjRGTy',
        '4aawyAB9vmqN3uQ7FjRGTz'
      ]);
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTz'
      );
    });

    describe('getAlbumsTracks', () => {
      it('should call fetch method', () => {
        const album = getAlbumTracks();
        expect(stubedFetch).to.have.calledOnce;
      });

      it('should call fetch with correct URL', () => {
        const album = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
        expect(stubedFetch).to.have.been.calledWith(
          'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks'
        );
      });
    });
  });
});
