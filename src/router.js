import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/notes",
      name: "notes",
      component: () => import("./components/Noteslist")
    },
    {
      path: "/notes/:id",
      name: "note-details",
      component: () => import("./components/Note")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddNote")
    }
  ]
});