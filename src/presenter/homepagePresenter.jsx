/*

  Vad Alex har gjort:
  - Lagt till realtidslyssnare med listenToGameSession() och listenToGameResult() så att
    webben uppdateras automatiskt när Raspberry Pi skriver tillbaka resultat till Firebase.
  - Lagt till onUnmounted för att stänga Firebase-lyssnare när komponenten lämnas.
  - Lagt till gameStatus, score, stars, success och lastLevel i homeState för att
    hålla koll på speldata från Pi i realtid.
  - Skickar ny speldata som props till HomepageView.

  Varför:
  - Realtidslyssnarna gör att spelaren ser sitt resultat direkt utan att ladda om sidan.
  - onUnmounted är nödvändigt för att undvika minnesläckor när lyssnare inte stängs.
  - All speldata ska hanteras i presentern och skickas ner till vyn via props.
*/

import { defineComponent, reactive, onMounted, onUnmounted } from 'vue'; // lade till onUnmounted
import { HomepageView } from '../view/homepageView.jsx';
import { useRouter } from "vue-router";
import { initAuthListener, signOutUser } from "../firebase/firebaseAuth.js";
import { listenToGameSession, listenToGameResult } from "../model/GameSessionModel.js"; // NY

 

const homeState = reactive({
    user: null,
    gameStatus: null,  // NY
    score: null,       // NY
    stars: null,       // NY
    success: null,     // NY
    lastLevel: null    // NY
});


export const HomepagePresenter = defineComponent(
    {
        name: "HomepagePresenter",


        setup() {
            const router = useRouter();

            // NY - sparar unsubscribe-funktioner
            let unsubscribeSession = null;
            let unsubscribeResult = null;


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
                        return;
                    }

                    // NY - starta realtidslyssnare när användaren är inloggad
                    unsubscribeSession = listenToGameSession(
                        user.uid,
                        function onSessionUpdateACB(session) {
                            homeState.gameStatus = session.status;
                            homeState.lastLevel = session.selectedLevel;
                        }
                    );

                    unsubscribeResult = listenToGameResult(
                        user.uid,
                        function onResultUpdateACB(result) {
                            homeState.score = result.score;
                            homeState.stars = result.stars;
                            homeState.success = result.success;
                            homeState.gameStatus = "finished";
                        }
                    );
                });
            });

            // NY - stäng lyssnare när komponenten lämnas
            onUnmounted(function unmountedACB() {
                if (unsubscribeSession) unsubscribeSession();
                if (unsubscribeResult) unsubscribeResult();
            });


            return () => (
                <HomepageView
                    onChooseLevel={handleChooseLevel}
                    onProfile={handleProfile}
                    onLeaderboard={handleLeaderboard}
                    onSignOut={handleSignOutACB}
                    user={homeState.user}
                    gameStatus={homeState.gameStatus}  
                    score={homeState.score}            
                    stars={homeState.stars}            
                    success={homeState.success}        
                    lastLevel={homeState.lastLevel}    
                />
            )
        },
    }
);


export default HomepagePresenter;