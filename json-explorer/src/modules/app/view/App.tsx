import { useEffect, useState } from 'react';
import './App.scss';
import { AppView } from '../infrastructure/presenters/app-presenter';
import { getAppPresenter } from '../infrastructure/di-container';
import { JSONViewer } from '../../json-viewer/view/JsonViewer';

export const App: React.FC = () => {
    const [state, setState] = useState([]);
    const [loading, setLoading] = useState(true);

    const view: AppView = {
        onDataReady: (data) => {
            setState(data);
        },
        toggleLoading: (isLoading) => {
            setLoading(isLoading);
        },
    };

    const presenter = getAppPresenter(view);

    useEffect(() => {
        presenter.init();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Container>
            <JSONViewer data={state[0]} />
        </Container>
    );
};

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return <div className="container">{children}</div>;
};
