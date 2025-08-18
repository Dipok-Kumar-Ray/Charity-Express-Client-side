
import HomeSlider from '../banner/HomeSlider';
import CommunityStories from '../ExtraSections/CommunityStories';
import ImpactStats from '../ExtraSections/ImpactStats';
import FeaturedDonations from './FeaturedDonations';
import LatestCharityRequests from './LatestCharityRequests';



const Home = () => {

    return (
        <div>
            <HomeSlider/>
            <CommunityStories/>
            <FeaturedDonations/>
            <LatestCharityRequests/>
            <ImpactStats/>
        </div>
    );
};

export default Home;