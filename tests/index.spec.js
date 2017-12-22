import chai, { expect } from 'chai';
import SpotifyWrapper from '../src/index';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);
chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('SpotifyWrapper Library', () => {
  it('should create and instance of SpotifyWrapper', () => {
    let spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceOf(SpotifyWrapper);
  });

  it('should recive apiURL as an option', () => {
    let spotify = new SpotifyWrapper({
      apiURL: 'TEST.COM'
    });
    expect(spotify.apiURL).to.be.equal('TEST.COM');
  });

  it('should use the default apiURL if not provide', () => {
    let spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should recive toke as an option', () => {
    let spotify = new SpotifyWrapper({
      token: 'foo'
    });
    expect(spotify.token).to.be.equal('foo');
  });

  describe('request method', () => {
    let stubedFetch;
    let promise;
    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });

    afterEach(() => {
      stubedFetch.restore();
    });

    it('should have request method', () => {
      let spotify = new SpotifyWrapper({});
      expect(spotify.request).to.exist;
    });

    it('should call fetch when request', () => {
      let spotify = new SpotifyWrapper({
        token: 'foo'
      });

      spotify.request('url');
      expect(stubedFetch).to.have.calledOnce;
    });

    it('should call fetch with right url passed', () => {
      let spotify = new SpotifyWrapper({ token: 'foo' });
      const headers = { headers: { Authorization: "'Bearer foo'" } };

      spotify.request('url');
      expect(stubedFetch).to.have.calledWith('url', headers);
    });
  });
});
