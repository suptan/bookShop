import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import router from '@/router';
import store from '@/store';
import CashPayment from '@/components/CashPayment';
import { createStoreMocks } from '../../__mocks__';


jest.mock('@/store', () => ({
  dispatch: jest.fn(),
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
        await wrapper.vm.onClickHundredUp(555);

        expect($dialog.alert).toHaveBeenCalledWith(
          expect.stringContaining('Sale Complete'),
          expect.objectContaining({
            html: true,
            okText: expect.any(String),
          }));
        expect(store.dispatch).toHaveBeenCalledWith('carts/updateChange', 200);
        expect(store.dispatch).toHaveBeenCalledWith('carts/updateCash', 600);
        expect(router.push).toHaveBeenCalledWith({ name: 'ThankYouView' });
      });
    });

    describe('onClickExact()', () => {
      it('should', async () => {
        await wrapper.vm.onClickExact();

        expect($dialog.alert).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            html: true,
            okText: expect.any(String),
          }));
        expect(store.dispatch).toHaveBeenCalledWith('carts/updateChange', 0);
        expect(store.dispatch).toHaveBeenCalledWith('carts/updateCash', 400);
        expect(router.push).toHaveBeenCalledWith({ name: 'ThankYouView' });
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
          expect.stringContaining('Please fill in the correct amount'),
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
  });
});
