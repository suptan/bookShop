import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ThankYouView from '@/views/ThankYou';
import router from '@/router';
import normalizer from '@/utils/normalizer';
import { createStoreMocks } from '../__mocks__';
import { mockCartsActions } from '../__mocks__/carts';

jest.mock('@/router', () => ({
  push: jest.fn(),
}));
jest.mock('@/utils/normalizer', () => ({
  THBCurrency: jest.fn(),
}));
jest.useFakeTimers();

const localVue = createLocalVue();

localVue.use(Vuex);

describe('ThankYou.vue', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = createStoreMocks().store;
    wrapper = shallowMount(ThankYouView, { store, localVue });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe('Data', () => {
    it('should contain default value', () => {
      expect(ThankYouView.data()).toEqual({
        printDate: expect.any(Date),
        countDown: 5,
      });
    });
  });

  describe('Mounted', () => {
    it('should redirect to HomeView after some time', () => {
      jest.runAllTimers();
      expect(router.push).toHaveBeenCalledWith({ name: 'HomeView' });
      expect(mockCartsActions.clearCart).toHaveBeenCalled();
    });
  });

  describe('Methods', () => {
    describe('countDownTimer()', () => {
      it('should reduce countDown to zero', () => {
        // countDownTimer() had been called when component created
        jest.runAllTimers();
        expect(wrapper.vm.countDown).toBe(0);
      });
    });

    describe('navigateToHome()', () => {
      it('should go back to HomeView when click', () => {
        wrapper.vm.navigateToHome();
        expect(router.push).toHaveBeenCalledWith({ name: 'HomeView' });
        expect(mockCartsActions.clearCart).toHaveBeenCalled();
      });
    });

    describe('normalizeCurrency', () => {
      it('should call to normalizer.THBCurrency', () => {
        wrapper.vm.normalizeCurrency(0);

        expect(normalizer.THBCurrency).toHaveBeenCalledWith(0);
      });
    });
  });
});
