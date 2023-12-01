import * as _ from 'lodash';

export interface JsonView {
    handleValueOfPath(value: string): void;
    handleInputChange(value: string): void;
    handlePropertyClick(value: string): void;
}


export class JsonPresenter<T> {
    constructor
        (
            private readonly view: JsonView,
            private readonly data: T
        ) { }

    public handleValueOfPath(path: string): void {
        const value = this.calcValueOfPath(path);
        this.view.handleValueOfPath(value);
    }

    public handleInputChange(value: string): void {
        this.view.handleInputChange(value);
    }

    public handlePropertyClick(path: string): void {
        this.view.handlePropertyClick(path);
    }


    private calcValueOfPath(path: string): string {
        const value = _.get(this.data, path);
        if (value === undefined) {
            return '';
        }

        if (_.isObject(value)) {
            return '';
        }

        return value.toString();
    }

}
