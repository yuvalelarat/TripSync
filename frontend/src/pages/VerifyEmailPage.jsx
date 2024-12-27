import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useVerifyEmailQuery } from '../redux/rtk/userDataApi';

function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const { data, error, isLoading } = useVerifyEmailQuery(token, {
        skip: !token,
    });

    const style = {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 32,
        fontWeight: 600,
        textAlign: 'center',
    };

    useEffect(() => {
        if (data?.success) {
            setTimeout(() => navigate('/login'), 3000);
            console.log('YES');
        }
    }, [data, navigate]);

    if (isLoading) return <div style={style}>Verifying your email...</div>;
    if (error) return <div style={style}>Verification failed. Please try again.</div>;
    if (data?.success) return <div style={style}>Email verified successfully! Redirecting to login...</div>;

    return <div style={style}>Invalid verification attempt</div>;
}

export default VerifyEmailPage;
