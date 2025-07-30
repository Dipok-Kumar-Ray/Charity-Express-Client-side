import UseUserRole from '../../RoleManage/UseUserRole';
import FeatureDonations from '../AdminDashboardLagyouts/featureDonations/FeatureDonations';
import HomeSlider from '../banner/HomeSlider';
import CommunityStories from '../ExtraSections/CommunityStories';
import ImpactStats from '../ExtraSections/ImpactStats';
import FeaturedDonations from './FeaturedDonations';
// import useAuth from '../hooks/useAuth';


const Home = () => {
    // const {role} = UseUserRole();
    // const {user} = useAuth()
    // console.log(role, user);
    return (
        <div>
            <HomeSlider/>
            <FeaturedDonations/>
            <CommunityStories/>
            <ImpactStats/>
        </div>
    );
};

export default Home;