import * as _ from 'lodash';

export interface JsonView {
    handleValueOfPath(value: string): void;
    handleInputChange(value: string): void;
    handlePropertyClick(value: string): void;
}

export interface AnyJson {
    [key: string]: any;
}

export interface JsonProperty {
    value: string;
    isInt: boolean;
    showNested: boolean;
    isArr: boolean;
    className: 'json-object' | 'json-property';
    newPath: string;
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


    public calcJsonViewProperties({
        obj,
        path,
        key,
    }: { obj: AnyJson, path: string, key: string }): JsonProperty {
        const newPath = path ? `${path}.${key}` : key;
        const value = `${obj[key]},`;

        const isInt = Number.isInteger(parseInt(key));
        const showNested = typeof obj[key] === 'object';
        const isArr = Array.isArray(obj[key]);
        const className = showNested ? 'json-object' : 'json-property';

        return {
            newPath: newPath,
            value,
            isInt,
            showNested: showNested,
            isArr,
            className
        };

    }
}
