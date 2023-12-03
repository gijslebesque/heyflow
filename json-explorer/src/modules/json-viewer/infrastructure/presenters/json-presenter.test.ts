import { JsonPresenter, JsonView } from './json-presenter';


describe('JsonPresenter', () => {
    let presenter: JsonPresenter<any>;
    let viewMock: JsonView;

    beforeEach(() => {
        viewMock = {
            handleValueOfPath: jest.fn(),
            handleInputChange: jest.fn(),
            handlePropertyClick: jest.fn(),
        };

        const dataMock = {
            fields: [
                {
                    id: 'some value',
                },
            ],
        };

        presenter = new JsonPresenter(viewMock, dataMock);
    });

    it('should handle value of path correctly', () => {
        const path = 'fields.0.id';
        const value = 'some value';

        presenter.handleValueOfPath(path);

        expect(viewMock.handleValueOfPath).toHaveBeenCalledWith(value);
    });

    it('should handle input change correctly', () => {
        const value = 'some value';

        presenter.handleInputChange(value);

        expect(viewMock.handleInputChange).toHaveBeenCalledWith(value);
    });

    it('should handle property click correctly', () => {
        const path = 'some.path';

        presenter.handlePropertyClick(path);

        expect(viewMock.handlePropertyClick).toHaveBeenCalledWith(path);
    });

    it('should calculate view data correctly', () => {
        const obj = {
            key1: 'value1',
            key2: {
                nestedKey: 'nestedValue',
            },
            key3: [1, 2, 3],
        };
        const path = '';
        const key = 'key1';

        const expectedViewData = {
            newPath: 'key1',
            value: 'value1,',
            isInt: false,
            showNested: false,
            isArr: false,
            className: 'json-property',
        };

        const viewData = presenter.calcJsonViewProperties({ obj, path, key });

        expect(viewData).toEqual(expectedViewData);
    });
});
