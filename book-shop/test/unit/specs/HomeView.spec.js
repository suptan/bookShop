import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import HomeView from '@/views/Home';
import router from '@/router';
import { createStoreMocks, mockBooks } from '../__mocks__';

jest.mock('@/router', () => ({
  push: jest.fn(),
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
    describe('navigate', () => {
      it('should be call when click submit', () => {
        wrapper = shallowMount(HomeView, { store, localVue });
        wrapper.vm.navigate();
        expect(router.push).toHaveBeenCalledWith({ name: 'Page2View' });
      });
    });
  });
});
