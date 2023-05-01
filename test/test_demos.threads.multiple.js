const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const { makeRequest, makeMultipleRequests } = require('./your-multiple-requests-module');

describe('makeMultipleRequests function', () => {
    const responseData = { message: 'Hello, world!' };
    let makeRequestStub;

    beforeEach(() => {
        makeRequestStub = sinon.stub().resolves(responseData);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should make multiple requests using makeRequest function', async () => {
        const requests = [
            { url: 'https://example.com/api/1', data: { foo: 'bar' } },
            { url: 'https://example.com/api/2', data: { baz: 'qux' } },
        ];

        const expectedResponses = [
            { statusCode: 200, body: responseData },
            { statusCode: 200, body: responseData },
        ];

        const actualResponses = await makeMultipleRequests(requests, makeRequestStub);

        expect(makeRequestStub.callCount).to.equal(2);
        expect(makeRequestStub.firstCall).to.have.been.calledWith('https://example.com/api/1', { method: 'POST', body: '{"foo":"bar"}' });
        expect(makeRequestStub.secondCall).to.have.been.calledWith('https://example.com/api/2', { method: 'POST', body: '{"baz":"qux"}' });
        expect(actualResponses).to.deep.equal(expectedResponses);
    });

    it('should return empty array if requests array is empty', async () => {
        const requests = [];
        const expectedResponses = [];

        const actualResponses = await makeMultipleRequests(requests, makeRequestStub);

        expect(makeRequestStub.callCount).to.equal(0);
        expect(actualResponses).to.deep.equal(expectedResponses);
    });

    it('should throw error if makeRequest function throws error', async () => {
        const requests = [
            { url: 'https://example.com/api/1', data: { foo: 'bar' } },
            { url: 'https://example.com/api/2', data: { baz: 'qux' } },
        ];

        const error = new Error('Network error');
        makeRequestStub.rejects(error);

        await expect(makeMultipleRequests(requests, makeRequestStub)).to.be.rejectedWith(error);

        expect(makeRequestStub.callCount).to.equal(1);
        expect(makeRequestStub.firstCall).to.have.been.calledWith('https://example.com/api/1', { method: 'POST', body: '{"foo":"bar"}' });
    });
});
