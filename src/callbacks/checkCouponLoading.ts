import { betslipBodyLoaderSelector } from '../selectors';

const checkCouponLoading = (): boolean => {
  const betslipBodyLoader = document.querySelector(betslipBodyLoaderSelector);
  return Boolean(betslipBodyLoader);
};

export default checkCouponLoading;
