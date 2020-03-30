import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VuejsDialog from 'vuejs-dialog';
import Cart from '@/components/Cart';
import router from '@/router';
import normalizer from '@/utils/normalizer';
import { createStoreMocks } from '../../__mocks__';
import { mockCarts, mockItem, mockCartsState } from '../../__mocks__/carts';

jest.mock('vuejs-dialog');
jest.mock('@/utils/normalizer', () => ({
  THBCurrency: jest.fn(),
}));
jest.mock('@/store');
const localVue = createLocalVue();

localVue.use(Vuex);

describe('Cart.vue', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = createStoreMocks().store;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe('Computed', () => {
    it('should render with cart items from store', () => {
      wrapper = shallowMount(Cart, { store, localVue });
      const resultCart = wrapper.vm.cart;
      const resultItem = wrapper.vm.item;

      expect(resultCart).toEqual(mockCarts);
      expect(resultItem).toEqual(mockItem);
    });
  });
  describe('Methods', () => {
    describe('navigate', () => {
      beforeEach(() => {
        router.push = jest.fn();
      });
      it('should be call when click process payment', () => {
        wrapper = shallowMount(Cart, { store, localVue });
        wrapper.vm.navigate(100);
        expect(router.push).toHaveBeenCalledWith({ name: 'PaymentView' });
      });
      it('should not be call when click process payment when cart empty', () => {
        wrapper = shallowMount(Cart, { store, localVue });
        wrapper.vm.navigate(0);
        expect(router.push).not.toHaveBeenCalled();
      });
    });
    describe('onClickDecrease', () => {
      it('should dispatch to carts/decreaseBookInCart action', () => {
        const input = 1;
        wrapper = shallowMount(Cart, { store, localVue });
        wrapper.vm.onClickDecrease(input);

        expect(mockCartsState.actions.decreaseBookInCart).toHaveBeenCalledWith(expect.any(Object), input);
      });
    });
    describe('onClickIncrease', () => {
      it('should dispatch to carts/increaseBookInCart action', () => {
        const input = 1;
        wrapper = shallowMount(Cart, { store, localVue });
        wrapper.vm.onClickIncrease(input);

        expect(mockCartsState.actions.increaseBookInCart).toHaveBeenCalledWith(expect.any(Object), input);
      });
    });
    describe('normalizeCurrency', () => {
      it('should call to normalizer.THBCurrency', () => {
        wrapper = shallowMount(Cart, { store, localVue });
        wrapper.vm.normalizeCurrency(0);

        expect(normalizer.THBCurrency).toHaveBeenCalledWith(0);
      });
    });
    // TODO, refactor application initialize to inject mock dialog
    describe.skip('onClickRemove', () => {
      it('should dispatch to carts/removeBookFromCart action', () => {
        const input = 1;
        VuejsDialog.confirm = jest.fn(() => Promise.resolve());
        wrapper = shallowMount(Cart, { store, localVue });
        wrapper.vm.onClickRemove(input);

        expect(mockCartsState.actions.removeBookFromCart).toHaveBeenCalledWith(expect.any(Object), input);
      });
      it('should not dispatch to carts/removeBookFromCart action', () => {
        const input = 1;
        VuejsDialog.confirm = jest.fn(async () => Promise.reject());
        wrapper = shallowMount(Cart, { store, localVue });
        wrapper.vm.onClickRemove(input);

        expect(mockCartsState.actions.removeBookFromCart).not.toHaveBeenCalled();
      });
    });
    describe.skip('onClickRemoveAll', () => { });
  });
});
