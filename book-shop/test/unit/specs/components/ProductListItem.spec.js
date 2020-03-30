import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ProductListItem from '@/components/ProductListItem';
import normalizer from '@/utils/normalizer';
import { createStoreMocks } from '../../__mocks__';
import { mockCartsState } from '../../__mocks__/carts';
import { mockBooks } from '../../__mocks__/products';

jest.mock('@/utils/normalizer', () => ({
  THBCurrency: jest.fn(),
}));
jest.mock('@/store');
const localVue = createLocalVue();

localVue.use(Vuex);

describe('ProductListItem.vue', () => {
  let wrapper;
  let store;
  let propsData;

  beforeEach(() => {
    jest.clearAllMocks();
    propsData = {
      book: mockBooks[0],
    };
    store = createStoreMocks().store;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe('Methods', () => {
    describe('onClick', () => {
      it('should dispatch to carts/addBookToCart action', () => {
        const input = {};
        wrapper = shallowMount(ProductListItem, { store, localVue, propsData });
        wrapper.vm.onClick(input);

        expect(mockCartsState.actions.addBookToCart).toHaveBeenCalledWith(expect.any(Object), input);
      });
    });
    describe('normalizeCurrency', () => {
      it('should call to normalizer.THBCurrency', () => {
        wrapper = shallowMount(ProductListItem, { store, localVue, propsData });
        wrapper.vm.normalizeCurrency(0);

        expect(normalizer.THBCurrency).toHaveBeenCalledWith(0);
      });
    });
  });
});
