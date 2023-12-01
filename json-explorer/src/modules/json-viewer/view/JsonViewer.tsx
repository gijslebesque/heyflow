import { useEffect, useState } from 'react';
import { getJsonPresenter } from '../infrastructure/di-container';
import './JsonViewer.scss';

interface JSONViewerProps {
    data: {
        [key: string]: any;
    };
}

export const JSONViewer: React.FC<JSONViewerProps> = ({ data }) => {
    const [currentPath, setCurrentPath] = useState<string>('');
    const [pathValue, setPathValue] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');

    const view = {
        handleValueOfPath: (value: string) => {
            setPathValue(value);
        },
        handleInputChange: (value: string) => {
            setInputValue(value);
        },
        handlePropertyClick: (path: string) => {
            setCurrentPath(path);
            setInputValue(path);
        },
    };

    const presenter = getJsonPresenter(view, data);

    const handlePropertyClickListener = (path: string) => {
        presenter.handlePropertyClick(path);
    };

    useEffect(() => {
        presenter.handleValueOfPath(currentPath);
    }, [currentPath]);

    useEffect(() => {
        presenter.handleValueOfPath(inputValue);
    }, [inputValue]);

    const changeListener = (e: React.ChangeEvent<HTMLInputElement>) => {
        presenter.handleInputChange(e.target.value);
    };

    const renderObject = (
        obj: {
            [key: string]: any;
        },
        path: string = '',
    ) => {
        return (
            <ul className="json-view">
                {Object.keys(obj).map((key, index) => {
                    //TODO: all this logic should be moved to a util class
                    //so we can test it
                    const newPath = path ? `${path}.${key}` : key;
                    const value = `${obj[key]},`;

                    const isInt = Number.isInteger(parseInt(key));

                    const showRecursive = typeof obj[key] === 'object';

                    const isArr = Array.isArray(obj[key]);

                    const className = showRecursive ? 'json-object' : 'json-property';

                    return (
                        <li key={index}>
                            {isInt && '{'}
                            <span className={`${className}`} onClick={() => handlePropertyClickListener(newPath)}>
                                {!isInt && `${key}: `}
                            </span>
                            {isArr && '['}
                            {showRecursive && renderObject(obj[key], newPath)}
                            {!showRecursive && value}
                            {isInt && '},'}
                            {isArr && '],'}
                        </li>
                    );
                })}{' '}
            </ul>
        );
    };

    return (
        <div>
            <div className="input-wrapper">
                <label htmlFor="property">Property</label>
                <input name="property" type="text" onChange={changeListener} value={inputValue} />
                <p>Value: {pathValue}</p>
            </div>
            <p>Response</p>
            <div className="json-view-container">{renderObject(data)}</div>
        </div>
    );
};
