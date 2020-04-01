import { getRequest } from '@/utils/httpHelper';

describe('httpHelper', () => {
  describe('getRequest()', () => {
    it('should return response as success json', async () => {
      const mockSuccessResponse = { foo: 'bar' };
      const mockJsonPromise = Promise.resolve(mockSuccessResponse);
      const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
        ok: true,
      });
      global.fetch = jest.fn(() => mockFetchPromise);

      const input = 'url';
      const result = await getRequest(input);

      expect(result).toBe(mockSuccessResponse);

      global.fetch.mockClear();
    });

    it('should return response json with error status', async () => {
      const mockStatus = { status: '422' };
      const mockFetchPromise = Promise.resolve({
        ...mockStatus,
        ok: false,
      });
      global.fetch = jest.fn(() => mockFetchPromise);

      try {
        const input = 'url';
        await getRequest(input);
      } catch (error) {
        expect(error).toEqual(mockStatus);
      }

      global.fetch.mockClear();
    });


    it('should return error when network error', async () => {
      const mockErrorMsg = 'my error';
      const mockFetchPromise = Promise.reject({
        message: mockErrorMsg,
      });
      global.fetch = jest.fn(() => mockFetchPromise);


      const input = 'urlll';
      try {
        await getRequest(input);
      } catch (error) {
        expect(error.message).toEqual(`GET ${input} ${mockErrorMsg}`);
      }

      global.fetch.mockClear();
    });
  });
});
