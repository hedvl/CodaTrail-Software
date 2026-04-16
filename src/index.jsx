// TODO make a reactive model (application state), pass it as prop to the components used by App
import { createApp } from "vue";
import { HomepagePresenter } from "./presenter/homepagePresenter.jsx";

const app = createApp(HomepagePresenter);
app.mount("#root");