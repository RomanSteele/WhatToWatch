import {render, screen} from '@testing-library/react';
import Spinner from './spinner';


describe('Component: Spinner', () => {

  it('should render spinner', async () => {

    render(
        <Spinner loading={true} />
    )

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
