import { useEffect, useState } from 'react';
import { getJsonPresenter } from '../infrastructure/di-container';
import './JsonViewer.scss';
import { AnyJson, JsonPresenter, JsonView } from '../infrastructure/presenters/json-presenter';

interface JSONViewerProps {
    data: AnyJson;
}


export const JSONViewer: React.FC<JSONViewerProps> = ({ data }) => {
    const [currentPath, setCurrentPath] = useState<string>('');
    const [pathValue, setPathValue] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');

    const view: JsonView = {
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

    useEffect(() => {
        presenter.handleValueOfPath(currentPath);
    }, [currentPath]);

    useEffect(() => {
        presenter.handleValueOfPath(inputValue);
    }, [inputValue]);

    const changeListener = (e: React.ChangeEvent<HTMLInputElement>) => {
        presenter.handleInputChange(e.target.value);
    };

    return (
        <div>
            <div className="input-wrapper">
                <label htmlFor="property">Property</label>
                <input name="property" type="text" onChange={changeListener} value={inputValue} />
                <p>Value: {pathValue}</p>
            </div>
            <p>Response</p>
            <div className="json-view-container">
                <JsonPropertyViewer obj={data} path="" presenter={presenter} />
            </div>
        </div>
    );
};


const JsonPropertyViewer: React.FC<{ obj: AnyJson; path: string; presenter: JsonPresenter<AnyJson> }> = ({
    obj,
    path,
    presenter,
}) => {
    const handlePropertyClickListener = (path: string) => {
        presenter.handlePropertyClick(path);
    };

    return (
        <ul className="json-view">
            {Object.keys(obj).map((key, index) => {
                const { isInt, showNested, isArr, className, value, newPath } = presenter.calcJsonViewProperties({
                    obj,
                    path,
                    key,
                });

                const mappedIcons = {
                    startObjectIcon: '{',
                    endObjectIcon: '},',
                    startArrayIcon: '[',
                    endArrayIcon: '],',
                };

                return (
                    <li key={index}>
                        {isInt && mappedIcons['startObjectIcon']}
                        {!isInt && (
                            <span className={`${className}`} onClick={() => handlePropertyClickListener(newPath)}>
                                {key}:{' '}
                            </span>
                        )}
                        {isArr && mappedIcons['startArrayIcon']}
                        {showNested && <JsonPropertyViewer obj={obj[key]} path={newPath} presenter={presenter} />}
                        {!showNested && value}
                        {isInt && mappedIcons['endObjectIcon']}
                        {isArr && mappedIcons['endArrayIcon']}
                    </li>
                );
            })}
        </ul>
    );
};
