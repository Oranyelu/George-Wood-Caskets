import { useParams, Navigate } from 'react-router-dom';
import { infoData } from '../utils/infoData';

export default function InfoPage() {
    const { pageId } = useParams();
    const Content = infoData[pageId];

    if (!Content) {
        return <Navigate to="/not-found" replace />;
    }

    return <Content />;
}
