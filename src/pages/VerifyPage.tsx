import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';

export default function VerifyPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [email] = useState(location.state);

    useEffect(() => {
        if (!email) {
            navigate('/');
        }
    }, [email]);
    return <div>VerifyPage</div>;
}
