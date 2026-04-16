import { defineComponent } from 'vue';
import { HomepageView } from '../view/homepageView.jsx';

export const HomepagePresenter = defineComponent(
    {
        name: "HomepagePresenter",

        setup() {
            function handleChooseLevel(){
                console.log("Navigate to lever selection");
            }

            function handleProfile(){
                console.log("Navigate to prodile");
            }

            function handleLeaderboard(){
                console.log("Navigate to leaderboard");
            }

            return () => (
                <HomepageView
                    onChooseLevel={handleChooseLevel}
                    onProfile={handleProfile}
                    onLeaderboard={handleLeaderboard}
                />
            )
        },
    }
);