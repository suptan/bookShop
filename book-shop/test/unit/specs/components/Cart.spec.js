import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Cart from '@/components/Cart';
import router from '@/router';
import normalizer from '@/utils/normalizer';
import { createStoreMocks } from '../../__mocks__';
import { mockCarts, mockItem, mockCartsState } from '../../__mocks__/carts';

jest.mock('vuejs-dialog');
jest.mock('@/utils/normalizer', () => ({
  THBCurrency: jest.fn(),
}));
const localVue = createLocalVue();

localVue.use(Vuex);

describe('Cart.vue', () => {
  let wrapper;
  let store;
  let $dialog;

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

        expect(mockCartsState.actions.decreaseBookInCart)
          .toHaveBeenCalledWith(expect.any(Object), input);
      });
    });
    describe('onClickIncrease', () => {
      it('should dispatch to carts/increaseBookInCart action', () => {
        const input = 1;
        wrapper = shallowMount(Cart, { store, localVue });
        wrapper.vm.onClickIncrease(input);

        expect(mockCartsState.actions.increaseBookInCart)
          .toHaveBeenCalledWith(expect.any(Object), input);
      });
    });
    describe('normalizeCurrency', () => {
      it('should call to normalizer.THBCurrency', () => {
        wrapper = shallowMount(Cart, { store, localVue });
        wrapper.vm.normalizeCurrency(0);

        expect(normalizer.THBCurrency).toHaveBeenCalledWith(0);
      });
    });
    describe('onClickRemove', () => {
      afterEach(() => {
        mockCartsState.actions.removeBookFromCart.mockClear();
      });

      it('should dispatch to carts/removeBookFromCart action', async () => {
        const input = 1;
        $dialog = { confirm: jest.fn(() => Promise.resolve()) };
        wrapper = shallowMount(Cart, { store, localVue, mocks: { $dialog } });
        await wrapper.vm.onClickRemove(input);

        expect(mockCartsState.actions.removeBookFromCart)
          .toHaveBeenCalledWith(expect.any(Object), input);
      });

      it('should not dispatch to carts/removeBookFromCart action', async () => {
        $dialog = { confirm: jest.fn(() => Promise.reject()) };
        wrapper = shallowMount(Cart, { store, localVue, mocks: { $dialog } });

        try {
          await wrapper.vm.onClickRemove();
        } catch (_) {
          expect(mockCartsState.actions.removeBookFromCart).not.toHaveBeenCalled();
        }
      });
    });

    describe('onClickRemoveAll()', () => {
      it('should dispatch to carts/clearCart action', async () => {
        $dialog = { confirm: jest.fn(() => Promise.resolve()) };
        wrapper = shallowMount(Cart, { store, localVue, mocks: { $dialog } });
        await wrapper.vm.onClickRemoveAll();
        expect(mockCartsState.actions.clearCart).toHaveBeenCalled();
        mockCartsState.actions.clearCart.mockClear();
      });
    });
  });
});
