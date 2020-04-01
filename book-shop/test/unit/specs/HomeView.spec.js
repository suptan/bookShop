import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import HomeView from '@/views/Home';
import normalizer from '@/utils/normalizer';
import { createStoreMocks } from '../__mocks__';
import { mockBooks } from '../__mocks__/products';

jest.mock('@/utils/normalizer', () => ({
  THBCurrency: jest.fn(),
}));
jest.mock('@/store');
const localVue = createLocalVue();

localVue.use(Vuex);

describe('Home.vue', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = createStoreMocks().store;
  });

  afterEach(() => {
    wrapper.destroy();
  });
  it('should render correct contents', () => {
    wrapper = shallowMount(HomeView, { store, localVue });

    // const headers = wrapper.findAll('[data-qe="book-title"]');
    // expect(headers.length).toBe(mockBooks.length);
    // for (let i = 0; i < mockBooks.length; i += 1) {
    //   expect(headers.at(i).text()).toBe(mockBooks[i].title);
    // }
    const results = wrapper.vm.books;
    expect(results).toBe(mockBooks);
  });
  describe('Methods', () => {
    describe('countItems', () => {
      it('should return amount of items in cart', () => {
        wrapper = shallowMount(HomeView, { store, localVue });
        const result = wrapper.vm.countItems();
        expect(result).toEqual(6);
      });
    });
    describe('normalizeCurrency', () => {
      it('should call to normalizer.THBCurrency', () => {
        wrapper = shallowMount(HomeView, { store, localVue });
        wrapper.vm.normalizeCurrency(0);

        expect(normalizer.THBCurrency).toHaveBeenCalledWith(0);
      });
    });
  });
});
