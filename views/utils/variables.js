import { breakpoint, breakpointsObj as bp } from './breakpoints';

export const MAX_CONTENT_WIDTH = '49rem';
export const targetedLoading = {
  textAlign: 'center',
  [breakpoint(bp.XX_SMALL)]: {
    paddingLeft: '6rem',
    marginTop: '2rem',
    textAlign: 'left',
  },
};
