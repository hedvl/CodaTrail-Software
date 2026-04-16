import { defineComponent, reactive, onMounted } from 'vue';
import { HomepageView } from '../view/homepageView.jsx';
import { useRouter } from "vue-router";
import { initAuthListener, signOutUser } from "../firebase/firebaseAuth.js";

const homeState = reactive({
    user: null
});

export const HomepagePresenter = defineComponent(
    {
        name: "HomepagePresenter",

        setup() {
            const router = useRouter();
            function handleChooseLevel(){
                console.log("Navigate to lever selection");
            }

            function handleProfile(){
                console.log("Navigate to prodile");
            }

            function handleLeaderboard(){
                console.log("Navigate to leaderboard");
            }

            function handleSignOutACB(){
                signOutUser().then(function (){
                    if(res && res.error){
                        console.error("Error signing out:", res.errorMessage);
                        return;
                    }
                    homeState.user = null;
                    router.push("/login");
                });
            }

            onMounted(function () {
                initAuthListener(function (user) {
                    homeState.user = user;

                    if (!user) {
                        router.push("/login"); 
                    }
                });
            });

            return () => (
                <HomepageView
                    onChooseLevel={handleChooseLevel}
                    onProfile={handleProfile}
                    onLeaderboard={handleLeaderboard}
                    onSignOut={handleSignOutACB}
                    user={homeState.user}
                    
                />
            )
        },
    }
);

export default HomepagePresenter;