import { AppPresenter } from './app-presenter';
import demoData from '../api/demo-data.json';
describe('AppPresenter', () => {
  let presenter: AppPresenter;
  let networkServiceMock: any;
  let viewMock: any;

  beforeEach(() => {
    networkServiceMock = {
      get: jest.fn().mockResolvedValue(demoData),
    };
    viewMock = {
      toggleLoading: jest.fn(),
      onDataReady: jest.fn(),
    };
    presenter = new AppPresenter(networkServiceMock, viewMock);
  });

  it('should toggle loading and call onDataReady with the fetched data', async () => {
    await presenter.init();

    expect(viewMock.toggleLoading).toHaveBeenCalledWith(true);
    expect(networkServiceMock.get).toHaveBeenCalledWith('');
    expect(viewMock.toggleLoading).toHaveBeenCalledWith(false);
    expect(viewMock.onDataReady).toHaveBeenCalledWith(demoData);
  });
});
