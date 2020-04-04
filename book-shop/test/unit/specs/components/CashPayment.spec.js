import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import router from '@/router';
import store from '@/store';
import normalizer from '@/utils/normalizer';
import CashPayment from '@/components/CashPayment';
import { createStoreMocks } from '../../__mocks__';

jest.mock('@/store', () => ({
  dispatch: jest.fn(),
}));
jest.mock('@/utils/normalizer', () => ({
  THBCurrency: jest.fn(),
}));

const localVue = createLocalVue();

localVue.use(Vuex);

describe('CashPayment.vue', () => {
  let wrapper;
  let mockStore;
  let $dialog;

  beforeEach(() => {
    jest.clearAllMocks();
    router.push = jest.fn();
    mockStore = createStoreMocks().store;
    $dialog = { alert: jest.fn(() => Promise.resolve()) };
    wrapper = shallowMount(CashPayment, { store: mockStore, localVue, mocks: { $dialog } });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe('Created', () => {
    it('should mount with initialize data', () => {
      expect(wrapper.vm.txtInput).toBe(undefined);
      expect(wrapper.vm.isCartEmpty).toBe(false);
    });
  });

  describe('Methods', () => {
    describe('onClickHundredUp()', () => {
      it('should', async () => {
        wrapper.vm.onClickHundredUp(555);
        expect(wrapper.vm.txtInput).toBe(600);
      });
    });

    describe('onClickExact()', () => {
      it('should', async () => {
        wrapper.vm.onClickExact();
        expect(wrapper.vm.txtInput).toBe(400);
      });
    });

    describe('onPayNow()', () => {
      it('should process payment successfully and calculate correct change', async () => {
        const txtInput = 1092;
        wrapper.setData({ txtInput });
        await wrapper.vm.onPayNow();

        expect($dialog.alert).toHaveBeenCalledWith(
          expect.stringContaining('Sale Complete'),
          expect.objectContaining({
            html: true,
            okText: expect.any(String),
          }));
        expect(store.dispatch).toHaveBeenCalledWith('carts/updateChange', 692);
        expect(store.dispatch).toHaveBeenCalledWith('carts/updateCash', txtInput);
        expect(router.push).toHaveBeenCalledWith({ name: 'ThankYouView' });
      });
      it('should block payment when receive less than total', async () => {
        const txtInput = 92;
        wrapper.setData({ txtInput });
        await wrapper.vm.onPayNow();

        expect($dialog.alert).toHaveBeenCalledWith(
          expect.stringContaining('Amount not enough'),
          expect.objectContaining({
            html: true,
            okText: expect.any(String),
          }));
        expect(store.dispatch).not.toHaveBeenCalled();
        expect(router.push).not.toHaveBeenCalled();
      });
      it('should process payment successfully with no change', async () => {
        const txtInput = 400;
        wrapper.setData({ txtInput });
        await wrapper.vm.onPayNow();

        expect($dialog.alert).toHaveBeenCalledWith(
          expect.stringContaining('Sale Complete'),
          expect.objectContaining({
            html: true,
            okText: expect.any(String),
          }));
        expect(store.dispatch).toHaveBeenCalledWith('carts/updateChange', 0);
        expect(store.dispatch).toHaveBeenCalledWith('carts/updateCash', 400);
        expect(router.push).toHaveBeenCalledWith({ name: 'ThankYouView' });
      });
    });

    describe('roundUp', () => {
      it('should be able to handle invalid param', () => {
        const result = wrapper.vm.roundUp();
        expect(result).toBe(-1);
      });
    });

    describe('calculateChange', () => {
      it('should return 0 when not input any amount', () => {
        wrapper.vm.calculateChange();
        expect(normalizer.THBCurrency).toHaveBeenCalledWith(0);
      });

      it('should return 0 when input amount less that total', () => {
        const txtInput = 10;
        wrapper.setData({ txtInput });
        wrapper.vm.calculateChange();
        expect(normalizer.THBCurrency).toHaveBeenCalledWith(0);
      });

      it('should return correct change from given amount', () => {
        const txtInput = 571;
        wrapper.setData({ txtInput });
        wrapper.vm.calculateChange();
        expect(normalizer.THBCurrency).toHaveBeenCalledWith(171);
      });
    });
  });
});
