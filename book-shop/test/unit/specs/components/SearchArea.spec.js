import { shallowMount } from '@vue/test-utils';
import SearchArea from '@/components/SearchArea';
import store from '@/store';

jest.mock('@/store', () => ({
  dispatch: jest.fn(),
}));

describe('SearchArea.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SearchArea);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe('Methods', () => {
    describe('onEnter', () => {
      it('should call to action products/filterBooks when called', () => {
        const input = 'foo';
        wrapper.setData({ searchTxtInput: input });
        wrapper.vm.onEnter();
        expect(store.dispatch).toHaveBeenCalledWith('products/filterBooks', input);
      });
    });
  });
});
