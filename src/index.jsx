import { createApp } from "vue";
import { RouterView } from "vue-router";
import { router } from "./router.js";
import "./style.css";

const App = {
    render() {
        return <RouterView />;
    }
};

createApp(App).use(router).mount("#root");