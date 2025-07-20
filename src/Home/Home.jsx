import UseUserRole from '../../RoleManage/UseUserRole';
import HomeSlider from '../banner/HomeSlider';
import CommunityStories from '../ExtraSections/CommunityStories';
import ImpactStats from '../ExtraSections/ImpactStats';
import useAuth from '../hooks/useAuth';


const Home = () => {
    const {role} = UseUserRole();
    const {user} = useAuth()
    console.log(role, user);
    return (
        <div>
            <HomeSlider/>
            <CommunityStories/>
            <ImpactStats/>
        </div>
    );
};

export default Home;