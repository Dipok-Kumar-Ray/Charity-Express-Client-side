
import HomeSlider from '../banner/HomeSlider';
import CommunityStories from '../ExtraSections/CommunityStories';
import ImpactStats from '../ExtraSections/ImpactStats';
import FeaturedDonations from './FeaturedDonations';



const Home = () => {

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