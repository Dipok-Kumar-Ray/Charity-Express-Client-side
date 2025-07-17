import HomeSlider from '../banner/HomeSlider';
import CommunityStories from '../ExtraSections/CommunityStories';
import ImpactStats from '../ExtraSections/ImpactStats';

const Home = () => {
    return (
        <div>
            <HomeSlider/>
            <CommunityStories/>
            <ImpactStats/>
        </div>
    );
};

export default Home;