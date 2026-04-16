// TODO make a reactive model (application state), pass it as prop to the components used by App
import {createApp} from "vue";
function App(){ return <div>hello world</div>; };
const app= createApp(App);
app.mount("#root");