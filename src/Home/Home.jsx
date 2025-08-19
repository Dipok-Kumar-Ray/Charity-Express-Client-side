
import HomeSlider from '../banner/HomeSlider';
import CommunityStories from '../ExtraSections/CommunityStories';
import ImpactStats from '../ExtraSections/ImpactStats';
import DonationStatistics from './DonationStatistics';
import FeaturedDonations from './FeaturedDonations';
import LatestCharityRequests from './LatestCharityRequests';



const Home = () => {

    return (
        <div>
            <HomeSlider/>
            <FeaturedDonations/>
            <CommunityStories/>
            <LatestCharityRequests/>
            <ImpactStats/>
            <DonationStatistics/>
        </div>
    );
};

export default Home;