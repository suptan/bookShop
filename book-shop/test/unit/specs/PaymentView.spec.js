import { shallowMount } from '@vue/test-utils';
import PaymentView from '@/views/Payment';
import router from '@/router';

describe('Payment.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PaymentView);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe('Methods', () => {
    describe('navigate()', () => {
      beforeEach(() => {
        router.push = jest.fn();
      });

      it('should go back to HomeView when click', () => {
        wrapper.vm.navigate();
        expect(router.push).toHaveBeenCalledWith({ name: 'HomeView' });
      });
    });
  });
});
