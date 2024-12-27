import PageTitle from '../components/common/PageTitle.jsx';
import ResetPasswordCard from '../components/reset-password/ResetPassowrdCard.jsx';
import UnderCard from '../components/common/UnderCard.jsx';

function ResetPasswordPage() {
    return (
        <>
            <PageTitle title={'Reset password'} />
            <ResetPasswordCard />
            <UnderCard text={'Go back to'} linkText={'login'} link={'login'} />
        </>
    );
}

export default ResetPasswordPage;
