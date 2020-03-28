import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import HomeView from '@/views/Home';
import router from '@/router';

jest.mock('@/router', () => ({
  push: jest.fn(),
}));
const localVue = createLocalVue();

localVue.use(Vuex);

describe('Home.vue', () => {
  let wrapper;
  let getters;
  let actions;
  let store;
  let mockBooks;

  beforeEach(() => {
    mockBooks = [{
      cover: 'pic1',
      price: '111',
      title: 'foo',
      id: '330',
    }, {
      cover: 'pic2',
      price: '123',
      title: 'bar',
      id: '431',
    }];
    actions = {
      getBooks: jest.fn(),
    };
    getters = {
      books: () => mockBooks,
    };
    store = new Vuex.Store({
      modules: {
        products: {
          namespaced: true,
          actions,
          getters,
        },
      },
    });
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
    describe('naivgate', () => {
      it('should be call when click submit', () => {
        wrapper = shallowMount(HomeView, { store, localVue });
        wrapper.vm.navigate();
        expect(router.push).toHaveBeenCalledWith({ name: 'Page2View' });
      });
    });
  });
});
